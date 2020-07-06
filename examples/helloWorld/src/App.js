import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const GET_MESSAGE = gql`
  query getMessage {
    greeting {
      content
    }
  }
`

const App = ({ client }) => {
  let options = !!client ? { client } : {} 
  const { data } = useQuery(GET_MESSAGE, options)
  return (
    <div>
      <h1>{data.greeting && data.greeting.content}</h1>
      <button onClick={() => console.log('event handler attached')}>Click me</button>
    </div>
  )
}

export default App