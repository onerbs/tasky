import React, { createContext, PureComponent } from 'react'
import Task from './Task'
import strings, { TT } from './strings'
import theme from './theme'

interface iContext {
  data: Task[]
  mode: number,
  lang: TT,
  theme: any,
  setData: (data: Task[]) => void
  setMode: (mode: number) => void
  setLang: (lang: string) => void
  chTheme: () => void
}

const initial: iContext = {
  data: [],
  mode: 0,
  lang: strings(),
  theme: theme.dark,
  setData: (x: Task[]) => {},
  setMode: (x: number) => {},
  setLang: (x: string) => {},
  chTheme: () => {}
}

export default initial
export const Context = createContext<iContext>(initial)
export class ContextProvider extends PureComponent {
  state = {
    data: new Array<Task>(),
    mode: 0,
    lang: strings(),
    theme: theme.dark,
  }
  setData = (data: Task[]) => {
    this.setState({ data: data })
  }
  setMode = (mode: number) => {
    console.log(`new mode: ${mode}`)
    this.setState({ mode: mode })
  }
  setLang = (lang: string) => {
    console.log(`new lang: ${lang}`)
    this.setState({ lang: strings(lang) })
  }
  chTheme = () => {
    switch (this.state.theme.name) {
      case 'dark': this.setState({ theme: theme.light }); break
      default:     this.setState({ theme: theme.dark }); break
    }
    console.log(`switched to ${this.state.theme.name} theme`)
  }
  render() {
    return (
      <Context.Provider value={{
        data: this.state.data,
        mode: this.state.mode,
        lang: this.state.lang,
        theme: this.state.theme,
        setData: this.setData,
        setMode: this.setMode,
        setLang: this.setLang,
        chTheme: this.chTheme,
      }}>
        {this.props.children}
      </Context.Provider>
    )
  }
}
