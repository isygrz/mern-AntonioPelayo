export const logout = async (req, res) => {
  try {
    // Clear auth cookie (adjust cookie name if different in your project)
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // true in production w/ HTTPS
      path: '/',
    });
    res.status(200).json({ message: 'Logged out' });
  } catch (e) {
    res.status(500).json({ message: 'Logout failed' });
  }
};
