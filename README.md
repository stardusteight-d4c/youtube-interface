# Youtube Interface | React + Vite, Redux & YouTube Data API v3 

![banner](banner.png)

> Cloning the Youtube interface using one of the services provided by the `Google Cloud`, the `YouTube Data API v3`
in which it is possible to get the data from Youtube videos in real time. The `Redux Toolkit and Axios` libraries were used
to perform requests, process data and manage the state of requests. Also implemented `Infinite Scroll`
which causes the `getHomePageVideos` or `getSearchPageVideos` function to make a new request with the `pageToken` parameter to
retrieve an additional page of results. Base project taught in the <strong>Kishan Sheth</strong> channel.

:arrow_right: Redux - What is it and how does it work <br />
:arrow_right: Redux - State Management and Redux Terminology <br />
:arrow_right: Redux | State, Actions, and Reducers <br />
:arrow_right: Redux Toolkit | A Predictable State Container for JS Apps, batteries-included toolset for efficient Redux development <br />
:arrow_right: Infinite Scroll and Pagination <br />

<br />

## Redux - What is it and how does it work

#### Prerequisites

 - Familiarity with HTML & CSS.
 - Familiarity with ES6 syntax and features
 - Understanding of the array and object spread operators
 - Knowledge of React terminology: JSX, State, Function Components, Props, and Hooks
 - Knowledge of asynchronous JavaScript and making AJAX requests
 
Redux is a pattern and library for managing and updating application state, using events called `actions`. It serves as a `centralized store` for state that needs to be used across your entire application, with rules ensuring that the state can only be updated in a `predictable fashion`.

The patterns and tools provided by Redux make it easier to understand when, where, why, and how the state in your application is being updated, and how your application logic will behave when those changes occur. Redux guides you towards writing code that is predictable and testable, which helps give you confidence that your application will work as expected.
<br />

### Redux Libraries and Tools

Redux is a small standalone JS library. However, it is commonly used with several other packages:

#### React-Redux

React-Redux is our official package that lets your `React components interact with a Redux store` by `reading pieces of state and dispatching actions to update the store`.

#### Redux Toolkit

Redux Toolkit is our recommended approach for writing Redux logic. It `contains packages and functions` that we think are essential for building a Redux app. Redux Toolkit builds in our suggested best practices, simplifies most Redux tasks, prevents common mistakes, and makes it easier to write Redux applications.

#### Redux DevTools Extension

The Redux DevTools Extension shows a `history of the changes to the state` in your Redux store over time. This allows you to debug your applications effectively, including using powerful techniques like `time-travel debugging`.


### The Redux Store

The center of every Redux application is the store. A `store` is a container that holds your `application's global state`.

A store is a `JavaScript object` with a few special functions and abilities that make it different than a plain global object:

 - You must `never directly modify` or `change the state` that is kept inside the Redux store.
 - Instead, the only way to cause an update to the state is to create a plain `action object` that describes `something that happened in the application`, and then `dispatch` the action to the store to tell it what happened.
 - When an action is dispatched, the store runs the `root reducer function`, and lets it calculate the `new state` based on the `old state` and the `action`.
 - Finally, the store notifies subscribers that the state has been updated so the UI can be updated with the new data.
 
### Redux Core Example App

Let's look at a minimal working example of a Redux app - a small counter application:
 
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Redux basic example</title>
    <script src="https://unpkg.com/redux@latest/dist/redux.min.js"></script>
  </head>
  <body>
    <div>
      <p>
        Clicked: <span id="value">0</span> times
        <button id="increment">+</button>
        <button id="decrement">-</button>
        <button id="incrementIfOdd">Increment if odd</button>
        <button id="incrementAsync">Increment async</button>
      </p>
    </div>
    <script>
      // Define an initial state value for the app
      const initialState = {
        value: 0
      };

      // Create a "reducer" function that determines what the new state
      // should be when something happens in the app
      function counterReducer(state = initialState, action) {
        // Reducers usually look at the type of action that happened
        // to decide how to update the state
        switch (action.type) {
          case "counter/incremented":
            return { ...state, value: state.value + 1 };
          case "counter/decremented":
            return { ...state, value: state.value - 1 };
          default:
            // If the reducer doesn't care about this action type,
            // return the existing state unchanged
            return state;
        }
      }

      // Create a new Redux store with the `createStore` function,
      // and use the `counterReducer` for the update logic
      const store = Redux.createStore(counterReducer);

      // Our "user interface" is some text in a single HTML element
      const valueEl = document.getElementById("value");

      // Whenever the store state changes, update the UI by
      // reading the latest store state and showing new data
      function render() {
        const state = store.getState();
        valueEl.innerHTML = state.value.toString();
      }

      // Update the UI with the initial data
      render();
      // And subscribe to redraw whenever the data changes in the future
      store.subscribe(render);

      // Handle user inputs by "dispatching" action objects,
      // which should describe "what happened" in the app
      document
        .getElementById("increment")
        .addEventListener("click", function () {
          store.dispatch({ type: "counter/incremented" });
        });

      document
        .getElementById("decrement")
        .addEventListener("click", function () {
          store.dispatch({ type: "counter/decremented" });
        });

      document
        .getElementById("incrementIfOdd")
        .addEventListener("click", function () {
          // We can write logic to decide what to do based on the state
          if (store.getState().value % 2 !== 0) {
            store.dispatch({ type: "counter/incremented" });
          }
        });

      document
        .getElementById("incrementAsync")
        .addEventListener("click", function () {
          // We can also write async logic that interacts with the store
          setTimeout(function () {
            store.dispatch({ type: "counter/incremented" });
          }, 1000);
        });
    </script>
  </body>
