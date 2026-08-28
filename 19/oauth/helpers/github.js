const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_CALLBACK_URL =
  process.env.GITHUB_CALLBACK_URL || 'http://localhost:3000/auth/github/callback';

const GITHUB_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_USER_URL = 'https://api.github.com/user';
const GITHUB_USER_EMAILS_URL = 'https://api.github.com/user/emails';

const assertGitHubConfig = () => {
  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    throw new Error('GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET must be set');
  }
};

const getAuthorizationUrl = (state) => {
  assertGitHubConfig();

  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: GITHUB_CALLBACK_URL,
    scope: 'read:user user:email',
    state
  });

  return `${GITHUB_AUTHORIZE_URL}?${params.toString()}`;
};

const exchangeCodeForToken = async (code) => {
  assertGitHubConfig();

  const response = await fetch(GITHUB_TOKEN_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: GITHUB_CALLBACK_URL
    })
  });

  const data = await response.json();

  if (!response.ok || data.error || !data.access_token) {
    throw new Error(data.error_description || data.error || 'Failed to exchange code for token');
  }

  return data.access_token;
};

const githubApiGet = async (url, accessToken) => {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${accessToken}`,
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });

  if (!response.ok) {
    throw new Error(`GitHub API request failed: ${response.status}`);
  }

  return response.json();
};

const getGitHubUser = async (accessToken) => {
  const profile = await githubApiGet(GITHUB_USER_URL, accessToken);

  let email = profile.email;

  if (!email) {
    const emails = await githubApiGet(GITHUB_USER_EMAILS_URL, accessToken);
    const primaryEmail = emails.find((entry) => entry.primary && entry.verified);
    email = primaryEmail?.email || emails.find((entry) => entry.verified)?.email || null;
  }

  return {
    githubId: profile.id,
    username: profile.login,
    email,
    avatarUrl: profile.avatar_url,
    name: profile.name
  };
};

module.exports = {
  getAuthorizationUrl,
  exchangeCodeForToken,
  getGitHubUser,
  GITHUB_CALLBACK_URL
};
