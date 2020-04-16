import React, { PureComponent } from 'react'
import { ThemeProvider } from 'emotion-theming'
import { Context } from './Context'

import Tasky from './Tasky'
import cloud from './Database'

export default class extends PureComponent {
  static contextType = Context
  componentDidMount = () => cloud.taskArray().then(this.context.setData)
  render = () => <ThemeProvider theme={this.context.theme}><Tasky/></ThemeProvider>
}
