export default function (key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data))
}
