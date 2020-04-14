import React, { useRef, useState } from 'react'
import { Box, Flex, Text } from 'rebass'
import { Input } from '@rebass/forms/styled-components'
import styled from 'styled-components'
import Checkbox from './Checkbox'
import { Cloud } from './Database'

const newTaskID = () => `Task+${new Array(16).map(e => '0123456789'[Math.floor(Math.random() * 9)]).join('')}`

export default class Task {
  id: string
  date: Date
  value: string
  checked: boolean
  constructor(value: string, date: Date, id = newTaskID()) {
    this.id = id;
    this.date = date
    this.value = value
    this.checked = false
  }
  toggle = () => { this.checked = !this.checked }
  static fromDocument = (doc: firebase.firestore.DocumentData) =>
    new Task(doc.value, new Date(doc.date.toMillis()), doc.id)
}

const Title = styled(Input)`
  border: none;
  transition: border 0.4s ease;
  &:focus {
    box-shadow: 0 2px 0 0 black;
  }
`
const Item = ({id, date, value, checked}: {
  id: string
  date: Date
  value: string
  checked: boolean
}) => {
  const input = useRef(document.createElement('input'))
  const [localValue, setLocalValue] = useState(value)
  const update = (newValue = value, newDate = date) => {
    Cloud.write(new Task(newValue, newDate, id))
  }
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
        disabled={true}
        fontSize={[4,4,5]}
        onChange={() => { setLocalValue(input.current.value) }}
        onKeyPress={(e: KeyboardEvent) => { if (e.key === 'Enter' && value !== localValue) update(localValue) }}
        onBlur={() => { if (value !== localValue) update(localValue) }}
        padding={0}
        ref={input}
        type='text'
        value={localValue}
        />
      <Text
        fontSize={[1, 1, 1, 2]}
        opacity={0.8}
        >
        {date.toDateString()}
      </Text>
    </Box>
    <Checkbox
      checked={checked}
      toggle={() => { console.log('todo: complete!') }}
      />
  </Flex>
)}

export const Viewer = ({data}: {data: Task[]}) => {
  if (!data || data.length === 0) console.log('No tasks')
  else console.log(`${data.length} task${data.length > 1 ? 's' : ''}`)
  return(
    <Box m={0}>
      {data.map(({id, date, value, checked}) =>
        <Item
          id={id}
          key={id}
          date={date}
          value={value}
          checked={checked}
          />
      )}
    </Box>
   )
}
