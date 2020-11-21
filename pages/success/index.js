import { useRouter } from "next/router";

import { CartContext } from "../../components/context";
import { useEffect, useState } from "react";

export default function Success(props) {
	const router = useRouter();

	const [session, setSession] = useState();
	const [customer, setCustomer] = useState();

	const getData = async (body, uri) => {
		const res = await fetch(`/api/${uri}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
		const response = await res.json();

		return response;
	};
	const getSession = async (body) => await getData(body, "getCurrentSession");

	const getCustomer = async (body) => await getData(body, "getCustomer");

	useEffect(async () => {
		if (router.query?.session_id && !session) {
			setSession(
				await getSession({ session_id: router.query.session_id })
			);
		}
	}, [router.query]);

	useEffect(async () => {
		if (session) {
			console.log("THIS IS THE SESSION:", session.metadata.date);
			// console.log(session.metadata.date.toLocaleTimeString('en-US'));
			setCustomer(await getCustomer({ customer_id: session.customer }));
		}
	}, [session]);

	useEffect(async () => {
		if (customer && session) {
			const res = await fetch('/api/scheduleTime', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(session.metadata)
			})
			const response = await res.json()
			console.log(response);
		}
	}, [customer])

	return (
		<section className="success">
			{customer && session && (
				<>
					<h1 className="success--headline">
						Thanks for your order, {customer.name}!
					</h1>
					<p>
						We have you scheduled for your first appointment on
						{session.value}
					</p>
					<p>
						We'll be sending you an email shortly with your
						appointment comfirmation.
					</p>
					<p>
						If you have any questions in the meantime, feel free to
						email us at{" "}
						<a href="mailto:orders@example.com">
							orders@example.com
						</a>
						.
					</p>
				</>
			)}
		</section>
	);
}
