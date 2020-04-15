import React, { useState } from 'react'

import { Button, Flex, Text } from 'rebass'
import { Box } from 'rebass/styled-components'
import styled from 'styled-components'

import Controls from './Controls'
import { TT } from './strings'

const Cell = styled(Box)`
  padding: 0.5em 0;
  line-height: 1;
  text-align: center;
  width: calc(100% / 7);
`

const seq = (O: number, A = 1) => {
  let seq = []; for (let i = A; i <= O; i++) seq.push(i)
  return seq
}

export const DatePicker = ({date, setDate, T}: {
  date: Date,
  setDate: any,
  T: TT
}) => {
  const [active, setActive] = useState(false)
  const _pick = (y: number, m: number, d: number) => {
    setDate(new Date(
      y, m, d, date.getHours(),
      date.getMinutes(), 0, 0
    ))
  }
  // const pickYear = (year: number) => {
  //   _pick(year, date.getMonth(), date.getDate())
  // }
  // const pickMonth = (month: number) => {
  //   _pick(date.getFullYear(), month, date.getDate())
  // }
  const pickDate = (day: number) => {
    _pick(date.getFullYear(), date.getMonth(), day)
  }
  return (<>
    <Button variant='ghost'
      onClick={() => { setActive(true) }}
      >
      {T.month.name[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
    </Button>
    <Box
      display={active ? 'block' : 'none'}
      sx={{ position: 'absolute' }}
      >
      <Flex
        bg='text'
        color='back'
        display={active ? 'flex' : 'none'}
        flexDirection='column'
        width={[270, 300, 400]}
        p={2} sx={{
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
          {seq(31, 29).map(n => <Cell key={`B${n}`} opacity={0.58}>{n}</Cell>)}
          {seq(30).map(n => <Cell key={`A${n}`}
            className={n === date.getDate() ? 'activeDate' : ''}
            onClick={() => { pickDate(n) }}
            >{n}</Cell>)}
          {seq(9).map(n => <Cell key={`B${n}`} opacity={0.58}>{n}</Cell>)}
        </Flex>
        <Controls color='back' LeftIcon={() => <></>} rightAction={() => setActive(false)}/>
      </Flex>
    </Box>
  </>)
}
