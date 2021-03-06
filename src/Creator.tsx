import React, { useContext, useRef, useState } from 'react'
import { Box, Flex, Heading } from 'rebass'
import { Input } from '@rebass/forms'
import { Context } from './Context'

import Controls from './Controls'
import { DatePicker } from './DatePicker'
import { TimePicker } from './TimePicker'
import cloud from './Database'
import Task from './Task'

import { Middle } from './Shadow'

export default (props: any) => {
  const { close } = props
  const [value, setValue] = useState('')
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
  const { lang, setData } = useContext(Context)
  return (
    <Middle {...props}>
      <Box
        backgroundColor='darken'
        width={[280, 340, 400, 500]}
        px={0} py={[2, 4]} sx={{
          borderRadius: 'plus',
          userSelect: 'none'
        }}
        >
        <Heading my={3}
          fontSize={[4, 5]}
          textAlign={'center'}
          letterSpacing={-1}
          >
          {lang.task.create}
        </Heading>
        <Input
          ref={taskInput}
          placeholder='Pet the dog'
          onChange={e => { setValue(e.target.value) }}
          value={value} width='100%'
          py={[3, 3, 3, 4]} sx={{
            textAlign: 'center',
            fontSize: '1.15em'
          }}
          />
        <Flex my={3} alignItems='center' justifyContent='space-around'>
          <DatePicker date={date} setDate={setDate}/>
          <TimePicker date={date} setDate={setDate}/>
        </Flex>
        <Controls px={[4, 5]}
          showLeftIcon={false}
          rightAction={() => {
            if (value.trim() !== '') { close()
              Task.create(value, date)
                .then(task => { cloud.send(task, true) })
                .then(() => { cloud.taskArray().then(setData) })
            } else {
              console.log(lang.task.missing)
            }
          }}
          />
      </Box>
    </Middle>
  )
}
