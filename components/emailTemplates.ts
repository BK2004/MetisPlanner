export const emailTemplates = {
    verification,
    reset
}

function verification({ verificationUrl }: { verificationUrl: string }) {
    return '<div style="margin: 0 auto; width: 34vw; padding: 0 2vw; font-family: Arial, Helvetica, sans-serif; font-size: 24px;"> \
                <p style="text-align: center; line-height: 1.5em;"><strong>Hello!</strong><br /> \
                    You just signed up for a <a href="MetisPlanner.me" style="text-decoration:none;">MetisPlanner</a> account. Please click the link below to finish your account registration.<br /> \
                </p> \
                <a href="' + verificationUrl + '" style="margin-top: 4.5em; text-decoration: none; color: white; background-color: #0D46FF; text-align: center; padding: 0.5rem; border-radius: 1rem; font-size: 2rem; margin-top: 2.5em; display: block; text-align: center;">VERIFY ACCOUNT</a> \
                <p style="text-align: center; color: #888; font-size:0.7em;">If you did not request this email, you can ignore it.</p> \
            </div>'
}
function reset({ resetUrl }: { resetUrl: string }) {
    return '<div style="margin: 0 auto; width: 34vw; padding: 0 2vw; font-family: Arial, Helvetica, sans-serif; font-size: 24px;"> \
                <p style="text-align: center; line-height: 1.5em;"><strong>Hello!</strong><br /> \
                    You just requested to reset the password to your <a href="MetisPlanner.me" style="text-decoration:none;">MetisPlanner</a> account. Please click the link below to reset your password.<br /> \
                </p> \
                <a href="' + resetUrl + '" style="margin-top: 4.5em; text-decoration: none; color: white; background-color: #0D46FF; text-align: center; padding: 0.5rem; border-radius: 1rem; font-size: 2rem; margin-top: 2.5em; display: block; text-align: center;">RESET PASSWORD</a> \
                <p style="text-align: center; color: #888; font-size:0.7em;">If you did not request this email, you can ignore it.</p> \
            </div>'
}
