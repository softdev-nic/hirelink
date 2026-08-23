import React from "react";
import { publicAPI } from "../Services/API";
function Mail({ mail, showDelete = false, onDelete,template }) {
	const mailId = mail.id || mail._id || mail.email;
	const [newStatus, setStatus] = React.useState(mail.status || "Approved");
    const templateData = template

 const toggleStatus = async(req,res)=>{
		try{
 
			await publicAPI.post("/api/change-mail-status",{mailId,newStatus})
			
		}catch(error){
			console.log({error:error.message})
			console.log(newStatus)
		}
	}
	const sendEmail = ()=>{
         const mailto = `mailto:${mail.email}?subject=${encodeURIComponent(templateData.template.template.subject)}&body=${encodeURIComponent(template.template.template.text)}`;

    window.location.href = mailto;
	}
	return (
		<article className="px-6 py-5 transition hover:bg-slate-50">
			<div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
				<div>
					<p className="font-semibold text-slate-900">
						{mail.sender || mail.from || mail.email || "Unknown sender"}
					</p>
					<h3 className="mt-1 font-medium text-slate-800">
						{mail.subject || "No subject"}
					</h3>
				</div>
				<time className="text-sm text-slate-500">
					{mail.date || mail.createdAt || ""}
				</time>
			</div>

			<label className="mt-4 flex items-center gap-3 text-sm font-semibold text-slate-700">
				<span>Status</span>
				<select
					className="rounded border border-slate-300 bg-white px-3 py-2 font-medium text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
					value={newStatus}
					onChange={(event) => setStatus(event.target.value)}
				>
					<option value="approved">Approved</option>
					<option value="rejected">Rejected</option>
				</select>
				<button
					className="rounded bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
					type="button"
					onClick={toggleStatus}
				>
					Set
				</button>
			</label>
			 <div>
				<button onClick={sendEmail}>Apply</button>
			 </div>
			{showDelete && (
				<button
					className="mt-4 rounded bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
					type="button"
					onClick={() => onDelete?.(mailId)}
				>
					Delete
				</button>
			)}
		</article>
	);
}

export default Mail;