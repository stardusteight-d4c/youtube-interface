import React from 'react'

type Props = {}

const Spinner = (props: Props) => {
  return (
    <div className="flex items-center w-full justify-center py-3">
      <div className="w-10 h-10 border-2 border-red-600 border-solid rounded-full animate-spin border-t-transparent" />
    </div>
  )
}

export default Spinner
