import React from "react";

function GeneralPopUp({ message, duration = 3000, type = "success" }) {
	const [visible, setVisible] = React.useState(true);
	const colors = {
		success: "bg-green-600",
		error: "bg-red-600",
	};

	React.useEffect(() => {
		const timeout = setTimeout(() => setVisible(false), duration);

		return () => clearTimeout(timeout);
	}, [duration]);

	if (!visible) return null;

	return (
		<div
			className={`fixed right-5 top-5 z-50 rounded-lg px-5 py-3 text-white shadow-lg ${
				colors[type] || colors.success
			}`}
			role="alert"
		>
			{message}
		</div>
	);
}

export default GeneralPopUp;
