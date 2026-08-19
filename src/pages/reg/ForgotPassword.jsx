import React from 'react'
import { publicAPI } from "../../Services/API";

function ForgotPassword() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = async(event) => {
    event.preventDefault();
    try{

       await  publicAPI.post("/api/forgot-password",{email})
    }catch(error)
    {
        console.log(error.message)
    }
    setSubmitted(true);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <form
        className="w-full max-w-md rounded-lg bg-white px-8 pb-8 pt-6 shadow-md"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-6 text-3xl font-bold text-slate-900">Forgot password?</h1>

        <label className="mb-2 block text-sm font-bold text-slate-700" htmlFor="email">
          Email
        </label>
        <input
          className="mb-6 w-full rounded border px-3 py-2 text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setSubmitted(false);
          }}
          required
        />

        <button
          className="w-full rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="submit"
        >
          Submit
        </button>

        {submitted && (
          <p className="mt-4 text-center text-sm text-green-600" role="status">
            Request submitted for {email}.
          </p>
        )}
      </form>
    </main>
  );
}

export default ForgotPassword;