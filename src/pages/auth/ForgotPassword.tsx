import { useState } from "react"
import type { AuthStep } from "../../features/auth/auth.types"
import { useResetForgotPassword, useSendForgotPasswordOtp } from "../../features/auth/auth.queries"


export default function ForgotPassword() {
  const [step, setStep] = useState<AuthStep>("email")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [cooldown, setCooldown] = useState(0)

  const otpMutation = useSendForgotPasswordOtp()
  const resetMutation = useResetForgotPassword()

  const startCooldown = () => {
    setCooldown(30)
    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    otpMutation.mutate(
      { email },
      {
        onSuccess: () => {
          setStep("reset")
          startCooldown()
        },
      }
    )
  }

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp || !newPassword) return

    resetMutation.mutate({ email, otp, newPassword })
  }

  const handleResend = () => {
    if (cooldown > 0) return
    otpMutation.mutate({ email })
    startCooldown()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Forgot Password
        </h2>

        {step === "email" && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border p-3 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              type="submit"
              disabled={otpMutation.isPending}
              className="w-full bg-black text-white p-3 rounded disabled:opacity-50"
            >
              {otpMutation.isPending ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === "reset" && (
          <form onSubmit={handleReset} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full border p-3 rounded"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter new password"
              className="w-full border p-3 rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button
              type="submit"
              disabled={resetMutation.isPending}
              className="w-full bg-black text-white p-3 rounded disabled:opacity-50"
            >
              {resetMutation.isPending
                ? "Resetting..."
                : "Reset Password"}
            </button>

            <button
              type="button"
              onClick={handleResend}
              disabled={cooldown > 0}
              className="text-blue-600 text-sm disabled:opacity-50"
            >
              {cooldown > 0
                ? `Resend in ${cooldown}s`
                : "Resend OTP"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
