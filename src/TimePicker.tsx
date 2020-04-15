import React, { useRef, useState } from 'react'
import { Button, Flex } from 'rebass'
import { Input } from '@rebass/forms'

export const TimePicker = ({date, setDate}: {
  date: Date,
  setDate: any
}) => {
  const [active, setActive] = useState(false)
  const inputHour = useRef(document.createElement('input'))
  const inputMins = useRef(document.createElement('input'))
  const setTime = (h: number, m: number) => {
    setDate(new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(), h, m
    ))
  }
  return (
    <div>
      <Button variant='ghost' onClick={() => { setActive(!active) }}>
        {[date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()].join(':')}
      </Button>
      <Flex
        backgroundColor='text' color='back'
        display={active ? '' : 'none!important'}
        flexDirection='column' py={[4, 5]}
        sx={{
          borderRadius: 'default',
          boxShadow: 'default',
          position: 'absolute',
          width: ['7.5em', '170px'],
          right: ['2.4em', '5.6em', '8.75em'],
          top: ['-3.5em', '-4em', '-3em']
        }}
        >
        <Input p={0}
          type='number'
          fontSize={[6, 7]}
          value={date.getHours()}
          min={0} max={23}
          sx={{ fontWeight: 'bold', textAlign: 'center' }}
          ref={inputHour} onChange={() => {
            setTime(parseInt(inputHour.current.value), date.getMinutes())
          }}
          />
        <Input p={0}
          type='number'
          fontSize={[6, 7]}
          value={date.getMinutes()}
          min={0} max={59}
          sx={{ textAlign: 'center' }}
          ref={inputMins} onChange={() => {
            setTime(date.getHours(), parseInt(inputMins.current.value))
          }}
          />
      </Flex>
    </div>
  )
}
