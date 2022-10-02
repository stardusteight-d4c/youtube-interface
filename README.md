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
