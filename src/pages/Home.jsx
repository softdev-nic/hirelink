import React, { useEffect } from "react";
import { publicAPI } from "../Services/API";
import Mail from "../component/Mail";
import GeneralPopUp from "../component/GeneralPopUp";
import Navbar from "../component/Navbar";
import { useNavigate } from "react-router-dom";


function Home() {
	const navigate = useNavigate()
	const [mails, setMails] = React.useState([]);
	const [deleteConfirm, setDeleteConfirm] = React.useState({ show: false, mailId: null });
	const [notification, setNotification] = React.useState({ show: false, message: "", type: "" });
    const [loggedIn,setLoggedIn] = React.useState(false)
	useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn !== "true") {
        navigate("/login", { replace: true });
    }
}, []);
  
	const getData = async () => {
        try{

            const response = await publicAPI.get('/api/get-companies/approved')
            setMails(response.data)
            console.log(response)
        }catch(error)
        {
            console.log(error.message)
        }

	};

	React.useEffect(() => {
		getData();
	}, [mails]);
    const deleteMail = async(mailId)=>{
		try{

			await publicAPI.delete(`/api/delete-company-mail/${mailId}`)
			setNotification({ show: true, message: "Mail deleted successfully!", type: "success" });
			}catch(error){
             console.log(error)
			 setNotification({ show: true, message: "Failed to delete mail", type: "error" });
			}

	}
	const handleDelete = (mailId) => {
		setDeleteConfirm({ show: true, mailId });
	};

	const confirmDelete = async() => {
		const mailId = deleteConfirm.mailId;
		setDeleteConfirm({ show: false, mailId: null });
		const deleteResponse = await deleteMail(mailId);
		deleteResponse&&setMails((currentMails) =>
			currentMails.filter(
				(mail) => (mail.id || mail._id || mail.email) !== mailId,
			),
		);
		
		 
		
	};

	const cancelDelete = () => {
		setDeleteConfirm({ show: false, mailId: null });
	};

	return (
		<main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-8">
			<Navbar />
			<div className="mx-auto max-w-6xl">
				<header className="mb-8 flex items-center justify-between">
					<div>
						<p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Hirelink</p>
						<h1 className="mt-1 text-3xl font-bold text-slate-900">All mails</h1>
					</div>
					<span className="rounded-full bg-white px-3 py-1 text-sm text-slate-600 shadow-sm">
						{mails.length} mails
					</span>
				</header>

				<section className="overflow-hidden rounded-lg bg-white shadow-md">
					<div className="border-b px-6 py-4">
						<h2 className="font-semibold text-slate-900">Inbox</h2>
					</div>

					{mails.length === 0 ? (
						<div className="px-6 py-16 text-center">
							<p className="text-lg font-medium text-slate-700">No mails yet</p>
							<p className="mt-1 text-sm text-slate-500">
								Your fetched mails will appear here.
							</p>
						</div>
					) : (
						<div className="divide-y divide-slate-200">
							{mails.map((mail) => (
								<Mail
									key={mail.id || mail._id || mail.email}
									mail={mail}
									showDelete={true}
									onDelete={handleDelete}
								/>
							))}
						</div>
					)}
				</section>
			</div>

			{/* Delete Confirmation Modal */}
			{deleteConfirm.show && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div className="w-96 rounded-lg bg-white p-6 shadow-lg">
						<h2 className="text-lg font-semibold text-slate-900">Confirm Delete</h2>
						<p className="mt-2 text-slate-600">Are you sure you want to delete this mail? This action cannot be undone.</p>
						<div className="mt-6 flex gap-3">
							<button
								className="flex-1 rounded bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
								onClick={confirmDelete}
							>
								Delete
							</button>
							<button
								className="flex-1 rounded bg-slate-300 px-4 py-2 font-semibold text-slate-900 hover:bg-slate-400"
								onClick={cancelDelete}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Notification */}
			{notification.show && (
				<GeneralPopUp
					message={notification.message}
					type={notification.type}
					duration={3000}
				/>
			)}
		</main>
	);
}

export default Home;
