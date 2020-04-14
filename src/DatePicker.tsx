import React, { useState } from 'react'

import { Button, Flex, Text } from 'rebass'
import { Box } from 'rebass/styled-components'
import styled from 'styled-components'

import Controls from './Controls'
import { TT } from './strings'

const Cell = styled(Box)`
  padding: 0.5em;
  text-align: center;
  width: calc(100% / 7);
`

const seq = (O: number, A = 1) => {
  let seq = []; for (let i = A; i <= O; i++) seq.push(i)
  return seq
}

const Calendar = ({hide, active, T}: {
  hide: () => void,
  active: boolean,
  T: TT
}) => {
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
      bg='text'
      color='back'
      display={active ? 'flex' : 'none'}
      flexDirection='column'
      width={[270, 300, 400]}
      sx={{
        borderRadius: 'default',
        boxShadow: 'default',
        position: 'absolute',
        top: '-16.3em',
        left: ['-8.4em', '-9.4em', '-12.4em'],
      }}
      >
      <Flex fontSize={3} py={3} pt='1.25em' justifyContent='space-around'>
        <Text letterSpacing={3} lineHeight='1'>
          {T.month.name[date.getMonth()]}
        </Text>
        <Text letterSpacing={3} lineHeight='1'>
          {date.getFullYear()}
        </Text>
      </Flex>
      <Flex flexWrap='wrap' p={[1, 2, 2, 3]}>
        {T.day.symbol.map(l =>
          <Cell key={l}>
            <Text fontWeight='bold'>{l}</Text>
          </Cell>
        )}
        {seq(31, 29).map(n => <Cell key={n}>{n}</Cell>)}
        {seq(30).map(n => <Cell key={n}>{n}</Cell>)}
        {seq(9).map(n => <Cell key={n}>{n}</Cell>)}
      </Flex>
      <Controls color='back' leftAction={hide}/>
    </Flex>
  )
}

export const DatePicker = ({T}: {T: TT}) => {
  const [active, setActive] = useState(false)
  return (<>
    <Button variant='outline'
      onClick={() => { setActive(true) }}
      >
      date
    </Button>
    <Box
      display={active ? 'block' : 'none'}
      sx={{ position: 'absolute' }}
      >
      <Calendar T={T} active={active}
        hide={() => { setActive(false) }}
        />
    </Box>
  </>)
}
