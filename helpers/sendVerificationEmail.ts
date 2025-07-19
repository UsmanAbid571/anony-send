import { resend } from "@/lib/resend";
import VerificationEmail from "@/components/emailTemplate";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(email:string,username:string,verifyCode:string): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Anonym Send | Verification Email',
            react: VerificationEmail({ username,otp:verifyCode }),
          });

       
        return { success: true, message: "Verification email sent successfully" };
    } catch (error) {
        return { success: false, message: "Failed to send verification email" };
    }
}

