const { pool } = require('../config/db');

class User {
  // Create a new user
  static async create(username, email, hashedPassword) {
    try {
      const [result] = await pool.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Find user by email
  static async findByEmail(email) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Find user by username
  static async findByUsername(username) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM users WHERE username = ?',
        [username]
      );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Find user by ID
  static async findById(id) {
    try {
      const [rows] = await pool.query(
        'SELECT id, username, email, created_at, updated_at FROM users WHERE id = ?',
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Check if email exists
  static async emailExists(email) {
    try {
      const [rows] = await pool.query(
        'SELECT id FROM users WHERE email = ?',
        [email]
      );
      return rows.length > 0;
    } catch (error) {
      throw error;
    }
  }

  // Check if username exists
  static async usernameExists(username) {
    try {
      const [rows] = await pool.query(
        'SELECT id FROM users WHERE username = ?',
        [username]
      );
      return rows.length > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
