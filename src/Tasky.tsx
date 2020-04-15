import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Flex, Heading } from 'rebass'
import { Menu, Plus } from 'react-feather'

import Task, { Viewer } from './Task'
import Controls from './Controls'
import AppMenu from './Menu'

import { ThemeProvider } from 'emotion-theming'
import ヌシ from './ヌシ.json'

import cloud from './Database'
import { strings, LanguageContext } from './strings'

export const ModeContext = React.createContext(0)
const Modal = lazy(() => import('./Modal'))

export default () => {

  const [localTasks, setLocalTasks] = useState(new Array<Task>())
  const [menuState, showMenu] = useState(false)
  const [modalState, showModal] = useState(false)
  const [mode, setMode] = useState(0)
  const [T, translate] = useState(strings())

  const updateView = () => {
    cloud.taskArray().then(setLocalTasks)
  }

  useEffect(updateView, [])

  return (
    <ThemeProvider theme={ヌシ}>
      <LanguageContext.Provider value={T}>
        <Flex p={[0, 3, 4, 5]}
          color='text'
          backgroundColor='back'
          height='100vh'
          flexDirection={[
            'column-reverse',
            'column-reverse',
            'column'
          ]}
          >
          <Flex sx={{
              bg: 'back',
              position: 'fixed',
              textAlign: 'center',
              left: [0, 0, '20%'],
              right: [0, 0, '20%'],
              top: 0 }}
              alignItems='center'
              justifyContent='center'>
            <Heading mt={['5pt', '5pt', 0]}
              color='primary' onClick={() => { translate(strings('fr')) }}
              fontSize={[6, 6, 7]}
              letterSpacing={[-5, -5, -7]}
              > Tasky </Heading>
          </Flex>
          <div>
            <Controls
              LeftIcon={Menu}
              RightIcon={Plus}
              leftAction={() => { showMenu(true) }}
              rightAction={() => { showModal(true) }}
              />
          </div>
          <ModeContext.Provider value={mode}>
            <Viewer data={localTasks}/>
          </ModeContext.Provider>
        </Flex>
        <Suspense fallback={<></>}>
          {menuState && <AppMenu
            deleteMode={() => { if (mode === 1) setMode(0); else setMode(1) }}
            archiveMode={() => { if (mode === 2) setMode(0); else setMode(2) }}
            close={() => { showMenu(false) }}
            />}
        </Suspense>
        <Suspense fallback={<></>}>
          {modalState &&
            <Modal color='text'
              backgroundColor='modal'
              close={() => { showModal(false) }}
              updateview={updateView}
              />
          }
        </Suspense>
      </LanguageContext.Provider>
    </ThemeProvider>
  )
}
