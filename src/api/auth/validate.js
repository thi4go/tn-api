export function validateLoginPOST(req) {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new Error('Invalid credentials');
  }
}
