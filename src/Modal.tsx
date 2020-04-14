import React, { useRef, useState } from 'react'
import { Box, Flex, Heading } from 'rebass'
import { Input } from '@rebass/forms'

import Controls from './Controls'
import { DatePicker } from './components/DatePicker'
import { TimePicker } from './components/TimePicker'

export default ({hide = () => {}, lang, active}: {
  hide: () => void,
  lang: string,
  active: boolean
}) => {
  console.log(active);

  const [taskValue, setTaskValue] = useState('')
  const taskInput = useRef(null)
  return active ? (
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
          New task
        </Heading>
        <Input
          ref={taskInput}
          placeholder='Pet the dog'
          onChange={e => { setTaskValue(e.target.value) }}
          value={taskValue} width='100%'
          py={3} sx={{ textAlign: 'center', fontSize: '1.15em' }}
          />
        <Flex my={3} alignItems='center' justifyContent='space-around'>
          <DatePicker lang={lang}/>
          <TimePicker lang={lang}/>
        </Flex>
        <Controls
          rightAction={() => {
            console.log(taskValue)
            hide()
          }}
          />
      </Box>
    </Flex>
  ) : <></>
}
