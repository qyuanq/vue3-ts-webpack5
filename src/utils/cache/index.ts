class LocalCache {
  setCache(key: string, value: any) {
    //判断类型
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  getCache(key: string) {
    // obj => string => obj
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }

  clearCache() {
    window.localStorage.clear()
  }

  hasCache(key: string): boolean {
    return Object.prototype.hasOwnProperty.call(window.localStorage, key)
  }
}

export default new LocalCache()
