import type { H3Event } from "h3"

export default async function (event: H3Event) {
  const session = await auth.api.getSession({
    headers: event.headers,
  })
  if (!session?.session) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" })
  }
  return session
}
