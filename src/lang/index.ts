import { createI18n } from 'vue-i18n'
import { Locale } from 'vant'
import enUS from 'vant/es/locale/lang/en-US'
import esES from 'vant/es/locale/lang/es-ES'
import zhCN from 'vant/es/locale/lang/zh-CN'

import enLocale from './en'
import zhLocale from './zh'
import esLocale from './es'
import localCache from '@/utils/cache'
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
  //缓存是否存在
  if (localCache.hasCache('USER_LANG')) {
    return localCache.getCache('USER_LANG')
  }

  // if has not choose language
  const language = ((navigator as any).language || (navigator as any).browserLanguage).toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'en'
}
switch (getLanguage()) {
  case 'zh':
    Locale.use('zh-CN', zhCN)
    break
  case 'en':
    Locale.use('es-ES', esES)
    break
  case 'es':
    Locale.use('en-US', enUS)
    break
}
const i18n = createI18n({
  globalInjection: true,
  locale: getLanguage(),
  messages
})

export default i18n
