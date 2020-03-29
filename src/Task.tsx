import React, {useRef} from 'react'
import {Flex, Box, Text} from 'rebass'
import Checkbox from './Checkbox'
import styled from 'styled-components'
import {Input} from '@rebass/forms/styled-components'
import {Cloud} from './Database'

export default class Task {
  id: string
  date: Date
  name: string
  checked: boolean
  constructor(name: string, date: Date) {
    this.id = 'Task+'; for (let i = 0; i < 16; i++) this.id += '0123456789'[Math.floor(Math.random() * 9)]
    this.date = date
    this.name = name
    this.checked = false
  }
  toggle = () => { this.checked = !this.checked }
  _id = (id: string) => { this.id = id; return this }
  static from = (doc: firebase.firestore.DocumentData) => new Task(doc.name, new Date(doc.date.toMillis()))._id(doc.id)
}

const Title = styled(Input)`
  border: none;
  transition: border 0.4s ease;
  &:disabled {
    color: red;
  }
  &:focus {
    box-shadow: 0 2px 0 0 black;
  }
`
const Item = ({id, date, name, find}: {
  id: string
  date: Date
  name: string
  find: (id: string) => Task
}) => {
  const input = useRef(document.createElement('input'))
return(
  <Flex
    p={3}
    id={id}
    maxWidth='600px'
    margin='0 auto'
    alignItems='center'
    >
    <Box
        width={1}
        >
      <Title
        mb={1}
        disabled={find(id).checked}
        fontSize={[4,4,5]}
        onChange={() => { if (find(id) !== null) find(id).name = input.current.value }}
        onKeyPress={(e: KeyboardEvent) => { if (e.key === 'Enter') Cloud.push(find(id)) }}
        padding={0}
        ref={input}
        type='text'
        value={find(id).name}
        />
      <Text
        fontSize={[2,2,3]}
        opacity={0.8}
        >
        {date.toDateString()}
      </Text>
    </Box>
    <Checkbox
      checked={find(id).checked}
      toggle={() => { find(id).toggle() }}
      />
  </Flex>
)}

export const Viewer = ({data, find}: {data: Task[], find: (id: string) => Task}) => {
  if (!data || data.length === 0) console.log('No tasks')
  else console.log(`${data.length} task(s)`)
  return(
    <Box m={0}>
      {data.map(({id, date, name}) =>
        <Item
          id={id}
          key={id}
          date={date}
          name={name}
          find={find}
          />
      )}
    </Box>
   )
}
