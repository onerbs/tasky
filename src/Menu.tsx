import React from 'react'
import { Box, Flex } from 'rebass'
import { Relative } from './Shadow'

const Option = ({value, action}: {
  value: string
  action: () => void
}) => (
  <Box px={3} py={2}
    sx={{ cursor: 'pointer' }}
    onClick={action}>
    {value}
  </Box>
)

export default (props: any) =>
<Relative close={props.close}
  justifyContent='flex-start' p={[3, 4]}
  alignItems={['flex-end', 'flex-end', 'flex-start']}>
  <Flex sx={{ borderRadius: 'default' }}
    color='back'
    backgroundColor='text'
    flexDirection='column'
    >
    <Option value='Delete' action={() => {
      props.deleteMode()
      props.close()
    }}/>
    <Option value='Archive' action={() => {
      props.archiveMode()
      props.close()
    }}/>
  </Flex>
</Relative>
