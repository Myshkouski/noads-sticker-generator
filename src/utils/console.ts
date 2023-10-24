export const printError = (e: any) => {
  if (e instanceof ErrorEvent) {
    console.error(e.message)
    console.debug(e.error)
    return 
  }

  if (e instanceof Error) {
    console.error(e.message)
    if (e.stack) {
      console.debug(e.stack)
    }
    return
  }

  console.error(e)
}
