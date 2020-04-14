import React, { useEffect, useState } from 'react'
import { Box, Heading } from 'rebass'
import { Cloud } from './Database'
import Task, { Viewer } from './Task'
import { Menu, Plus } from 'react-feather'
import { ThemeProvider } from 'emotion-theming'
import Modal from './Modal'
import Controls from './Controls'
import ヌシ from './ヌシ.json'

const opt = (from: string, fb: string) => from ? from : fb
export default () => {

  const lang = useState(opt(document.documentElement.lang, 'en'))[0]
  const [localTasks, setLocalTasks] = useState(new Array<Task>())
  const [modalState, setModalState] = useState(false)

  useEffect(() => {
    console.log('populating...')
    Cloud.retrieve().then(setLocalTasks)
  }, [])

  return (
    <ThemeProvider theme={ヌシ}>
      <Box
        color='text'
        backgroundColor='back'
        height='100vh'
        paddingTop={3}
        >
        <Heading
          color='primary'
          fontSize={[6, 6, 7]}
          marginBottom={['auto','auto','1.5rem']}
          textAlign='center'
          letterSpacing='heading'
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0
          }}
          >
          Tasky
        </Heading>
        <Viewer data={localTasks}/>
        <div id="controls">
          <Controls
            LeftIcon={Menu}
            RightIcon={Plus}
            rightAction={() => {
              setModalState(true)
            }}
            />
        </div>
        <Modal
          hide={() => { setModalState(false) }}
          active={modalState}
          lang={lang}
          />
      </Box>
    </ThemeProvider>
  )
}
