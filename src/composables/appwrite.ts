import { type Post, fetchPost, findPublishedPostsByKeyAndLocale } from "~/api/appwrite"
import { type Databases } from "appwrite"

const useAppwriteDatabaseAsyncData = <T>(fetch: (database: Databases) => Promise<T> | T) => {
  const { database } = useAppwrite()

  return useAsyncState(async () => {
    return await fetch(database)
  }, null)
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

export const usePostContent = (post: MaybeRefOrGetter<Nullable<Post>>) => computed(() => toValue(post)?.content ?? null)
