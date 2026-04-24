## Backend

- Use Prisma for query building instead of large strings
- Each service file should provide functions that actually make calls for for that specific purpose, and endpoints should pull whatever function it needs from different services
- For updates to the DB (uploading, deleting, changing values, etc), always check if transactions should be used if there are multiple updates. It is easy to overlook when they should all work together or none at all
