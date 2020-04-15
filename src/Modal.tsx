import React, { useRef, useState } from 'react'
import { Box, Flex, Heading } from 'rebass'
import { Input } from '@rebass/forms'

import Controls from './Controls'
import { DatePicker } from './DatePicker'
import { TimePicker } from './TimePicker'
import { TT } from './strings'
import cloud from './Database'
import Task from './Task'

export default ({updateview, hide = () => {}, T}: {
  updateview: () => void,
  hide: () => void,
  T: TT
}) => {
  const [taskValue, setTaskValue] = useState('')
  const [date, setDate] = useState(() => {
    let d = new Date()
    return new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate()+1,
      18, 30, 0, 0
    )
  })
  const taskInput = useRef(null)
  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      sx={{
        position: 'absolute',
        top: 0, right: 0, bottom: 0, left: 0,
        backgroundColor: 'shadow',
        backdropFilter: 'blur(30px)',
      }}
      >
      <Box
        backgroundColor='darken'
        p={[0, 2, 3]} sx={{
          position: 'relative',
          borderRadius: 'plus',
          userSelect: 'none'
        }}
        width={[300, 350, 450]}
        >
        <Heading my={3}
          fontSize={[4, 4, 5]}
          textAlign={'center'}
          letterSpacing={-1}
          >
          {T.task.create}
        </Heading>
        <Input
          ref={taskInput}
          placeholder='Pet the dog'
          onChange={e => { setTaskValue(e.target.value) }}
          value={taskValue} width='100%'
          py={3} sx={{ textAlign: 'center', fontSize: '1.15em' }}
          />
        <Flex my={3} alignItems='center' justifyContent='space-around'>
          <DatePicker date={date} setDate={setDate} T={T}/>
          <TimePicker date={date} setDate={setDate}/>
        </Flex>
        <Controls
          leftAction={hide}
          rightAction={() => {
            Task.create(taskValue, date).then(task => {
              cloud.send(task, updateview, true)
            }); hide()
          }}
          />
      </Box>
    </Flex>
  )
}
