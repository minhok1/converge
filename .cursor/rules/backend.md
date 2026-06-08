---
description: Behavioral guidelines for backend code. Apply when writing, reviewing, or refactoring API routes, service files, database queries, or any server-side logic.
applyTo: "api/**"
---

## Querying

- Use Prisma for query building instead of large strings
- Ideally, each service file should provide functions that actually make calls for for that specific purpose, and endpoints should pull whatever function it needs from different services
- If different services require same shared logic, extract it as a pure function into the utils files
- For updates to the DB (uploading, deleting, changing values, etc), always check if transactions should be used if there are multiple updates. It is easy to overlook when they should all work together or none at all

## Response formatting

- Always return correct response, including the correct status code that should be of consistent format across all endpoints
