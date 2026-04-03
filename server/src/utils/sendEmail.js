import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    // For development, we'll use ethereal.email if no SMTP config is present
    let transporter;

    if (process.env.SMTP_HOST && process.env.SMTP_PORT) {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_PORT == 465,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD
            }
        });
    } else {
        // Fallback to test ethereal account
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });
    }

    const message = {
        from: `${process.env.FROM_NAME || 'Orbitle'} <${process.env.FROM_EMAIL || 'noreply@orbitle.in'}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html
    };

    const info = await transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);
    if (!process.env.SMTP_HOST) {
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
};

export default sendEmail;
