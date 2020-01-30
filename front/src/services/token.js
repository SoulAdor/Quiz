let token = null

export const setToken = newToken => {
  token = `bearer ${newToken}`
}

export const getToken = () => {
  return token
}

export const getConfig = () => {
  return { headers: { Authorization: getToken() } }
}