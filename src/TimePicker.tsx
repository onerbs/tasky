import React, { useRef, useState } from 'react'
import { Button, Flex } from 'rebass'
import { Input } from '@rebass/forms'
import { Middle } from './Shadow'

export const TimePicker = ({date, setDate}: {
  date: Date,
  setDate: any
}) => {
  const [visible, setVisible] = useState(false)
  const inputHour = useRef(document.createElement('input'))
  const inputMins = useRef(document.createElement('input'))
  const setTime = (h: number, m: number) => {
    setDate(new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(), h, m
    ))
  }
  return (<>
    <Button variant='ghost' onClick={() => { setVisible(true) }}>
      {[date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()].join(':')}
    </Button>
    {visible && <Middle dim close={() => { setVisible(false) }}>
      <Flex
        backgroundColor='text' color='back'
        flexDirection='column' py={[4, 5]}
        sx={{
          borderRadius: 'default',
          boxShadow: 'default',
          width: ['125px', '160px'],
          mt: '-5em'
        }}
        >
        <Input p={0}
          type='number'
          fontSize={[6, 7]}
          value={date.getHours()}
          min={0} max={23} overflow='overlay'
          sx={{ fontWeight: 'bold', textAlign: 'center' }}
          ref={inputHour} onChange={() => {
            setTime(parseInt(inputHour.current.value), date.getMinutes())
          }}
          />
        <Input p={0}
          type='number'
          fontSize={[6, 7]}
          value={date.getMinutes()}
          min={0} max={59} overflow='overlay'
          sx={{ textAlign: 'center' }}
          ref={inputMins} onChange={() => {
            setTime(date.getHours(), parseInt(inputMins.current.value))
          }}
          />
      </Flex>
    </Middle>}
  </>)
}
