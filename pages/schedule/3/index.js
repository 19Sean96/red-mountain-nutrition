import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { CartContext } from "../../../components/context";


import Interface from "../../../components/Interface";


export default function Schedule() {
	const { handleCheckoutEnter } = useContext(CartContext)

	console.log(handleCheckoutEnter);
	const [step, setStep] = useState(1)

	return (
		<>
			<Head>
				<title>Red Mountain Nutrition</title>
				<link
					rel="stylesheet"
					href="https://use.typekit.net/vyg3jkt.css"
				/>
				<link rel="icon" href="/logo.ico" />
			</Head>

			<Interface>
				<section className="schedule">
					<h1 className="schedule--title">
						let's get you scheduled.
					</h1>

					<button role="link" onClick={handleCheckoutEnter}>Checkout</button>
				</section>
			</Interface>
		</>
	);
}

