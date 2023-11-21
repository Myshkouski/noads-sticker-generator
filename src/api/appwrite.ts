import { Databases, Query, type Models } from "appwrite"
import { ensureIsArray } from "~/utils/array"

const publicDatabaseId = '653228af20b86d1c5c21'
const postsCollectionId = '65323511079d11974c4a'

export interface Post extends Models.Document {
  content: string | null
  locale: string | null
}

export const fetchPost = async (databases: Databases, postId: string) => {
  return await databases.getDocument<Post>(publicDatabaseId, postsCollectionId, postId)
}

const findPublishedPosts = async (databases: Databases, queries: string[]) => {
  const { documents: posts } = await databases.listDocuments<Post>(publicDatabaseId, postsCollectionId, queries)
  return posts
}

export const findPublishedPostsByKeyAndLocale = async (databases: Databases, key: string, locales: MayBeArray<string>) => {
  const queries = [
    Query.equal('status', 'published'),
    Query.equal('key', key),
    Query.equal('locale', locales),
  ]
  const posts = await findPublishedPosts(databases, queries)
  const sortedPosts = posts.toSorted((post, otherPost) => {
    let result = 0
    for (const locale of ensureIsArray(locales)) {
      if (locale == post.locale) result--
      if (locale == otherPost.locale) result++
      if (result) break
    }
    return result
  })
  return sortedPosts
}
