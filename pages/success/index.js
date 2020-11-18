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
			console.log("THIS IS THE SESSION:", session);

			setCustomer(await getCustomer({ customer_id: session.customer }));
		}
	}, [session]);

	return (
		<section>
			<h1>Thanks for your order!</h1>
			<p>
				We appreciate your business! If you have any questions, please
				email
				<a href="mailto:orders@example.com">orders@example.com</a>.
			</p>
		</section>
	);
}
