const ResetPasswordLink = (email,  resetUrl) => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Password Update Confirmation</title>
        <style>
            body {
                background-color: #f4f4f4;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.6;
                color: #333;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 30px auto;
                padding: 20px;
                background: #ffffff;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            .logo {
                max-width: 180px;
                margin-bottom: 20px;
            }
            .message {
                font-size: 20px;
                font-weight: bold;
                color: #2c3e50;
                margin-bottom: 20px;
            }
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
            .highlight {
                font-weight: bold;
                color: #e74c3c;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                margin: 20px 0;
                font-size: 16px;
                color: #ffffff;
                background-color: #3498db;
                text-decoration: none;
                border-radius: 5px;
                transition: background 0.3s;
            }
            .button:hover {
                background-color: #2980b9;
            }
            .support {
                font-size: 14px;
                color: #777;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <a href="https://studynotion-edtech-project.vercel.app">
                <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo">
            </a>
            <div class="message">Password Update Confirmation</div>
            <div class="body">
                <p>Your password has been successfully updated for the email <span class="highlight">${email}</span>.</p>
                <p>If you did not request this password change, you can reset your password immediately by clicking the button below:</p>
                <a href="${resetUrl}" class="button">Reset Password</a>
                <p>If you have any issues, please contact our support team.</p>
            </div>
            <div class="support">Need help? Reach out to us at 
                <a href="mailto:info@studynotion.com">info@studynotion.com</a>
            </div>
        </div>
    </body>
    </html>`;
};

module.exports = ResetPasswordLink;
