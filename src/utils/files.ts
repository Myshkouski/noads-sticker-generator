export const dataUrlToFile = (dataUrl: string, filename: string) => {
  const { type, content } = parseDataUrlToTypeAndContent(dataUrl)
  const u8arr = base64StringToByteArray(content)
  return new File([u8arr], filename, { type });
}

export const parseDataUrlToTypeAndContent = (dataUrl: string) => {
  const arr = dataUrl.split(',')
  const bstr = atob(arr[arr.length - 1])
  const mime = arr[0]?.match(/:(.*?);/)?.[1]

  return { content: bstr, type: mime }
}

export const base64StringToByteArray = (base64EncodedString: string) => {
  let n = base64EncodedString.length
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = base64EncodedString.charCodeAt(n);
  }
  return u8arr
}
