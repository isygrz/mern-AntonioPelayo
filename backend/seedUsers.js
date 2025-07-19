import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('admin123', 10),
    isAdmin: true,
  },
  {
    name: 'Guest User',
    email: 'guest@example.com',
    password: bcrypt.hashSync('guest123', 10),
    isAdmin: false,
  },
];

export default users;
