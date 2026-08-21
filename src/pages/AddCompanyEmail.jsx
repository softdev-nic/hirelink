import React, { useState } from "react";
import { publicAPI } from "../Services/API";
function AddCompanyEmail() {
	const [companyName, setCompanyName] = useState("");
	const [email, setEmail] = useState("");

	const handleSubmit = async(e) => {
		e.preventDefault();
      try{
        const response = await publicAPI.post("/api/add-company",{companyName,email})
      }catch(error){
        console.log({error:error.message})
      }
		
	};

	return (
		<main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-8">
			<div className="mx-auto max-w-md">
				<div className="rounded-lg bg-white p-8 shadow-md">
					<h1 className="text-2xl font-bold text-slate-900">Add Company Email</h1>

					<form onSubmit={handleSubmit} className="mt-6">
						<div className="mb-4">
							<label htmlFor="companyName" className="block text-sm font-semibold text-slate-900">
								Company Name
							</label>
							<input
								type="text"
								id="companyName"
								value={companyName}
								onChange={(e) => setCompanyName(e.target.value)}
								className="mt-2 w-full rounded border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
								placeholder="Enter company name"
								required
							/>
						</div>

						<div className="mb-6">
							<label htmlFor="email" className="block text-sm font-semibold text-slate-900">
								Email
							</label>
							<input
								type="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="mt-2 w-full rounded border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
								placeholder="Enter email address"
								required
							/>
						</div>

						<button
							type="submit"
							className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
						>
							Submit
						</button>
					</form>
				</div>
			</div>
		</main>
	);
}

export default AddCompanyEmail;
