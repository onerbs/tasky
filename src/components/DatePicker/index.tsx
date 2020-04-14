import React, { useState } from 'react'

import { Box, Button } from 'rebass'
import Calendar from './Calendar'

export const DatePicker = ({lang = 'en'}) => {
  const [active, setActive] = useState(false)
  return (<>
    <Button variant='outline' onClick={() => { setActive(!active) }}>
      date
    </Button>
    <Box
      display={active ? 'block' : 'none'}
      sx={{ position: 'absolute' }}
      >
      <Calendar
        hide={() => { setActive(!active) }}
        active={active}
        lang={lang}
        />
    </Box>
  </>)
}
