/**
 * Admin authentication placeholder.
 * Set ADMIN_API_KEY in .env and validate headers when admin routes are protected.
 */
function adminAuth(req, res, next) {
  next();
}

module.exports = adminAuth;
