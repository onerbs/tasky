import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Box, Heading } from 'rebass'
import { Menu, Plus } from 'react-feather'

import Task, { Viewer } from './Task'
import Controls from './Controls'

import { ThemeProvider } from 'emotion-theming'
import ヌシ from './ヌシ.json'

import cloud from './Database'
import strings from './strings'

const Modal = lazy(() => import('./Modal'))

export default () => {

  const [lang, setLang] = useState('es')
  const [localTasks, setLocalTasks] = useState(new Array<Task>())
  const [modalState, setModalState] = useState(false)
  const [T, loadStrings] = useState(strings(lang))

  const updateView = () => {
    cloud.taskArray().then(setLocalTasks)
  }

  useEffect(() => { loadStrings(strings(lang)) }, [lang])
  useEffect(updateView, [])

  return (
    <ThemeProvider theme={ヌシ}>
      <Box color='text'
        backgroundColor='back'
        height='100vh' pt={3}
        >
        <Heading
          color='primary'
          fontSize={[6, 6, 7]}
          marginBottom={['auto','auto','1.5rem']}
          textAlign='center'
          letterSpacing='heading'
          onClick={() => { setLang(lang === 'en' ? 'es' : 'en') }} //!COMMIT
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0
          }}
          >
          Tasky
        </Heading>
        <Viewer T={T} data={localTasks}/>
        <div id="controls">
          <Controls
            LeftIcon={Menu}
            RightIcon={Plus}
            rightAction={() => {
              setModalState(true)
            }}
            />
        </div>
        <Suspense fallback={<></>}>
          {modalState && <Modal T={T}
            hide={() => { setModalState(false) }}
            updateview={updateView}
            />}
        </Suspense>
      </Box>
    </ThemeProvider>
  )
}
