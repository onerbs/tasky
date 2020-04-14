import React, { useRef, useState } from 'react'
import { Box, Flex, Heading } from 'rebass'
import { Input } from '@rebass/forms'

import Controls from './Controls'
import { DatePicker } from './DatePicker'

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
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(30px)',
      }}
      >
      <Box
        backgroundColor='modal'
        p={3} sx={{
          position: 'relative',
          borderRadius: 'plus',
          userSelect: 'none'
        }}
        width={[300, 350, 450]}
        >
        <div>
          <Heading
            fontSize={[4, 4, 5]}
            textAlign={'center'}
            >
            New task
          </Heading>
        </div>
        <Flex p={4} alignItems='center'>
          <Input
            ref={taskInput}
            placeholder='Read a book'
            onChange={e => { setTaskValue(e.target.value) }}
            value={taskValue}
            marginRight={2}
            />
          <DatePicker lang={lang}/>
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
