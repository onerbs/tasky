import React, { useState } from 'react'

import { Flex, Text } from 'rebass'
import { Box } from 'rebass/styled-components'
import styled from 'styled-components'

import Controls from './Controls'
import locale from './locale'

const Cell = styled(Box)`
  padding: 0.5em;
  text-align: center;
  width: calc(100% / 7);
`

export default ({active = false, lang = 'en'}) => {
  const now = new Date()
  const date = useState(new Date(
    now.getFullYear(),
    now.getMonth()+1,
    now.getDate()+1,
    18, 30, 0
  ))[0]

  // let [y, m, d, H, M, S] = [
  //   date.getFullYear(),
  //   date.getMonth()+1,
  //   1, 0, 0, 0
  // ]

  // let firstDayOfTheCurrentMonth = new Date(y, m, d).getDay()
  return (
    <Flex
      bg='fore'
      color='back'
      display={active ? 'flex' : 'none'}
      flexDirection='column'
      width={[250, 300, 400]}
      sx={{
        borderRadius: 'default',
        boxShadow: 'default',
        position: 'absolute',
        right: '0',
        top: '-12em',
        left: '-1.4em',
      }}
      >
      <Flex py={3} justifyContent='space-around'>
        <Text>{locale(lang).month.name[date.getMonth()]}</Text>
        <Text>{date.getFullYear()}</Text>
      </Flex>
      <Flex flexWrap='wrap' p={[1, 2, 2, 3]}>
        {locale(lang).day.symbol.map(l =>
          <Cell key={l}>
            <Text fontWeight='bold'>{l}</Text>
          </Cell>
        )}
        {[1,2,3,4,5,6,7,8].map(n =>
          <Cell key={n}>{n}</Cell>
        )}
      </Flex>
      <Controls color='back'/>
    </Flex>
  )
}
