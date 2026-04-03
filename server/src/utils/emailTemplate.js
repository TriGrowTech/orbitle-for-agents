export const getOtpEmailTemplate = (otp, name) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Password Reset OTP</title>
</head>
<body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7f6; margin: 0; padding: 0;">
    <div style="max-w-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
        <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; letter-spacing: 1px;">Orbitle</h1>
        </div>
        <div style="padding: 40px 30px;">
            <p style="color: #333333; font-size: 16px; margin-top: 0;">Hi ${name || 'Agent'},</p>
            <p style="color: #555555; font-size: 16px; line-height: 1.6;">We received a request to reset your password. Use the OTP code below to securely verify your identity and create a new password.</p>
            
            <div style="margin: 35px 0; text-align: center;">
                <div style="display: inline-block; background-color: #f3f4f6; padding: 15px 30px; border-radius: 8px; letter-spacing: 8px; font-size: 32px; font-weight: bold; color: #1f2937; border: 2px dashed #d1d5db;">
                    ${otp}
                </div>
            </div>
            
            <p style="color: #555555; font-size: 14px; text-align: center; margin-bottom: 30px;">This code is valid for <strong>10 minutes</strong>.</p>
            
            <p style="color: #777777; font-size: 14px; border-top: 1px solid #eeeeee; padding-top: 20px;">If you didn't request a password reset, you can safely ignore this email.</p>
        </div>
        <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} Orbitle by TriGrowTech. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
