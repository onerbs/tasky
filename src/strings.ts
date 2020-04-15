import { createContext } from 'react'
import { en,  es  ,fr  } from './strings.json'
export const strings = (lang = 'en'): TT =>
  lang === 'es' ? es
: lang === 'fr' ? fr
: en

export interface TT {
  task: {
    create: string
    update: string
    delete: string
    missing: string
  },
  day: {
    name: string[],
    abbr: string[],
    symbol: string[]
  },
  month: {
    name: string[],
    abbr: string[],
    symbol: string[]
  }
}

export const LanguageContext = createContext(strings())
