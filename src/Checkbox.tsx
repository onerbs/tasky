import React from 'react'
import { CheckSquare, Square } from 'react-feather'
import { Box } from 'rebass'

const Checkbox = ({checked, toggle}: {
  checked: boolean
  toggle: () => void
}) =>
  <Box onClick={toggle} ml={3}>
    {checked ? <CheckSquare/> : <Square/>}
  </Box>
export default Checkbox
