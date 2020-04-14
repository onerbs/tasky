import { en, es, fr } from './strings.json'
export default (lang: string): TT =>
lang === 'es' ? es : lang === 'fr' ? fr : en

export interface TT {
  task: {
    create: string
    update: string
    delete: string
  }
}