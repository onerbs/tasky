import React, { useState } from 'react'

import { Box } from 'rebass'
import { Calendar as CalendarIcon } from 'react-feather'
import Calendar from './Calendar'

export const DatePicker = ({lang = 'en'}) => {
  const [active, setActive] = useState(false)
  return (<>
    <CalendarIcon
      cursor='pointer'
      onClick={() => { setActive(!active) }}
      />
    <Box
      display={active ? 'block' : 'none'}
      sx={{ position: 'absolute' }}
      >
      <Calendar lang={lang}/>
    </Box>
  </>)
}
