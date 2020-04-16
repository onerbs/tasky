import React, { Suspense, lazy, useState, useContext } from 'react'
import { Flex, Heading } from 'rebass'
import { Menu as Hamburger, Plus } from 'react-feather'

import { Viewer } from './Task'
import Controls from './Controls'
import { Context } from './Context'

export const ModeContext = React.createContext(0)
const Creator = lazy(() => import('./Creator'))
const Menu = lazy(() => import('./Menu'))

export default () => {
  const [menuState, showMenu] = useState(false)
  const [create, createTask] = useState(false)
  const { mode, setMode } = useContext(Context)

  return (<>
    {/* TASKY */}
    <Flex p={[1, 3, 4, 5]}
      color='text'
      backgroundColor='back'
      height='100vh'
      flexDirection='column'>

      {/* HEADER */}
      <Flex sx={{
          bg: 'back',
          left: "20%",
          position: 'fixed',
          right: "20%",
          textAlign: 'center',
          top: 0
        }}
        alignItems='center'
        justifyContent='center'
        >
        <Heading color='primary'
          fontSize={[6, 6, 7]}
          letterSpacing={[-5, -5, -7]}
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
        <Viewer/>
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
          />
      }
    </Suspense>
  </>)
}
