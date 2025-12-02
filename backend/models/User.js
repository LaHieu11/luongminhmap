const bcrypt = require('bcryptjs');

// In-memory user storage (in production, use a database)
const users = [];

class User {
  static getAll() {
    return users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  static getById(id) {
    const user = users.find(u => u.id === parseInt(id));
    if (!user) return null;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static getByUsername(username) {
    return users.find(u => u.username === username);
  }

  static getByEmail(email) {
    return users.find(u => u.email === email);
  }

  static async create(userData) {
    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const newId = Math.max(...users.map(u => u.id), 0) + 1;
    const newUser = {
      id: newId,
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      role: userData.role || 'user'
    };
    users.push(newUser);
    
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async updatePassword(userId, newPassword) {
    const user = users.find(u => u.id === parseInt(userId));
    if (!user) return false;
    
    user.password = await bcrypt.hash(newPassword, 10);
    return true;
  }

  // Initialize default admin user
  static async initializeDefaultAdmin() {
    if (users.length === 0 || !users.find(u => u.username === 'admin')) {
      const hashed = await bcrypt.hash('admin123', 10);
      users.push({
        id: 1,
        username: 'admin',
        email: 'admin@luongminhmap.com',
        password: hashed,
        role: 'admin'
      });
      console.log('Default admin user created: username=admin, password=admin123');
    }
  }
}

// Initialize default admin on module load
User.initializeDefaultAdmin().catch(console.error);

module.exports = User;

