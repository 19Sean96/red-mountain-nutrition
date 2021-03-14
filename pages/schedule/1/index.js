import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { CartContext } from "../../../components/context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Interface from "../../../components/Interface";
import ScheduleInterface from "../../../components/Schedule/Interface";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function PackageOption(props) {
	const { setActivePackage, activePackage } = useContext(CartContext);
	return (
		<button
			className={`option option__${props.name} ${
				activePackage.name === props.name ? "option__active" : ""
			}`}
			onClick={() =>
				setActivePackage({
					name: props.name,
					price: props.price,
				})
			}
		>
			<div className="option--head">
				<h4 className="option--name">{props.name}</h4>
				<h5 className="option--price">${props.price / 100}</h5>
			</div>
			<div className="option--body">
				<p>includes:</p>
				<ul>
					{props.features.map((feature) => (
						<li>{feature}</li>
					))}
				</ul>
			</div>
			{activePackage.name === props.name && (
				<div className="option--selected">
					<FontAwesomeIcon icon={faCheck} />
				</div>
			)}
		</button>
	);
}

function FocusOption(props) {
	const { activeFocus } = useContext(CartContext);

	return (
		<button
			className={activeFocus[props.name] && "option__active"}
			onClick={props.handleFocus}
		>
			{props.name}
		</button>
	);
}

export default function Schedule() {
	const router = useRouter();
	const { activeFocus, setActiveFocus } = useContext(CartContext);

	useEffect(() => {}, []);

	useEffect(() => {
		let focusArr = [];

		activeFocus.diabetes && focusArr.push("diabetes");
		activeFocus.nutrition && focusArr.push("nutrition");
		activeFocus.weightLoss && focusArr.push("weightLoss");
	}, [activeFocus]);

	return (
		<>
			<Head>
				<title>Red Mountain Nutrition: Schedule Now!</title>
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
					<ScheduleInterface>
						<div className="schedule__step-1">
							<div className="schedule__step-1__focus">
								<h2 className="schedule__step-1--title">
									main issue(s) to focus on:
								</h2>
								<div className="schedule__step-1__focus--options">
									<FocusOption
										name="nutrition"
										handleFocus={(e) =>
											setActiveFocus({
												nutrition: !activeFocus.nutrition,
												diabetes: activeFocus.diabetes,
												weightLoss:
													activeFocus.weightLoss,
											})
										}
									/>
									<FocusOption
										name="diabetes"
										handleFocus={(e) =>
											setActiveFocus({
												nutrition:
													activeFocus.nutrition,
												diabetes: !activeFocus.diabetes,
												weightLoss:
													activeFocus.weightLoss,
											})
										}
									/>
									<FocusOption
										name="weightLoss"
										handleFocus={(e) =>
											setActiveFocus({
												nutrition:
													activeFocus.nutrition,
												diabetes: activeFocus.diabetes,
												weightLoss: !activeFocus.weightLoss,
											})
										}
									/>
								</div>
							</div>
							<div className="schedule__step-1__packages">
								<h2 className="schedule__step-1--title">
									choose a package that fits you:
								</h2>
								<div className="schedule__step-1__packages--options">
									<PackageOption
										name="initial"
										price={9900}
										features={["1 initial consultation"]}
									/>
									<PackageOption
										name="follow-up"
										price={7900}
										features={["1 follow up"]}
									/>
									<PackageOption
										name="jumpstart"
										price={24900}
										features={[
											"1 initial consulation",
											"1 follow up",
											"1 progress evaluation",
											"2 phone/email checkins",
										]}
									/>
									<PackageOption
										name="standard"
										price={43900}
										features={[
											"1 initial consulation",
											"2 follow up",
											"1 progress evaluation",
											"6 phone/email checkins",
										]}
									/>
									<PackageOption
										name="premium"
										price={79900}
										features={[
											"1 initial consulation",
											"3 follow up",
											"3 progress evaluation",
											"8 phone/email checkins",
										]}
									/>
								</div>
							</div>
						</div>
					</ScheduleInterface>
				</section>
			</Interface>
		</>
	);
}
