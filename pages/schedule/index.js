import { useContext, useEffect, useState } from "react";
import Head from "next/head";


import Interface from "../../components/Interface";
import Step1 from "../../components/schedule/Step1";
import Step2 from "../../components/schedule/Step2";

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

			<Interface>
				<section className="schedule">
					<h1 className="schedule--title">
						let's get you scheduled.
					</h1>
					<div className="schedule--content">
						{ step === 1 && <Step1 setStep={setStep}/> }
						{ step === 2 && <Step2 setStep={setStep}/> }
					</div>

				</section>
			</Interface>
		</>
	);
}

