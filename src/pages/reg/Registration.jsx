import React from "react";
import { publicAPI } from "../../Services/API";
const Registration = () => {
	const [formData, setFormData] = React.useState({
		name: "",
		email: "",
		password: "",
	});
	const [submitted, setSubmitted] = React.useState(false);

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
		setSubmitted(false);
	};

	const handleSubmit = async(event) => {
        const {name,email,password} = formData

		event.preventDefault();
        try{

          const response = await  publicAPI.post("/api/register", formData)
            console.log(response)
        }catch(error){
            
  console.log("Status:", error.response?.status);
  console.log("Backend response:", error.response?.data);
}
        
            setSubmitted(true);
	};

	return (
		<main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
			<form
				className="w-full max-w-md rounded-lg bg-white px-8 pb-8 pt-6 shadow-md"
				onSubmit={handleSubmit}
			>
				<div className="mb-6">
					<h1 className="text-3xl font-bold text-slate-900">Create your account</h1>
					<p className="mt-2 text-sm text-slate-600">Register to get started with Hirelink.</p>
				</div>

				<div className="mb-4">
					<label className="mb-2 block text-sm font-bold text-slate-700" htmlFor="name">
						Name
					</label>
					<input
						className="w-full rounded border px-3 py-2 text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
						id="name"
						name="name"
						type="text"
						placeholder="Enter your name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
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
						placeholder="Create a password"
						value={formData.password}
						onChange={handleChange}
						minLength="6"
						required
					/>
				</div>

				<button
					className="w-full rounded bg-blue-600 px-4 py-2 font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
					type="submit"
				>
					Register
				</button>

				{submitted && (
					<p className="mt-4 text-center text-sm text-green-600" role="status">
						Registration details are ready to submit.
					</p>
				)}
			</form>
		</main>
	);
};

export default Registration;