</html>
```

Because Redux is a `standalone` JS library with no dependencies, this example is written by only loading a single script tag for the Redux library, and uses basic JS and HTML for the UI. In practice, Redux is normally used by installing the `Redux packages` from NPM, and the UI is created using a library like `React`.


#### State, Actions, and Reducers

##### Reducers

We start by defining an `initial state` value to describe the application:

```js
// Define an initial state value for the app
const initialState = {
  value: 0
}
```

Then, we define a `reducer function`. The reducer receives two arguments, the `current state` and an `action object` describing what happened. When the Redux app starts up, we don't have any state yet, so we provide the `initialState` as the default value for this reducer:

```js
// Create a "reducer" function that determines what the new state
// should be when something happens in the app
function counterReducer(state = initialState, action) {
  // Reducers usually look at the type of action that happened
  // to decide how to update the state
  switch (action.type) {
    case 'counter/incremented':
      return { ...state, value: state.value + 1 }
    case 'counter/decremented':
      return { ...state, value: state.value - 1 }
    default:
      // If the reducer doesn't care about this action type,
      // return the existing state unchanged
      return state
  }
}
```

Action objects always have a type `field`, which is a `string you provide that acts as a unique name for the action`. The type should be a readable name so that anyone who looks at this code understands what it means. In this case, we use the word `counter` as the first half of our action type, and the second half is a description of `what happened`. In this case, our 'counter' was 'incremented', so we write the action type as `counter/incremented`.

Based on the `type of the action`, we either need to return a `brand-new object to be the new state result`, or return `the existing state object` if nothing should change. Note that we update the state `immutably` by copying the existing state and updating the copy, instead of modifying the original object directly.

##### Store

Now that we have a `reducer function`, we can create a `store instance` by calling the Redux library createStore API.

```js
// Create a new Redux store with the `createStore` function,
// and use the `counterReducer` for the update logic
const store = Redux.createStore(counterReducer)
```

We pass the reducer function to `createStore`, which uses the reducer function to `generate the initial state`, and to `calculate any future updates`.

##### UI

In any application, the user interface will `show existing state on screen`. When a user does something, the app will `update` its data and then `redraw` the UI with those values.

```js
// Our "user interface" is some text in a single HTML element
const valueEl = document.getElementById('value')

// Whenever the store state changes, update the UI by
// reading the latest store state and showing new data
function render() {
  const state = store.getState()
  valueEl.innerHTML = state.value.toString()
}

// Update the UI with the initial data
render()
// And subscribe to redraw whenever the data changes in the future
store.subscribe(render)
```

In this small example, we're only using some basic HTML elements as our UI, with a single `<div>` showing the current value.

So, we write a function that knows how to get the `latest state from the Redux store` using the `store.getState()` method, then takes that value and `updates the UI` to show it.

The Redux store lets us call `store.subscribe()` and pass a `SUBSCRIBER callback function that will be called every time the store is updated`. So, we can pass our render function as the subscriber, and know that each time the store updates, we can update the UI with the latest value.

Redux itself is a standalone library that can be used anywhere. This also means that it can be used with any UI layer.

##### Dispatching Actions

Finally, `we need to respond to user input` by `creating action objects` that describe `what happened`, and `DISPATCHING them to the store`. When we call `store.dispatch(action)`, the `store runs the reducer`, calculates the updated state, and `runs the subscribers to update the UI`.

```js
// Handle user inputs by "dispatching" action objects,
// which should describe "what happened" in the app
document.getElementById('increment').addEventListener('click', function () {
  store.dispatch({ type: 'counter/incremented' })
})

document.getElementById('decrement').addEventListener('click', function () {
  store.dispatch({ type: 'counter/decremented' })
})

document
  .getElementById('incrementIfOdd')
  .addEventListener('click', function () {
    // We can write logic to decide what to do based on the state
    if (store.getState().value % 2 !== 0) {
      store.dispatch({ type: 'counter/incremented' })
    }
  })

document
  .getElementById('incrementAsync')
  .addEventListener('click', function () {
    // We can also write async logic that interacts with the store
    setTimeout(function () {
      store.dispatch({ type: 'counter/incremented' })
    }, 1000)
  })
