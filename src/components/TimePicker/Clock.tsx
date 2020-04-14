import React, { useRef, useState } from 'react'
import { Box } from 'rebass'
import { Input } from '@rebass/forms'

export const Clock = ({active, hide}: {active: boolean, hide: () => void}) => {
  const [hour, setHour] = useState(18)
  const [mins, setMins] = useState(30)
  const inputHour = useRef(document.createElement('input'))
  const inputMins = useRef(document.createElement('input'))
  return (
    <Box display={active ? 'block' : 'none'}>
      <Input type='number' fontSize={4} value={hour}
        ref={inputHour} onChange={() => { setHour(parseInt(inputHour.current.value)) }}
        />
      <Input type='number' fontSize={4} value={mins}
        ref={inputMins} onChange={() => { setMins(parseInt(inputMins.current.value)) }}
        />
    </Box>
  )
}
 