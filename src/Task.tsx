import React, { useContext, useEffect, useRef, useState } from 'react'
import { Box, Flex, Text } from 'rebass'
import { Input } from '@rebass/forms'
import { Archive, CheckSquare, Square, Trash } from 'react-feather'
import { LanguageContext } from './strings'
import { ModeContext } from './Tasky'
import cloud from './Database'

const Item = ({task, refresh}: { task: Task, refresh: () => void }) => {
  const {id, value, date, checked, archived} = task
  const [localValue, setLocalValue] = useState(value)
  const [localChecked, setLocalChecked] = useState(checked)
  const input = useRef(document.createElement('input'))

  const mode = useContext(ModeContext)
  const T = useContext(LanguageContext)

  const uv = (nova: string) => {
    if (value !== nova) cloud.send(new Task(nova, date, localChecked, archived, id))
  }
  const fmtDate = (d: Date) =>
    `${T.day.name[d.getDay()]}, ${T.month.name[d.getMonth()]} ${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
  useEffect(() => { setLocalValue(value) }, [value])

return (
  <Flex m='0 auto' p={3}
    maxWidth='600px'
    alignItems='center'
    >
    <Box width={0}>
      <Input
        disabled={localChecked} fontSize={[4, 4, 5]} mb={1} p={0}
        ref={input} sx={{ border: 'none' }} value={localValue}
        onBlur={() => { uv(localValue) }}
        onChange={() => { setLocalValue(input.current.value) }}
        onKeyPress={ev => { if (ev.key === 'Enter') uv(localValue) }}
        />
      <Text fontSize={[1, 1, 1, 2]} opacity={0.8}
        > {fmtDate(date)} </Text>
    </Box>
    { mode === 1 ? <Box onClick={() => { cloud.delete(task, refresh)}}><Trash/></Box>
    : mode === 2 ? <Box onClick={() => { cloud.send(task.archive()) }}><Archive/></Box>
    : <Box ml={3} onClick={() => {
        cloud.send(new Task(localValue, date, !localChecked, archived, id))
        setLocalChecked(!localChecked)
      }}>
        {localChecked ? <CheckSquare/> : <Square/>}
      </Box>
    }
  </Flex>
)}

export const Viewer = ({data, refresh}: { data: Task[], refresh: () => void }) =>
<Box overflow='overlay' mx={'24px'} mt={['5em', '5em', 0]}>
  {data.map(task => <Item key={task.id} task={task} refresh={refresh}/>)}
</Box>

export default class Task {
  value: string
  date: Date
  checked: boolean
  archived: boolean
  id: string
  constructor (
    value: string,
    date: Date,
    checked: boolean,
    archived: boolean,
    id: string
  ) {
    this.value = value
    this.date = date
    this.checked = checked
    this.archived = archived
    this.id = id
  }
  toggle = () => { this.checked = !this.checked; return this }
  archive = () => { this.archived = true; return this }
  static create = async (value: string, date: Date) => {
    return cloud.state.get()
      .then(st => st.data())
      .then(data => data ? `Task+${data.counter}` : 'Task+0')
      .then(id => new Task(value, date, false, false, id))
  }
  static fromDocumentData = (data: firebase.firestore.DocumentData) =>
    new Task (
      data.value,
      new Date(data.date.toMillis()),
      data.checked,
      data.archived,
      data.id
    )
}
