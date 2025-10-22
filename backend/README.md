### Post API (Prisma + Express)

**Endpoints**
- POST `/posts/create` → Create a post (requires JWT)
- GET `/posts/:id` → Get post details
- PUT `/posts/update/:id` → Update post (only owner)
- DELETE `/posts/delete/:id` → Delete post (only owner)

**Setup**
1. Create `.env` with DATABASE_URL and JWT_SECRET.
2. Run `npx prisma db push`
3. Start server: `node server.js`
4. Test with Postman (Auth header: Bearer <token>).
