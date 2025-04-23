const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

const authenticate = (req, res, next) => {
  console.log('Request Headers:', req.headers); // Log the full headers

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log('Token Verification Error:', err); // Add this line to log the error
      return res.status(401).json({ error: "Invalid token." });
    }

    // Log the decoded token to check its structure
    console.log("Decoded Token:", decoded);

    // Ensure all required fields (id, name, email) are present
    if (!decoded || !decoded.id || !decoded.name || !decoded.email) {
      return res.status(401).json({ error: "Invalid token. Missing user details." });
    }

    // Store user details in req.user object
    req.user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
    };

    next();
  });
};

module.exports = authenticate;
