const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  console.log("Authorization Header:", authHeader);

  const token = authHeader && authHeader.split(" ")[1];

  console.log("Extracted Token:", token);

  if (!token) {
    return res.status(401).json({ message: "Access denied. Token missing." });
  }

  try {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback_secret_key"
    );

    console.log("Verified User:", verified);

    req.user = verified;
    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);

    return res.status(403).json({
      message: "Invalid or expired token sessions.",
      error: err.message,
    });
  }
};

const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access forbidden. Administrative rights required." });
  }

  next();
};

module.exports = { verifyToken, requireAdmin };