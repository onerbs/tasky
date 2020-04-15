import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Flex, Heading } from 'rebass'
import { Menu as Hamburger, Plus } from 'react-feather'

import Task, { Viewer } from './Task'
import Controls from './Controls'

import cloud from './Database'

export const ModeContext = React.createContext(0)
const Creator = lazy(() => import('./Creator'))
const Menu = lazy(() => import('./Menu'))

export default ({data, setData}: {
  data: Task[], setData: (nova: Task[]) => void
}) => {
  const [menuState, showMenu] = useState(false)
  const [create, createTask] = useState(false)
  const [mode, setMode] = useState(0)

  const refresh = () => {
    cloud.taskArray().then(setData)
  }; useEffect(refresh, [data])

  return (<>
    {/* TASKY */}
    <Flex p={[0, 3, 4, 5]}
      color='text'
      backgroundColor='back'
      height='100vh'
      flexDirection={[
        'column-reverse',
        'column-reverse',
        'column'
      ]}>

      {/* HEADER */}
      <Flex sx={{
          bg: 'back',
          left: [0, 0, '20%'],
          position: 'fixed',
          right: [0, 0, '20%'],
          textAlign: 'center',
          top: 0
        }}
        alignItems='center'
        justifyContent='center'
        >
        <Heading color='primary'
          fontSize={[6, 6, 7]}
          letterSpacing={[-5, -5, -7]}
          mt={['5pt', '5pt', 0]}
          > Tasky </Heading>
      </Flex>

      {/* CONTROLS */}
      <Controls
        LeftIcon={Hamburger}
        RightIcon={Plus}
        leftAction={() => { showMenu(true) }}
        rightAction={() => { createTask(true) }}
        />

      {/* TASK VIEWER */}
      <ModeContext.Provider value={mode}>
        <Viewer data={data} refresh={refresh}/>
      </ModeContext.Provider>
    </Flex>

    {/* MENU BUTTON */}
    <Suspense fallback={<></>}>
      { menuState &&
        <Menu close={() => { showMenu(false) }}
          deleteMode={() => { if (mode === 1) setMode(0); else setMode(1) }}
          archiveMode={() => { if (mode === 2) setMode(0); else setMode(2) }}
          />
      }
    </Suspense>

    {/* CREATOR BUTTON */}
    <Suspense fallback={<></>}>
      { create &&
        <Creator color='text'
          backgroundColor='modal'
          close={() => { createTask(false) }}
          refresh={refresh}
          />
      }
    </Suspense>
  </>)
}