```

Here, we'll dispatch the actions that will make the reducer add 1 or subtract 1 from the current counter value.

We can also write code that only dispatches an action if a certain condition is true, or write some async code that dispatches an action after a delay.

### Data Flow

We can summarize the flow of data through a Redux app with this diagram. It represents how:

 - <strong>actions are dispatched in response to a user interaction like a click</strong>
 - <strong>the store runs the reducer function to calculate a new state.</strong>
 - <strong>the UI reads the new state to display the new values.</strong>
 
<div align="center">
<img src="redux-data-flow.gif" width="500" />
</div>

*<i>redux.js.org/tutorials/fundamentals/part-1-overview</i>

<br />

## Redux - State Management and Redux Terminology

### State Management

Let's start by looking at a small React counter component. It tracks a number in component state, and increments the number when a button is clicked:

```jsx
function Counter() {
  // State: a counter value
  const [counter, setCounter] = useState(0)

  // Action: code that causes an update to the state when something happens
  const increment = () => {
    setCounter(prevCounter => prevCounter + 1)
  }

  // View: the UI definition
  return (
    <div>
      Value: {counter} <button onClick={increment}>Increment</button>
    </div>
  )
}
```

It is a self-contained app with the following parts:

 - The `state`, the source of truth that drives our app;
 - The `view`, a declarative description of the UI based on the current state;
 - The `actions`, the events that occur in the app based on user input, and trigger updates in the state.

This is a small example of "one-way data flow":

 - State describes the condition of the app at a specific point in time.
 - The UI is rendered based on that state;
 - When something happens (such as a user clicking a button), the state is updated based on what occurred;
 - The UI re-renders based on the new state.

However, the simplicity can break down when we have `multiple components` that need to `share and use the same state`, especially if those components are `located in different parts of the application`. Sometimes this can be solved by `lifting state up` to parent components, but that doesn't always help.

One way to solve this is to extract the shared state from the components, and put it into a centralized location outside the component tree. With this, our component tree becomes a big `view`, and any component can access the state or trigger actions, no matter where they are in the tree!

By `defining and separating` the concepts involved in state management and enforcing rules that maintain `independence` between views and states, we give our code more structure and maintainability.

This is the basic idea behind Redux: a single centralized place to contain the global state in your application, and specific patterns to follow when updating that state to make the code predictable.


### Redux Terminology


#### Actions

An `action` is a `plain JavaScript object` that has a type field. You can think of an action as `an event that describes something that happened in the application`.

The type field should be a string that gives this action a descriptive name, like `todos/todoAdded`. We usually write that type string like `domain/eventName`, where the first part is the feature or category that this action belongs to, and the second part is the specific thing that happened.

An action object can have other fields with additional information about what happened. By convention, we put that information in a field called `payload`.

A typical action object might look like this:

```js
const addTodoAction = {
  type: 'todos/todoAdded',
  payload: 'Buy milk'
}
```

#### Reducers

A reducer is a `FUNCTION that receives the current state and an action object`, decides how to `update the state` if necessary, and returns the new state: `(state, action) => newState`. You can think of a reducer as an `event listener` which handles events `based on the received action (event) type`.

Reducers must always follow some specific rules:

 - They should only calculate the new state value based on the `state` and `action` arguments.
 - They are not allowed to modify the existing state. Instead, they must make immutable updates, by `copying the existing state` and `making changes` to the copied values.
 - They must not do any asynchronous logic, calculate random values, or cause other "side effects".
 
The logic inside reducer functions typically follows the same series of steps:

 - Check to see if the reducer cares about this action.
    - If so, make a copy of the state, update the copy with new values, and return it.
 - Otherwise, return the existing state unchanged.

Here's a small example of a reducer, showing the steps that each reducer should follow:

```js
const initialState = { value: 0 }

function counterReducer(state = initialState, action) {
  // Check to see if the reducer cares about this action
  if (action.type === 'counter/incremented') {
    // If so, make a copy of `state`
    return {
      ...state,
      // and update the copy with the new value
      value: state.value + 1
    }
  }
  // otherwise return the existing state unchanged
  return state
}
```
										
Reducers can use any kind of logic inside to decide what the new state should be: `if/else`, `switch`, loops, and so on.


#### Store

The current Redux application state `lives` in an object called the store .

The store is `created by passing in a reducer`, and has a method called `getState that returns the current state value`:

```js
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({ reducer: counterReducer })

console.log(store.getState())
// {value: 0}
```


#### Dispatch

The Redux store has a method called `dispatch`. `The only way to update the state is to call store.dispatch()` and pass in an `action object`. The store will run its `reducer function` and save the new state value inside, and we can call `getState()` to retrieve the updated value:

```js
store.dispatch({ type: 'counter/incremented' })

