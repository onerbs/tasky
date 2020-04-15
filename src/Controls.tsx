import React from 'react'

import { Box, Flex, Text } from 'rebass'
import { Check, X } from 'react-feather'

export default ({
  LeftIcon = X,
  leftAction = () => {},
  showLeftIcon = true,
  leftColor = '',
  RightIcon = Check,
  rightAction = () => {},
  showRightIcon = true,
  rightColor = '',
  px, py, pad = [3],
  color = 'primary'
}: {
  LeftIcon?: React.ComponentType<any>
  leftAction?: () => void
  showLeftIcon?: boolean,
  leftColor?: string,
  RightIcon?: React.ComponentType<any>
  rightAction?: () => void
  showRightIcon?: boolean,
  rightColor?: string,
  px?: number | number[],
  py?: number | number[],
  pad?: number | number[],
  color?: string
}) => {
  return (
    <Flex px={px ? px : pad} py={py ? py : pad}
      justifyContent='space-between'>
      <Box width={1/2} sx={{ textAlign: 'left' }}>
        {showLeftIcon && <Text as={'span'}
          color={leftColor ? leftColor : color}
          onClick={leftAction}
          >
          <LeftIcon cursor='pointer'/>
        </Text>}
      </Box>

      <Box width={1/2} sx={{ textAlign: 'right' }}>
        {showRightIcon && <Text as={'span'}
          color={rightColor ? rightColor : color}
          onClick={rightAction}
          >
          <RightIcon cursor='pointer'/>
        </Text>}
      </Box>
    </Flex>
  )
}
