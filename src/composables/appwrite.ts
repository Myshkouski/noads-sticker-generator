import { fetchPost } from "~/api/appwrite"

export const usePost = (documentId: MaybeRef<string>) => {
  const { database } = useAppwrite()

  return useAsyncData(async () => {
    return await fetchPost(database, unref(documentId))
  })
}