console.log(store.getState())
// {value: 1}
```

You can think of `dispatching actions` as `triggering an event` in the application. Something happened, and we want the `store to know about it`. Reducers act like `event listeners`, and when they hear an `action they are interested in`, they `update the state` in response.


#### Selectors

Selectors are `functions that know how to extract specific pieces of information from a store state value`. As an application grows bigger, this can help avoid repeating logic as different parts of the app need to read the same data:

```js
const selectCounterValue = state => state.value

const currentValue = selectCounterValue(store.getState())
console.log(currentValue)
// 2
```
*<i>redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow</i>

<br />

## Redux | State, Actions, and Reducers

### Designing the State Values

One of the core principles of React and Redux is that your UI should be based on your state. So, one approach to designing an application is to first think of all the state needed to describe how the application works. It's also a good idea to try to describe your UI with as few values in the state as possible, so there's less data you need to keep track of and update.

With Redux, our application state is always kept in plain JavaScript objects and arrays. That means you may not put other things into the Redux state - no class instances, built-in JS types like `Map` / `Set Promise` / `Date`, functions, or anything else that is not plain JS data.


### Designing Actions

Actions are plain JavaScript objects that have a type field. As mentioned earlier, you can think of an action as an event that describes `something that happened` in the application.

In the same way that we designed the `state structure` based on the app's requirements, we should also be able to come up with a list of some of the actions that describe what's happening.

We normally put any extra data needed to describe what's happening into the `action.payload` field. This could be a `number`, a `string`, or an `object` with multiple fields inside.

The Redux store doesn't care what the actual text of the `action.type` field is. However, your own code will look at action.type to see if an update is needed. Also, you will frequently look at action type strings in the `Redux DevTools Extension` while `debugging` to see what's going on in your app.

Based on that list of things that can happen, we can create a list of actions that our application will use:

 - `{type: 'todos/todoAdded', payload: todoText}`
 - `{type: 'todos/todoToggled', payload: todoId}`
 - `{type: 'todos/colorSelected', payload: {todoId, color}}`
 
Like the `state data`, actions should contain the smallest amount of information needed to `describe what happened`.

### Writing Reducers

Now that we know what our state structure and our actions look like, it's time to write our first reducer.

Reducers are functions that take the `current state` and an `action` as arguments, and return a `new state` result. In other words, `(state, action) => newState`.

#### Creating the Root Reducer

A Redux app `really only has one reducer function`: the `root reducer` function that you will pass to `createStore` later on. That one root reducer function is `responsible for handling all of the actions that are dispatched`, and `calculating what the entire new state result should be every time`.

Let's start by creating a reducer.js file in the src folder, alongside index.js and App.js.

Every reducer needs some `initial state`, so we'll add some fake todo entries to get us started. Then, we can write an outline for the logic inside the reducer function:

```js
const initialState = {
  todos: [
    { id: 0, text: 'Learn React', completed: true },
    { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
    { id: 2, text: 'Build something fun!', completed: false, color: 'blue' }
  ],
  filters: {
    status: 'All',
    colors: []
  }
}

// Use the initialState as a default value
export default function appReducer(state = initialState, action) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    // Do something here based on the different types of actions
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state
  }
}
```

A reducer may be called with `undefined` as the state value when the application is being initialized. If that happens, we need to provide an `initial state` value so the rest of the reducer code has something to work with. Reducers normally use `ES6` default argument syntax to provide initial state: `(state = initialState, action)`.

Next, let's add the logic to handle the `todos/todoAdded` action.

We first need to check `if the current action's type matches that specific string`. Then, we need to return a new object containing all of the state, even for the fields that didn't change.

```js
function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
}

// Use the initialState as a default value
export default function appReducer(state = initialState, action) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    // Do something here based on the different types of actions
    case 'todos/todoAdded': {
      // We need to return a new state object
      return {
        // that has all the existing state data
        ...state,
        // but has a new array for the `todos` field
        todos: [
          // with all of the old todos
          ...state.todos,
          // and the new todo object
          {
            // Use an auto-incrementing numeric ID for this example
            id: nextTodoId(state.todos),
            text: action.payload,
            completed: false
          }
        ]
      }
    }
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state
  }
}
```

*<i>redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers</i>

<br />

## Redux Toolkit | A Predictable State Container for JS Apps, batteries-included toolset for efficient Redux development

The Redux Toolkit package is intended to be the standard way to write Redux logic. It was originally created to help address three common concerns about Redux:

 - "Configuring a Redux store is too complicated"
 - "I have to add a lot of packages to get Redux to do anything useful"
 - "Redux requires too much boilerplate code"

We can't solve every use case, but in the spirit of create-react-app, we can try to provide some tools that `abstract` over the setup process and handle the most common use cases, as well as include some useful utilities that will let the user simplify their application code.

These tools should be beneficial to all Redux users. Whether you're a brand new Redux user setting up your first project, or an experienced user who wants to simplify an existing application, Redux Toolkit can help you make your Redux code better.

