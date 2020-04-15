import React, { PureComponent } from 'react'

import { ThemeProvider } from 'emotion-theming'
import ヌシ from './ヌシ.json'

import { strings, LanguageContext } from './strings'

import Task from './Task'
import Tasky from './Tasky'

export class App extends PureComponent {
  state = {
    strings: strings(),
    data: new Array<Task>(),
  }
  translate = (lang: string) => this.setState({ strings: strings(lang) })
  render = () => (
    <ThemeProvider theme={ヌシ}>
      <LanguageContext.Provider value={this.state.strings}>
        <Tasky data={this.state.data}
            setData={(nova: Task[]) => { this.setState({ data: nova }) }}/>
      </LanguageContext.Provider>
    </ThemeProvider>
  )
}
