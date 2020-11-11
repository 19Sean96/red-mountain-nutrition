import { useContext, useEffect, useState } from "react";
import Head from "next/head";

export default function Schedule() {

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


		</>
	);
}

