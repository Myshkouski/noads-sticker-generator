interface GithubUser {
  avatar_url: string
  login: string
  url: string
  html_url: string
}

export interface GithubProfile extends GithubUser {
  name: string
}

export interface GithubRepo {
  owner: GithubUser
  html_url: string
}

const createGithubRequestHeaders = () => {
  const headers: HeadersInit = { "Accept": "application/vnd.github+json" }
  return headers
}

const fetchGithub = async <T>(url: string, signal?: AbortSignal) => {
  return await $fetch<T>(url, { headers: createGithubRequestHeaders(), signal }) 
}

const createGithubUrl = (path: string) => "https://api.github.com" + path

export const createRepoUrl = (repo: string) => createGithubUrl("/repos/" + repo)
export const createUserUrl = (login: string) => createGithubUrl("/users/" + login)

export const fetchRepo = async (repo: string, signal?: AbortSignal) => await fetchGithub<GithubRepo>(createRepoUrl(repo), signal)
export const fetchUser = async (login: string, signal?: AbortSignal) => await fetchGithub<GithubProfile>(createUserUrl(login), signal)
