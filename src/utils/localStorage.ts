export const addObjectToArrayInLocalStorage = (key: string, newItem: any) => {
  const current = JSON.parse(localStorage.getItem(key) || '[]')
  current.push(newItem)
  localStorage.setItem(key, JSON.stringify(current))
}