#### Installation

 - `npm install react-redux @reduxjs/toolkit`

### Redux Toolkit APIs

 - <strong>createSlice()</strong>: accepts an `object of reducer functions`, a `slice name`, and an `initial state value`, and automatically generates a slice reducer with corresponding `action creators` and `action types`.
 
Internally, it uses `createAction` and `createReducer`, so you may also use Immer to write "mutating" immutable updates.
 
```ts
// src/store/index.ts

//...
const initialState: InitialState = {
  initialOpenMenu: true,
  initialCloseMenu: false,
  videos: [],
  currentPlaying: null,
  searchTerm: '',
  searchResults: [],
  nextPageToken: null,
  recommendedVideos: [],
}

const YoutubeSlice = createSlice({
  name: 'youtubeApp', // domain name
  initialState,
  reducers: { // actions
    handleInitialOpenMenu: (state) => {
      state.initialOpenMenu = !state.initialOpenMenu
    },
    handleInitialCloseMenu: (state) => {
      state.initialCloseMenu = !state.initialCloseMenu
    },
    clearVideos: (state) => {
      state.videos = []
      state.nextPageToken = null
    },
    changeSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
    clearSearchTerm: (state) => {
      state.searchTerm = ''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHomePageVideos.fulfilled, (state, action) => {
      state.videos = action.payload.parsedData
      state.nextPageToken = action.payload.nextPageToken
    })
    builder.addCase(getSearchPageVideos.fulfilled, (state, action) => {
      state.videos = action.payload.parsedData
      state.nextPageToken = action.payload.nextPageToken
    })
    builder.addCase(getVideoDetails.fulfilled, (state, action) => {
      state.currentPlaying = action.payload
    })
    builder.addCase(getRecommendedVideos.fulfilled, (state, action) => {
      state.recommendedVideos = action.payload.parsedData
    })
  },
})
// ...
```

 - `Parameters`

`createSlice` accepts a single configuration object parameter, with the following options:

```ts
function createSlice({
    // A name, used in action types
    name: string,
    // The initial state for the reducer
    initialState: any,
    // An object of "case reducers". Key names will be used to generate actions.
    reducers: Object<string, ReducerFunction | ReducerAndPrepareObject>
    // A "builder callback" function used to add more reducers, or
    // an additional object of "case reducers", where the keys should be other
    // action types
    extraReducers?:
    | Object<string, ReducerFunction>
    | ((builder: ActionReducerMapBuilder<State>) => void)
})
```

 - `name` A string name for this slice of state. Generated action type constants will use this as a prefix.
 - `initialState` - The initial state value for this slice of state.
 - `reducers` - An object containing Redux "case reducer" functions (functions intended to `handle a specific action type`, equivalent to a `single case statement in a switch`).
 - `extraReducers` - A "builder callback" function used to add more reducers, or an additional object of "case reducers", where the keys should be other action types.

#### reducers

The `keys in the object` will be used to generate `string action type constants`, and these will show up in the `Redux DevTools Extension` when they are `dispatched`. Also, if any other part of the application happens to dispatch an action with the exact same type string, the corresponding reducer will be run. Therefore, you should give the functions descriptive names.

```ts
changeSearchTerm: (state, action: PayloadAction<string>) => {
  state.searchTerm = action.payload
},
```

This object will be passed to `createReducer`, so the reducers may safely "mutate" the state they are given.

#### extraReducers

One of the key concepts of Redux is that `each slice reducer` "owns" its `slice of state`, and that many slice reducers can independently respond to the same action type. `extraReducers` allows createSlice to respond to `other action types` besides the types it has generated.

As case reducers specified with extraReducers are meant to reference `external actions`, they will not have actions generated in `slice.actions`.

As with `reducers`, these case reducers will also be passed to `createReducer` and may "mutate" their state safely.

If two fields from `reducers` and `extraReducers` happen to end up with the same action type string, the function from reducers will be used to handle that action type.

##### The extraReducers "builder callback" notation

The recommended way of using `extraReducers` is to use a `callback` that receives a `ActionReducerMapBuilder` instance.

This `builder notation` is also the only way to add matcher reducers and default case reducers to your slice.

```ts
import {
  createAction,
  createReducer,
  AnyAction,
  PayloadAction,
} from '@reduxjs/toolkit'

const increment = createAction<number>('increment')
const decrement = createAction<number>('decrement')

function isActionWithNumberPayload(
  action: AnyAction
): action is PayloadAction<number> {
  return typeof action.payload === 'number'
}

const reducer = createReducer(
  {
    counter: 0,
    sumOfNumberPayloads: 0,
    unhandledActions: 0,
  },
  (builder) => {
    builder
      .addCase(increment, (state, action) => {
        // action is inferred correctly here
        state.counter += action.payload
      })
      // You can chain calls, or have separate `builder.addCase()` lines each time
      .addCase(decrement, (state, action) => {
        state.counter -= action.payload
      })
      // You can apply a "matcher function" to incoming actions
      .addMatcher(isActionWithNumberPayload, (state, action) => {})
      // and provide a default case if no other handlers matched
      .addDefaultCase((state, action) => {})
  }
)
```

