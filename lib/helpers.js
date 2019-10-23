export const generatePassword = (len = 8) => {
  return Math.random().toString(36).slice(-len)
}
