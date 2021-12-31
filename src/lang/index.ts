import { createI18n } from 'vue-i18n'
import { Locale } from 'vant'
import enUS from 'vant/es/locale/lang/en-US'
import esES from 'vant/es/locale/lang/es-ES'
import zhCN from 'vant/es/locale/lang/zh-CN'
Locale.use('en-US', enUS)
import enLocale from './en'
import zhLocale from './zh'
import esLocale from './es'

const messages = {
  en: {
    ...enLocale
    // ...enUS
  },
  zh: {
    ...zhLocale
    // ...zhCN
  },
  es: {
    ...esLocale
    // ...esES
  }
}
export function getLanguage() {
  //缓存是否有
  // if (localStorage.hasOwnProperty('pro__USER_LANG')) {
  //   return Vue.ls.get('pro__USER_LANG')
  // }

  // if has not choose language
  console.log('ts报错navigator.browserLanguage ', navigator)
  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'en'
}
const i18n = createI18n({
  globalInjection: true,
  locale: getLanguage(),
  messages
})

export default i18n
