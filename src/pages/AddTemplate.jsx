import React from "react";
import { publicAPI } from "../Services/API";

function AddTemplate() {
    const [template,setTemplate] = React.useState({subject:"", text:""})
	const handleSubmit = async(event) => {
		event.preventDefault();
        try{
            
            const {subject,text}  = template
            const response = await publicAPI.post("/api/template/add",{subject,text})
        }catch(error){
            console.log(error.message)
         }
	};
	const handleInput = (event)=>{
	 setTemplate({...template, [event.target.name]: event.target.value})
   }
	return (
		<main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-8">
			<div className="mx-auto max-w-md rounded-lg bg-white p-8 shadow-md">
				<h1 className="text-2xl font-bold text-slate-900">Add Template</h1>

				<form onSubmit={handleSubmit} className="mt-6">
					<div className="mb-4">
						<label htmlFor="subject" className="block text-sm font-semibold text-slate-900">
							Subject
						</label>
						<input
							type="text"
							id="subject"
							name="subject"
							value={template.subject}
							onChange={handleInput}
							className="mt-2 w-full rounded border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
							placeholder="Enter subject"
							required
						/>
					</div>

					<div className="mb-6">
						<label htmlFor="text" className="block text-sm font-semibold text-slate-900">
							Text
						</label>
						<textarea
							id="text"
							name="text"
							value={template.text}
							onChange={handleInput}
							rows="6"
							className="mt-2 w-full rounded border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
							placeholder="Enter template text"
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
		</main>
	);
}

export default AddTemplate;

