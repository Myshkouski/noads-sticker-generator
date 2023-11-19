import { fetchPost, findPublishedPostsByKeyAndLocale } from "~/api/appwrite"
import { type Databases } from "appwrite"

const useAppwriteDatabaseAsyncData = <T>(fetch: (database: Databases) => Promise<T> | T) => {
  const { database } = useAppwrite()

  return useAsyncData(async () => {
    return await fetch(database)
  })
}

export const usePost = (documentId: MaybeRef<string>) => {
  return useAppwriteDatabaseAsyncData(async database => {
    return await fetchPost(database, unref(documentId))
  })
}

export const useLocalizedPost = (key: MaybeRefOrGetter<string>, locales: MaybeRefOrGetter<MayBeArray<string>>) => {
  return useAppwriteDatabaseAsyncData(async database => {
    const { documents } = await findPublishedPostsByKeyAndLocale(database, toValue(key), toValue(locales))
    return documents.at(0)
  })
}
