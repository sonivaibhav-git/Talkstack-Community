export interface ForgotPasswordOtpRequest {
  email: string
}

export interface ResetPasswordRequest {
  email: string
  otp: string
  newPassword: string
}

export type AuthStep = "email" | "reset"
