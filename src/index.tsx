import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import { ContextProvider } from './Context'
import App from './App'

render (
  <StrictMode>
    <ContextProvider>
      <App/>
    </ContextProvider>
  </StrictMode>,
  document.getElementById('Tasky')
)
