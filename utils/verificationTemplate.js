const verificationCode = (code) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style></style>
  </head>
  <body>
      <div class="container">
          <h1>Password Reset Verification</h1>
          <p>You recently requested to reset your password for your account. To complete the process, please enter the following 6-digit verification code:</p>
          <h2 style="letter-spacing: 5px;">
            ${code}
          </h2>
          <p>This code will expire in <b>5 minutes</b>.</p>
      </div>
  </body>
  </html>`;
};

module.exports = {
  verificationCode,
};
