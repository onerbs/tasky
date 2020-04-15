import React from 'react'
import { Box, Flex } from 'rebass'

export const Middle = (props: any) =>
  <Flex
    alignItems='center'
    justifyContent='center'
    sx={{
      position: 'absolute',
      top: 0, right: 0, bottom: 0, left: 0,
      backgroundColor: (props.dim ? 'dimmedShadow' : 'shadow'),
      backdropFilter: 'blur(30px)',
      zIndex: 50 + (props.zIndex ? props.zIndex : 0),
    }} onClick={event => {
      if (event.target === event.currentTarget && props.close) props.close()
    }} {...props} />

export const Relative = (props: any) =>
  <Middle {...props}>
    <Box sx={{
      position: 'relative',
      top: 0, right: 0, bottom: 0, left: 0,
      backgroundColor: 'transparent'
    }} {...props} />
  </Middle>
