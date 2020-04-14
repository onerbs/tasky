import React from 'react'

import { Flex } from 'rebass/styled-components'
import { Text } from 'rebass'
import { Check, X } from 'react-feather'

export default ({
  color = 'primary',
  LeftIcon = X,
  leftAction = () => {},
  RightIcon = Check,
  rightAction = () => {}
}) =>
<Flex p={3} className='Controls' justifyContent='space-between'>
  <Text as='span' color={color} onClick={leftAction} >
    <LeftIcon cursor='pointer'/>
  </Text>
  <Text as='span' color={color} onClick={rightAction} >
    <RightIcon cursor='pointer'/>
  </Text>
</Flex>