We recommend using this API as it has better TypeScript support (and thus, IDE autocomplete even for JavaScript users), as it will correctly infer the action type in the reducer based on the provided action creator. It's particularly useful for working with actions produced by `createAction` and `createAsyncThunk`.

#### Return Value

createSlice will return an object that looks like:

```ts
{		
  name : string,
  reducer : ReducerFunction,
  actions : Record<string, ActionCreator>,
  caseReducers: Record<string, CaseReducer>.
  getInitialState: () => State
}
```

Each function defined in the `reducers` argument will have a corresponding action creator generated using `createAction` and included in the result's `actions` field using the same function name.

The generated `reducer` function is suitable for passing to the Redux `combineReducers` function as a "slice reducer".

You may want to consider destructuring the action creators and exporting them individually, for ease of searching for references in a larger codebase.

The functions passed to the `reducers` parameter can be accessed through the `caseReducers` return field. This can be particularly useful for testing or direct access to reducers created inline.

Result's function `getInitialState` provides access to the initial state value given to the slice. If a lazy state initializer was provided, it will be called and a fresh value returned.


```ts
import { createSlice, createAction } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createStore, combineReducers } from 'redux'

const incrementBy = createAction<number>('incrementBy')
const decrementBy = createAction<number>('decrementBy')

const counter = createSlice({
  name: 'counter',
  initialState: 0 as number,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
    multiply: {
      reducer: (state, action: PayloadAction<number>) => state * action.payload,
      prepare: (value?: number) => ({ payload: value || 2 }), // fallback if the payload is a falsy value
    },
  },
  // "builder callback API", recommended for TypeScript users
  extraReducers: (builder) => {
    builder.addCase(incrementBy, (state, action) => {
      return state + action.payload
    })
    builder.addCase(decrementBy, (state, action) => {
      return state - action.payload
    })
  },
})

const user = createSlice({
  name: 'user',
  initialState: { name: '', age: 20 },
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload // mutate the state all you want with immer
    },
  },
  // "map object API"
  extraReducers: {
    // @ts-expect-error in TypeScript, this would need to be [counter.actions.increment.type]
    [counter.actions.increment]: (
      state,
      action /* action will be inferred as "any", as the map notation does not contain type information */
    ) => {
      state.age += 1
    },
  },
})

const reducer = combineReducers({
  counter: counter.reducer,
  user: user.reducer,
})

const store = createStore(reducer)

store.dispatch(counter.actions.increment())
// -> { counter: 1, user: {name : '', age: 21} }
store.dispatch(counter.actions.increment())
// -> { counter: 2, user: {name: '', age: 22} }
store.dispatch(counter.actions.multiply(3))
// -> { counter: 6, user: {name: '', age: 22} }
store.dispatch(counter.actions.multiply())
// -> { counter: 12, user: {name: '', age: 22} }
console.log(`${counter.actions.decrement}`)
// -> "counter/decrement"
store.dispatch(user.actions.setUserName('eric'))
// -> { counter: 12, user: { name: 'eric', age: 22} }
```

- <strong>configureStore()</strong>: wraps `createStore` to provide simplified configuration options and good defaults. It can automatically combine your slice reducers, adds whatever Redux middleware you supply, includes redux-thunk by default, and enables use of the Redux DevTools Extension.

A friendly `abstraction` over the standard Redux `createStore` function that adds good defaults to the store setup for a better development experience.

#### Basic usage example

```ts
// src/store/index.ts 

export const store = configureStore({
  reducer: { youtubeApp: YoutubeSlice.reducer },
})
```

- <strong>createAsyncThunk()</strong>: accepts an `action type string` and a `function that returns a promise`, and generates a thunk that dispatches `pending/fulfilled/rejected` action types based on that promise.

A function that accepts a Redux action type string and a callback function that should return a promise. It generates `promise lifecycle action types` based on the action type prefix that you pass in, and `returns a thunk action creator` that will run the promise callback and `dispatch the lifecycle actions` based on the returned promise.

This abstracts the standard recommended approach for handling async request lifecycles.

It does not generate any reducer functions, since it does not know what data you're fetching, how you want to track loading state, or how the data you return needs to be processed. You should write your own reducer logic that handles these actions, with whatever loading state and processing logic is appropriate for your own app.

```ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userAPI } from './userAPI'

// First, create the thunk
const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId: number, thunkAPI) => {
    const response = await userAPI.fetchById(userId)
    return response.data
  }
)

interface UsersState {
  entities: []
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
  entities: [],
  loading: 'idle',
} as UsersState

// Then, handle actions in your reducers:
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      // Add user to the state array
      state.entities.push(action.payload)
    })
  },
})

// Later, dispatch the thunk as needed in the app
dispatch(fetchUserById(123))
```

 - `Parameters`

