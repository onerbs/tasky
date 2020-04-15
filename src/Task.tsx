import React, { useContext, useEffect, useRef, useState } from 'react'
import { Box, Flex, Text } from 'rebass'
import { Input } from '@rebass/forms'
import { Archive, CheckSquare, Square, Trash } from 'react-feather'
import { LanguageContext } from './strings'
import { ModeContext } from './Tasky'
import cloud from './Database'

export default class Task {
  id: string
  date: Date
  value: string
  checked: boolean
  constructor(value: string, date: Date, checked = false, id = '') {
    this.id = `Task+1`
    if (id) this.id = id
    else {
      cloud.state.get()
        .then(snap => snap.data())
        .then(data => data ? this.id = `Task+${data.counter}` : this.id)
        .then(console.log)
        .catch(console.log)
    }
    this.date = date
    this.value = value
    this.checked = checked
  }
  toggle = () => { this.checked = !this.checked }
  static create = async (value: string, date: Date) => {
    return cloud.state.get()
      .then(st => st.data())
      .then(data => data ? `Task+${data.counter}` : 'Task+1')
      .then(id => new Task(value, date, false, id))
  }
  static fromDocumentData = (data: firebase.firestore.DocumentData) =>
    new Task(data.value, new Date(data.date.toMillis()), data.checked, data.id)
}

const Item = ({task}: { task: Task }) => {
  const {id, value, date, checked} = task
  const [localValue, setLocalValue] = useState(value)
  const [localChecked, setLocalChecked] = useState(checked)
  const input = useRef(document.createElement('input'))

  const mode = useContext(ModeContext)
  const T = useContext(LanguageContext)

  const uv = (nova: string) => {
    if (value !== nova) cloud.send(new Task(nova, date, localChecked, id))
  }
  const fmtDate = (d: Date) =>
    `${T.day.name[d.getDay()]}, ${T.month.name[d.getMonth()]} ${d.getDate()}`
  useEffect(() => { setLocalValue(value) }, [value])
return(
  <Flex
    p={3}
    maxWidth='600px'
    margin='0 auto'
    alignItems='center'
    >
    <Box width='100%'>
      <Input type='text' ref={input}
        p={0} mb={1} sx={{ border: 'none' }}
        disabled={localChecked}
        fontSize={[4, 4, 5]}
        value={localValue}
        onBlur={() => { uv(localValue) }}
        onChange={() => { setLocalValue(input.current.value) }}
        onKeyPress={ev => { if (ev.key === 'Enter') uv(localValue) }}
        />
      <Text
        fontSize={[1, 1, 1, 2]}
        opacity={0.8}
        >
        {fmtDate(date)}
      </Text>
    </Box>
    { mode === 1 ? <Box onClick={() => { console.log('deletee') }}><Trash/></Box>
    : mode === 2 ? <Box onClick={() => { console.log('archive') }}><Archive/></Box>
    : <Box ml={3} onClick={() => {
        cloud.send(new Task(localValue, date, !localChecked, id))
        setLocalChecked(!localChecked)
      }}>
        {localChecked ? <CheckSquare/> : <Square/>}
      </Box>
    }
  </Flex>
)}

export const Viewer = ({data}: { data: Task[] }) =>
  data ? (
    <Box overflow='overlay' mx={'24px'} mt={['5em', '5em', 0]}>
      {data.map((task: Task) => <Item key={task.id} task={task}/>)}
    </Box>
  ) : <></>
