/**
 * Session / request context placeholder (no-op until sessions are added).
 */
function sessionMiddleware(req, res, next) {
  next();
}

module.exports = sessionMiddleware;
