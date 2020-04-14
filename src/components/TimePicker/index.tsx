import React, { useState } from 'react'
import { Button } from 'rebass'
import { Clock } from './Clock'

export const TimePicker = ({lang = 'en'}) => {
  const [active, setActive] = useState(false)
  return (
    <div>
      <Button variant='outline' onClick={() => { setActive(!active) }}>
        time
      </Button>
      <Clock active={active} hide={() => { setActive(false) }}/>
    </div>
  )
}
