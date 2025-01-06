import express from "express";
import pkg from "pg";
const { Pool } = pkg;
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
const port = 3001;
const generateToken = (user) => {
  // User information to include in the token payload
  const payload = {
    userId: user.id, // Include the user's ID
    username: user.username, // Optionally include username or other info
  };

  // Secret key for signing the token (keep this safe and secure)
  const secretKey = "testKey";

  // Options for token, e.g., expiration time
  const options = {
    expiresIn: "1h", // Token will expire in 1 hour
  };

  // Generate the token,.
  const token = jwt.sign(payload, secretKey, options);
  return token; // Return the generated token
};
function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  console.log("hi");
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  jwt.verify(token, "testKey", (err, user) => {
    // Replace 'your-secret-key' with your actual secret key
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user; // Make user information available in the request object
    next(); // Proceed to the next middleware or route handler
  });
}
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "budget",
  password: "postgres",
  port: 5432,
});

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username) {
      return res.status(401).json({ message: "Missing username" });
    }
    if (!password) {
      return res.status(401).json({ message: "Missing password" });
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const query = `
      INSERT INTO users (name, password) 
      VALUES ($1, $2) 
      RETURNING id;
    `;
    const values = [username, passwordHash];
    const userExists = await pool.query("SELECT * FROM users WHERE name = $1", [
      username,
    ]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "Username already taken!" });
    }
    const result = await pool.query(query, values);
    console.log("User created with ID:", result.rows[0].id);

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error registering user:", error);
    if (error.code === "23505") {
      // Unique constraint violation (duplicate username)
      res.status(400).json({ error: "Username already exists" });
    } else {
      res.status(500).json({ error: "Failed to register user" });
    }
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username) {
      return res.status(401).json({ message: "Missing username" });
    }
    if (!password) {
      return res.status(401).json({ message: "Missing password" });
    }

    const query = 'SELECT * FROM "users" WHERE name = $1';
    const values = [username];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];
    const hashedPassword = user.password;

    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (isMatch) {
      const token = generateToken(user);
      res
        .status(200)
        .json({ message: "Login successful", userId: user.id, token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/chart", async (req, res) => {
  const { startDate, endDate } = req.query;
  console.log(startDate);
  try {
    const query = `
  SELECT * FROM finances WHERE "date" >= $1 AND "date" <= $2`;
    const values = [endDate, startDate];
    const result = await pool.query(query, values);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(401).json({ message: "Error retrieving data..." });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
