
import jwt from "jsonwebtoken";

function verifyAccess(req, res, next) {
  const header = req.headers.authorization;

  /* check for Bearer token in the Authorization header */
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied — no token" });
  }

  const rawToken = header.split(" ")[1];

  try {
    const payload = jwt.verify(rawToken, process.env.JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (_) {
    return res.status(401).json({ message: "Token expired or invalid" });
  }
}

export default verifyAccess;
