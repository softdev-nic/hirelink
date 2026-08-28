import React, { useState } from 'react'
import { publicAPI } from '../Services/API'
import { Navigate, replace } from 'react-router-dom'

function OtpVerification() {
  const [otp, setOtp] = useState('')

  const handleOtpChange = (e) => {
    setOtp(e.target.value)
  }

  const submitOtp = async(event)=>{
    
   const response =  await publicAPI.post("/api/otp/verify",{otp})
   if(response.status==201||200){
    Navigate("/login",{replace:true})
   }
  }
  if(otp.length==6){
    submitOtp()
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12">
      <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-slate-950/40 sm:p-10">
        <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
          <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="4" y="10" width="16" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2" />
          </svg>
        </div>

        <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">Account security</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white">Verify your account</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">Enter the one-time password sent to your email address.</p>

        <form className="mt-8" onSubmit={submitOtp}>
          <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="otp">One-time password</label>
          <input
            className="h-14 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 text-center text-2xl font-semibold tracking-[0.45em] text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            id="otp"
            name="otp"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="------"
            maxLength={7}
            value={otp}
            onChange={handleOtpChange}
            aria-describedby="otp-hint"
          />
          <p className="mt-3 text-xs text-slate-500" id="otp-hint">Use the 6-digit code from your email.</p>
        </form>
      </section>
    </main>
  )
}

export default OtpVerification