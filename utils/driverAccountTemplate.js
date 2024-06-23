const driverAccountCode = (email, password) => {
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
          <p>This is your credential in our platforme:</p>
          <h2 style="letter-spacing: 5px;">
            ${email}
          </h2>
          <h2 style="letter-spacing: 5px;">
            ${password}
          </h2>
      </div>
  </body>
  </html>`;
};

module.exports = {
  driverAccountCode,
};
