import React from "react";
import { publicAPI } from "../../Services/API";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = React.useState({
		email: "",
		password: "",
	});
	const [message, setMessage] = React.useState("");
	const Navigate = useNavigate()

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
		setMessage("");
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await publicAPI.post("/api/login", formData);
			setMessage("Login successful.");
            localStorage.setItem("auth-token", response.data.token)
            localStorage.setItem("loggedIn",true)
			navigate("/home", { replace: true });

		} catch (error) {
			setMessage(error.response?.data?.message || "Unable to log in.");
		}
	};
    
	return (
		<main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
			<form
				className="w-full max-w-md rounded-lg bg-white px-8 pb-8 pt-6 shadow-md"
				onSubmit={handleSubmit}
			>
				<div className="mb-6">
					<h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
					<p className="mt-2 text-sm text-slate-600">Log in to continue to Hirelink.</p>
				</div>

				<div className="mb-4">
					<label className="mb-2 block text-sm font-bold text-slate-700" htmlFor="email">
						Email
					</label>
					<input
						className="w-full rounded border px-3 py-2 text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
						id="email"
						name="email"
						type="email"
						placeholder="you@example.com"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="mb-6">
					<label className="mb-2 block text-sm font-bold text-slate-700" htmlFor="password">
						Password
					</label>
					<input
						className="w-full rounded border px-3 py-2 text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
						id="password"
						name="password"
						type="password"
						placeholder="Enter your password"
						value={formData.password}
						onChange={handleChange}
						minLength="6"
						required
					/>
				</div>
                <div className="text-blue-500">
                    <Link to="/forgot-password"><p>Forget password?</p></Link>
                </div>

				<button
					className="w-full rounded bg-blue-600 px-4 py-2 font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
					type="submit"
				>
					Log in
				</button>
                     <div className=" text-bold ">
                  <p>
                    Do not have account 
                    <Link to="/register" className="text-blue-500 p-2">Sign up</Link>
                  </p>

                </div>
				{message && (
					<p className="mt-4 text-center text-sm text-slate-600" role="status">
						{message}
					</p>
				)}
			</form>
		</main>
	);
};

export default Login;
