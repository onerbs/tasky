import React, { useContext, useEffect, useRef, useState } from 'react'
import { Box, Flex, Text } from 'rebass'
import { Input } from '@rebass/forms'
import { Archive, CheckSquare, Square, Trash } from 'react-feather'
import { Context } from './Context'
import cloud from './Database'

const Item = ({task}: { task: Task }) => {
  const { lang, mode, data, setData } = useContext(Context)
  const {id, value, date, checked, archived} = task

  const [_value, setValue] = useState(value)
  const [_checked, setChecked] = useState(checked)

  const input = useRef(document.createElement('input'))

  const _setValue = (nova: string) => {
    if (value !== nova) cloud.send(new Task(nova, date, _checked, archived, id))
  }
  const fmtDate = (d: Date) =>
    `${lang.day.name[d.getDay()]}, ${lang.month.name[d.getMonth()]} ${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
  useEffect(() => { setValue(value) }, [value])

return (
  <Flex m='0 auto' p={3}
    maxWidth='600px'
    alignItems='center'
    >
    <Box width='100%'>
      <Input
        disabled={_checked} fontSize={[4, 4, 5]} mb={1} p={0}
        ref={input} sx={{ border: 'none' }} value={_value}
        onBlur={() => { _setValue(_value) }}
        onChange={() => { setValue(input.current.value) }}
        onKeyPress={ev => { if (ev.key === 'Enter') _setValue(_value) }}
        />
      <Text fontSize={[1, 1, 1, 2]} opacity={0.8}
        > {fmtDate(date)} </Text>
    </Box>
    { mode === 1 ? <Box mr='2px' onClick={() => { cloud.delete(task.id); setData(data.filter(t => t.id !== task.id)) }}><Trash/></Box>
    : mode === 2 ? <Box mr='2px' onClick={() => { cloud.send(task.archive()) }}><Archive/></Box>
    : <Box mr='2px' onClick={() => {
        cloud.send(new Task(_value, date, !_checked, archived, id))
        setChecked(!_checked)
      }}>
        {_checked ? <CheckSquare/> : <Square/>}
      </Box>
    }
  </Flex>
)}

export const Viewer = () =>
<Box overflow='overlay'>
  {useContext(Context).data.map(task => <Item key={task.id} task={task}/>)}
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
