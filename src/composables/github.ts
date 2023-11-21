import { fetchRepo, fetchUser } from "~/api/github"

export const useGithubRepo = (repo: Ref<Nullable<string>>) => {
  const state = useAsyncState(async () => {
    const repoValue = unref(repo)
    if (!repoValue) return null
    const response = await fetchRepo(repoValue)
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
    if (!loginValue) return null
    const response = await fetchUser(loginValue)
    return response
  }, null)

  watch(login, async () => {
    await state.execute()
  })

  return state
}
