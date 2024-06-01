const jwt = require("jsonwebtoken");

const authenticateSocket = (socket, next) => {
  const token = socket.handshake.headers.token;

  if (!token) {
    return next(new Error("Authentication error: Token not provided"));
  }

  jwt.verify(token, process.env.RANDOM_TOKEN_SECRET, (err, user) => {
    if (err) {
      return next(new Error("Authentication error: Invalid token"));
    }
    socket.user = user;
    next();
  });
};

module.exports = authenticateSocket;
