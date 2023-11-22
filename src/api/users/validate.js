export function validateUsersPOST(req) {
  const { username, password, status, balance } = req.body;

  if (!username || !password || !status || !balance) {
    throw new Error('Missing user data ');
  }
}
