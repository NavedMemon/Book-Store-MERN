const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ✅ Function to send a welcome email
const sendWelcomeEmail = async (userEmail) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: "🎉 Welcome to Our Bookstore – Happy Reading! 📚",
        html: `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Welcome to Our Bookstore</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
                <h2 style="color: #007bff;">Welcome to Our Bookstore! 📖</h2>
                <p>Dear Book Lover,</p>
                <p>Thank you for joining our bookstore community! We're thrilled to have you on board. Whether you're a bookworm, a casual reader, or just exploring, we have something special for you.</p>
                
                <h3>🌟 What You Can Expect:</h3>
                <ul>
                    <li>📚 A wide collection of books across various genres</li>
                    <li>💰 Exclusive discounts and offers</li>
                    <li>🛒 Easy and secure checkout process</li>
                    <li>🚀 Fast delivery to your doorstep</li>
                </ul>

                <p>We hope you have an amazing experience with us. If you have any questions, feel free to reach out!</p>

                <p style="font-weight: bold;">Happy Reading! 📖</p>
                <p>Best Regards,</p>
                <p><strong>The Bookstore Team</strong></p>

                <hr>
                <p style="font-size: 12px; color: gray;">If you did not sign up for this account, please ignore this email.</p>
            </div>
        </body>
        </html>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("✅ Welcome email sent to:", userEmail);
    } catch (error) {
        console.error("❌ Error sending welcome email:", error);
    }
};

module.exports = { sendWelcomeEmail };
