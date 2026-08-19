import React from "react";
import { publicAPI } from "../Services/API";

function Home() {
	const [mails, setMails] = React.useState([]);

	const getData = async () => {
        try{

            const response = await publicAPI.get('/api/get-companies')
            setMails(response.data)
            console.log(response)
        }catch(error)
        {
            console.log(error.message)
        }

	};

	React.useEffect(() => {
		getData();
	}, []);

	return (
		<main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-8">
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
								<article
									key={mail.id || mail._id || mail.email}
									className="px-6 py-5 transition hover:bg-slate-50"
								>
									<div className="flex flex-col justify-between gap-2 sm:flex-row">
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
									<p className="mt-2 text-sm text-slate-600">
										{mail.preview || mail.message || mail.body || "No preview available."}
									</p>
								</article>
							))}
						</div>
					)}
				</section>
			</div>
		</main>
	);
}

export default Home;
