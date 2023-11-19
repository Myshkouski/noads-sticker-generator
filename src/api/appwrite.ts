import { Databases, Query, type Models } from "appwrite"

const publicDatabaseId = '653228af20b86d1c5c21'
const postsCollectionId = '65323511079d11974c4a'

export interface Post extends Models.Document {
  content: string | null
  locale: string | null
}

export const fetchPost = async (databases: Databases, postId: string) => {
  console.debug("fetchPost()", "postId:", postId)
  return await databases.getDocument<Post>(publicDatabaseId, postsCollectionId, postId)
}

const findPublishedPosts = async (databases: Databases, queries: string[]) => {
  console.debug("findPublishedPosts()", "queries:", queries)
  return await databases.listDocuments<Post>(publicDatabaseId, postsCollectionId, queries)
}

export const findPublishedPostsByKeyAndLocale = async (databases: Databases, key: string, locales: MayBeArray<string>) => {
  const queries = [
    Query.equal('status', 'published'),
    Query.equal('key', key),
    Query.equal('locale', locales),
  ]
  return await findPublishedPosts(databases, queries)
}
