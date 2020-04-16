import React, { useContext, useState } from 'react'
import { Box, Button, Flex, Text } from 'rebass'
import { Middle } from './Shadow'
import Controls from './Controls'
import { Context } from './Context'

const CellSX={ lineHeight: 1, textAlign: 'center' }
const Cell = (props: any) =>
<Box width={1/7} py='0.5em' px={0} sx={CellSX} {...props}/>

const seq = (O: number, A = 1) => {
  let seq = []; for (let i = A; i <= O; i++) seq.push(i)
  return seq
}

export const DatePicker = ({date, setDate}: { date: Date, setDate: any }) => {
  const { lang } = useContext(Context)
  const [visible, setVisible] = useState(false)
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
      onClick={() => { setVisible(true) }}
      >
      {lang.month.name[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
    </Button>
    {visible && <Middle dim close={() => { setVisible(false) }}>
      <Flex
        bg='text'
        color='back'
        display={visible ? 'flex' : 'none'}
        flexDirection='column'
        width={[270, 300, 400]}
        p={2} sx={{
          borderRadius: 'default',
          boxShadow: 'default',
        }}
        >
        <Flex fontSize={3} py={3} pt='1.25em' justifyContent='space-around'>
          <Text letterSpacing={3} lineHeight='1'>
            {lang.month.name[date.getMonth()]}
          </Text>
          <Text letterSpacing={3} lineHeight='1'>
            {date.getFullYear()}
          </Text>
        </Flex>
        <Flex flexWrap='wrap' p={[1, 2, 2, 3]}>
          {lang.day.symbol.map(l =>
            <Cell key={l} fontWeight='bold'>{l}</Cell>
          )}
          {seq(31, 29).map(n => <Cell key={`B${n}`} opacity={0.58}>{n}</Cell>)}
          {seq(30).map(n =>
            <Cell
              key={`A${n}`}
              onClick={() => { pickDate(n) }}
              sx={n === date.getDate() ? {
                color: 'secondary',
                fontWeight: 'heading',
                ...CellSX
              } :  CellSX}
              >{n}
            </Cell>)
          }
          {seq(9).map(n => <Cell key={`B${n}`} opacity={0.58}>{n}</Cell>)}
        </Flex>
        <Controls
          color='back'
          showLeftIcon={false}
          rightColor='secondary'
          rightAction={() => setVisible(false)}/>
      </Flex>
    </Middle>}
  </>)
}
