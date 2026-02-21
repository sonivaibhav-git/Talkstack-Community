import { useMutation } from "@tanstack/react-query"
import { resetForgotPassword, sendForgotPasswordOtp } from "../../api/auth.api"
import type { ForgotPasswordOtpRequest, ResetPasswordRequest } from "./auth.types"

export const useSendForgotPasswordOtp = () =>
  useMutation({
    mutationFn: (payload: ForgotPasswordOtpRequest) =>
      sendForgotPasswordOtp(payload),
  })

export const useResetForgotPassword = () =>
  useMutation({
    mutationFn: (payload: ResetPasswordRequest) =>
      resetForgotPassword(payload),
  })
