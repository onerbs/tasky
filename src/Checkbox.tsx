import React from 'react'
import {Box} from 'rebass'
import {CheckSquare, Square} from 'react-feather'

const Checkbox = ({checked, toggle}: {
  checked: boolean
  toggle: () => void
}) =>
  <Box onClick={toggle} mx={3}>
    {checked ? <CheckSquare/> : <Square/>}
  </Box>
export default Checkbox
