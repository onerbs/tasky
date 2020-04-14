import { en, es, fr } from './locales.json'
export default (lang: string) => lang === 'es' ? es : lang === 'fr' ? fr : en