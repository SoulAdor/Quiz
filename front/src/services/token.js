let token = null

export const setToken = newToken => {
  token = `bearer ${newToken}`
}

export const getToken = () => {
  return token
}