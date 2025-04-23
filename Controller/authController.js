const jwt = require("jsonwebtoken");
const User = require("../Model/user");
const { sendResponse } = require("../Helpher/responseHelpher");
const {
  selectFromTable,
  updateTable,
  insertIntoTable,
} = require("../Helpher/databaseHelpher");

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

class AuthController {
  // 🔐 Register
    static async register(req, res) {
      const { name, email, password, date_joined, gender, role, phone } = req.body;
      try {
        const existingUsers = await selectFromTable("users", { email });
        if (existingUsers.length > 0) {
          return sendResponse(res, 409, "Email already in use");
        }
        const userData = { name, email, password, date_joined, gender, role, phone };
        const insertedUsers = await insertIntoTable("users", userData);
        return sendResponse(res, 201, "User registered", new User(insertedUsers).toJSON());
      } catch (error) {
        return sendResponse(res, 500, "Registration failed: " + error.message);
      }
    }

  // 🔐 Login
  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const checkuser = await selectFromTable("users", { email });
      if (checkuser.length === 0) {
        return sendResponse(res, 404, "User not found");
      }
      const userData = checkuser[0];
      if (password !== userData.password) {
        return sendResponse(res, 401, "Invalid password");
      }

      const token = jwt.sign(
        { id: userData.id, name: userData.name, email: userData.email },
        SECRET_KEY,
        { expiresIn: "3h" }
      );
      await updateTable("users", {   token }, { id: userData.id });

      const user = new User(userData);
      return sendResponse(res, 200, "✅ Login successful!", {
        user: user.toJSON(),
        token: token,
      });
    } catch (error) {
      return sendResponse(res, 500, "Login failed: " + error.message);
    }
  }

  // 🔍 Get user by ID
  static async getUser(req, res) {
    const userId = req.params.uid;

    try {
      const users = await selectFromTable("users", { id: userId });

      if (users.length === 0) {
        return sendResponse(res, 404, "User not found");
      }

      return sendResponse(res, 200, "User fetched", new User(users).toJSON());
    } catch (error) {
      return sendResponse(res, 500, "Error fetching user: " + error.message);
    }
  }

  // 🔍 Get user by token
  static async getUserByToken(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return sendResponse(res, 401, "Token not provided");
      }

      const users = await selectFromTable("users", { token });

      if (users.length === 0) {
        return sendResponse(res, 401, "Invalid token");
      }

      return sendResponse(res, 200, "User fetched by token", new User(users).toJSON());
    } catch (error) {
      return sendResponse(res, 500, "Error fetching user by token: " + error.message);
    }
  }
}

module.exports = AuthController;
