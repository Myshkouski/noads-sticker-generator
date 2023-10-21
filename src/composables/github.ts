import { fetchRepo, fetchUser } from "~/api/github"

type Nullable<T> = T | null | undefined

export const useGithubRepo = (repo: Ref<Nullable<string>>) => {
  const state = useAsyncState(async () => {
    const repoValue = unref(repo)
    console.debug("[useGithubRepo]", "repo:", repoValue)
    if (!repoValue) return null
    const response = await fetchRepo(repoValue)
    console.trace("[useGithubRepo]", "response:", response)
    return response
  }, null)

  watch(repo, async () => {
    await state.execute()
  })

  return state
}

export const useGithubProfile = (login: Ref<Nullable<string>>) => {
  const state = useAsyncState(async () => {
    const loginValue = unref(login)
    console.debug("login: " + loginValue)
    if (!loginValue) return null
    const response = await fetchUser(loginValue)
    console.trace("response: " + response)
    return response
  }, null)

  watch(login, async () => {
    await state.execute()
  })

  return state
}
