import React from "react";
import { useParams } from "react-router-dom";
import { publicAPI } from "../../Services/API";

function ResetPassword() {
	const { token } = useParams();
	const [password, setPassword] = React.useState("");
	const [message, setMessage] = React.useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			await publicAPI.post(`/api/reset-password/${token}`, { password });
			setMessage("Password reset successfully.");
		} catch (error) {
			setMessage(error.response?.data?.message || "Unable to reset password.");
		}
	};

	return (
		<main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
			<form
				className="w-full max-w-md rounded-lg bg-white px-8 pb-8 pt-6 shadow-md"
				onSubmit={handleSubmit}
			>
				<h1 className="mb-2 text-3xl font-bold text-slate-900">Reset password</h1>
				<p className="mb-6 text-sm text-slate-600">Enter a new password for your account.</p>

				<label className="mb-2 block text-sm font-bold text-slate-700" htmlFor="password">
					Password
				</label>
				<input
					className="mb-6 w-full rounded border px-3 py-2 text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
					id="password"
					name="password"
					type="password"
					placeholder="Enter your new password"
					value={password}
					onChange={(event) => {
						setPassword(event.target.value);
						setMessage("");
					}}
					minLength="6"
					required
				/>

				<button
					className="w-full rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
					type="submit"
				>
					Reset password
				</button>

				{message && (
					<p className="mt-4 text-center text-sm text-slate-600" role="status">
						{message}
					</p>
				)}
			</form>
		</main>
	);
}

export default ResetPassword;
