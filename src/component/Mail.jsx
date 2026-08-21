import React from "react";

function Mail({ mail, showDelete = false, onDelete }) {
	const mailId = mail.id || mail._id || mail.email;

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