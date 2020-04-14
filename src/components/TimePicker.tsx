import React, { useRef, useState } from 'react'
import { Button, Flex } from 'rebass'
import { Input } from '@rebass/forms'

export const TimePicker = () => {
  const [hour, setHour] = useState(18)
  const [mins, setMins] = useState(30)
  const [active, setActive] = useState(false)
  const inputHour = useRef(document.createElement('input'))
  const inputMins = useRef(document.createElement('input'))
  return (
    <div>
      <Button variant='outline' onClick={() => { setActive(!active) }}>
        {hour}:{mins}
      </Button>
      <Flex
        backgroundColor='text' color='back'
        display={active ? '' : 'none!important'}
        flexDirection='column' py={[4, 5]}
        sx={{
          borderRadius: 'default',
          boxShadow: 'default',
          position: 'absolute',
          width: ['7.5em', '170px'],
          right: ['2.4em', '5.6em', '8.75em'],
          top: ['-3.5em', '-4em', '-3em']
        }}
        >
        <Input p={0}
          type='number'
          fontSize={[6, 7]}
          value={hour}
          min={0} max={23}
          sx={{ fontWeight: 'bold', textAlign: 'center' }}
          ref={inputHour} onChange={() => { setHour(parseInt(inputHour.current.value)) }}
          />
        <Input p={0}
          type='number'
          fontSize={[6, 7]}
          value={mins}
          min={0} max={59}
          sx={{ textAlign: 'center' }}
          ref={inputMins} onChange={() => { setMins(parseInt(inputMins.current.value)) }}
          />
      </Flex>
    </div>
  )
}