`createAsyncThunk` accepts three parameters: a string action `type` value, a `payloadCreator` callback, and an `options` object.

#### type

A string that will be used to generate additional Redux action type constants, representing the `lifecycle of an async request`:

For example, a type argument of `users/requestStatus` will generate these action types:

 - pending: `users/requestStatus/pending`
 - fulfilled: `users/requestStatus/fulfilled`
 - rejected: `users/requestStatus/rejected`

#### payloadCreator

A callback function that should `return a promise containing the result of some asynchronous logic`. It may also return a value synchronously. If there is an error, it should either return a rejected promise containing an `Error` instance or a plain value such as a descriptive error message or otherwise a resolved promise with a `RejectWithValue` argument as returned by the `thunkAPI.rejectWithValue` function.

The `payloadCreator` function can contain whatever logic you need to calculate an appropriate result. This could include a standard AJAX data fetch request, multiple AJAX calls with the results combined into a final value, interactions with React Native AsyncStorage, and so on.

The `payloadCreator` function will be called with `two arguments`:

 - `arg`: a single value, containing the `first parameter that was passed to the thunk action creator when it was dispatched`. This is useful for passing in values like item IDs that may be needed as part of the request. If you need to pass in multiple values, pass them together in an object when you dispatch the thunk, like dispatch(fetchUsers({status: 'active', sortBy: 'name'})).
 - `thunkAPI`: an object containing all of the parameters that are normally passed to a Redux thunk function, as well as additional options:
 		- dispatch: the Redux store `dispatch` method
    - getState: the Redux store `getState` method
    - extra: the "extra argument" given to the thunk middleware on setup, if available
    - requestId: a unique string ID value that was automatically generated to identify this request sequence
    - signal: an AbortController.signal object that may be used to see if another part of the app logic has marked this request as needing cancelation.
    - rejectWithValue(value, [meta]): rejectWithValue is a utility function that you can return (or throw) in your action creator to return a rejected response with a defined payload and meta. It will pass whatever value you give it and return it in the payload of the rejected action. If you also pass in a meta, it will be merged with the existing rejectedAction.meta.
     - fulfillWithValue(value, meta): fulfillWithValue is a utility function that you can return in your action creator to fulfill with a value while having the ability of adding to fulfilledAction.meta.

The logic in the payloadCreator function may use any of these values as needed to calculate the result.

#### Options

An object with the following optional fields:

 - `condition(arg, { getState, extra } ): boolean | Promise<boolean>`: a callback that can be used to skip execution of the payload creator and all action dispatches, if desired. See Canceling Before Execution for a complete description.
 - `dispatchConditionRejection`: if condition() returns false, the default behavior is that no actions will be dispatched at all. If you still want a "rejected" action to be dispatched when the thunk was canceled, set this flag to true.
 - `idGenerator(arg): string`: a function to use when generating the requestId for the request sequence. Defaults to use nanoid, but you can implement your own ID generation logic.
 - `serializeError(error: unknown) => any` to replace the internal miniSerializeError method with your own serialization logic.
 - `getPendingMeta({ arg, requestId }, { getState, extra }): any`: a function to create an object that will be merged into the pendingAction.meta field.

#### Return Value

`createAsyncThunk` returns a standard Redux thunk action creator. The thunk action creator function will have plain action creators for the pending, fulfilled, and rejected cases attached as nested fields.

Using the fetchUserById example above, createAsyncThunk will generate four functions:

 - `fetchUserById`, the thunk action creator that kicks off the async payload callback you wrote
  	- `fetchUserById.pending`, an action creator that dispatches an `'users/fetchByIdStatus/pending'` action
 	- `fetchUserById.fulfilled`, an action creator that dispatches an `'users/fetchByIdStatus/fulfilled'` action
	- `fetchUserById.rejected`, an action creator that dispatches an `'users/fetchByIdStatus/rejected'` action

When dispatched, the thunk will:

 - dispatch the `pending` action
 - call the `payloadCreator` callback and wait for the returned promise to settle
 - when the promise settles:
    - if the promise resolved successfully, dispatch the `fulfilled` action with the promise value as `action.payload`
    - if the promise resolved with a `rejectWithValue(value)` return value, dispatch the `rejected`action with the value passed into `action.payload` and 'Rejected' as `action.error.message`
    - if the promise failed and was not handled with `rejectWithValue`, dispatch the `rejected` action with a serialized version of the error value as `action.error`
 - Return a fulfilled promise containing the final dispatched action (either the `fulfilled` or `rejected` action object)
 
