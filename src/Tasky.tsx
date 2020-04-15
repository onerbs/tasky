import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Flex, Heading } from 'rebass'
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
  const [modalState, showModal] = useState(false)
  const [T, loadStrings] = useState(strings(lang))

  const updateView = () => {
    cloud.taskArray().then(setLocalTasks)
  }

  useEffect(() => { loadStrings(strings(lang)) }, [lang])
  useEffect(updateView, [])

  return (
    <ThemeProvider theme={ヌシ}>
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
            color='primary'
            fontSize={[6, 6, 7]}
            letterSpacing={[-5, -5, -7]}
            > Tasky </Heading>
        </Flex>
        <div>
          <Controls
            LeftIcon={Menu}
            RightIcon={Plus}
            rightAction={() => { showModal(true) }}
            />
        </div>
        <Viewer mt={['5em', '5em', 0]} T={T} data={localTasks}/>
      </Flex>
      <Suspense fallback={<></>}>
        {modalState &&
          <Modal T={T} color='text'
            backgroundColor='modal'
            close={() => { showModal(false) }}
            updateview={updateView}
            />
        }
      </Suspense>
    </ThemeProvider>
  )
}
