# 1. Create a GitHub OAuth App

1. Go to GitHub Developer Settings.
2. Click OAuth Apps → New OAuth App.
3. Fill in:
   - Application name: e.g. My Express OAuth App
   - Homepage URL: http://localhost:3000
   - Authorization callback URL: http://localhost:3000/auth/github/callback
4. Click Register application.

# 2. Get credentials

1. On the app page, copy the Client ID.
2. Click Generate a new client secret and copy the Client Secret (shown only once).

# 3. Configure environment variables

Create a .env file in the project root (/home/mohamedaymn/playground/work/sessions/19/.env):

```env
DB_USER=your_mongo_user
DB_PASSWORD=your_mongo_password
JWT_SECRET=your_random_jwt_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback
GITHUB_CALLBACK_URL is optional if you use the default above.
```