```ts
// src/store/reducers/getHomePageVideos.ts 

import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { HomePageVideos } from '../../Types'
import { parseData } from '../../utils'
import { YOUTUBE_API_URL } from '../../utils/constants'
import { RootState } from '../index'

const API_KEY = import.meta.env.VITE_APP_YOUTUBE_DATA_API_KEY

export const getHomePageVideos = createAsyncThunk(
  'youtubeApp/homePageVideos',
  async (isNext: boolean, { getState }) => {
    const {
      youtubeApp: { nextPageToken: nextPageTokenFromState, videos },
    } = getState() as RootState
    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `${YOUTUBE_API_URL}/search?maxResults=20&q="crunchyroll+collection"&key=${API_KEY}&part=snippet&type=video${
        isNext ? `&pageToken=${nextPageTokenFromState}` : ''
      }`
    )
    // console.log(items)
    const parsedData: HomePageVideos[] = await parseData(items)
    return { parsedData: [...videos, ...parsedData], nextPageToken }
  }
)
```

*<i>redux-toolkit.js.org/introduction/getting-started</i> <br/>
*<i>redux-toolkit.js.org/api/createSlice</i> <br/>
*<i>redux-toolkit.js.org/api/configureStore</i> <br/>
*<i>redux-toolkit.js.org/api/createAsyncThunk</i> <br/>

<br />

## Infinite Scroll and Pagination

`Infinite Scroll` is a technique used so that the user of the application does not need to navigate between pages to display more data of a certain thing (this technique is called `pagination`), the infinite scroll proposes to load new data for the user to scroll to the page limit (due to the end of the current contents loaded), this type of technique is used a lot in social network feeds for example.

Infinite scroll was implemented in this application using the `react-infinite-scroll-component` library which provides a component that has props that configure component properties and behaviors:

```tsx
// src/pages/Home.tsx

{videos.length ? (
  <InfiniteScroll
    dataLength={videos.length} /This is important field to render the next data
    next={() => dispatch(getHomePageVideos(true))} // fetchData new data
    hasMore={videos.length < 500} // it tells the InfiniteScroll component on whether to call next function on reaching the bottom and shows an endMessage to the user
    loader={<Spinner />}
    height="95vh"
    className="scrollbar-hide overflow-hidden md:mt-16"
  >
    <div className="grid h-auto overflow-hidden grid-cols-1 md:grid-cols-12">
      <div
        className={`${style.openMenuLayout} ${
          !openMenu && style.notOpenMenuLayout
        }`}
      >
        {videos.map((item: HomePageVideos, index) => {
          return <Card data={item} key={index} />
        })}
      </div>
    </div>
  </InfiniteScroll>
) : (
  <Spinner />
)}
```

For this to be possible, as long as `hasMore` is `true`, the component will continue to call the function that will request the data, only this time it passes the argument "true", which is the value used inside `getHomePageVideos` in the `isNext parameter : boolean`, so the request is performed with the optional `pageToken` parameter that requests the new page with 20 more items.

```tsx
next={() => dispatch(getHomePageVideos(true))} // fetchData new data
``` 

```tsx
// src/store/reducers/getHomePageVideos.ts

export const getHomePageVideos = createAsyncThunk(
  'youtubeApp/homePageVideos',
  async (isNext: boolean, { getState }) => {
    const {
      youtubeApp: { nextPageToken: nextPageTokenFromState, videos },
    } = getState() as RootState
    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `${YOUTUBE_API_URL}/search?maxResults=20&q="crunchyroll+collection"&key=${API_KEY}&part=snippet&type=video${
        isNext ? `&pageToken=${nextPageTokenFromState}` : ''
      }`
    )
    const data = await axios.get(
      `${YOUTUBE_API_URL}/search?maxResults=20&q="crunchyroll+collection"&key=${API_KEY}&part=snippet&type=video${
        isNext ? `&pageToken=${nextPageTokenFromState}` : ''
      }`
    )

    console.log('items', items)
    console.log('nextPageToken', nextPageToken)
    console.log('nextPageTokenFromState', nextPageTokenFromState)
  
  const parsedData: HomePageVideos[] = await parseData(items)
    return { parsedData: [...videos, ...parsedData], nextPageToken }
  }
)
```

But `hasMore` tells the component to call the function only when the scroll reaches the end of its component. So the initial data are:

 - items `Array(20) [ {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, … ]`
 - nextPageToken `CBQQAA` -> first token
 - nextPageTokenFromState `null` -> no token yet

Only after the first request do we have access to `nextPageTokenFromState`:

```tsx
// src/store/index.ts 

builder.addCase(getHomePageVideos.fulfilled, (state, action) => {
  state.videos = action.payload.parsedData
  state.nextPageToken = action.payload.nextPageToken // save the response token
})
```

```tsx
// src/store/reducers/getHomePageVideos.ts

async (isNext: boolean, { getState }) => {
  const {
    youtubeApp: { nextPageToken: nextPageTokenFromState, videos },
  } = getState() as RootState // with getState get the saved token
```

If this is not done, the infinite scroll will always `make the same request with the same token`, therefore it will only `repeat` the same data, so we need to save the token.
