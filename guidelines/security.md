---
description: Security guidelines based on OWASP standards. Apply whenever touching user-facing logic, input handling, authentication, database queries, or any data that flows between client and server.
applyTo: "**"
---

## Security

- User input on the frontend should be sanitised to prevent injection attacks
- Check the application against the OWASP top 10 standards and identify areas of vulnerability
- Query should always be parametrised on the backend to prevent injection attacks
- Refrain from using console.log in the code. This may expose sensitive information
