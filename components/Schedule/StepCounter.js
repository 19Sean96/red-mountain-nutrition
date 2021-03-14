import { CartContext } from "../context";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
export default function StepCounter({ watchCustInputs, validated }) {
	const stepInfo = [
		{
			num: 1,
			name: "pick a package",
		},
		{
			num: 2,
			name: "schedule",
		},
		{
			num: 3,
			name: "contact info",
		},
		{
			num: 4,
			name: "make payment",
		},
	];
	const {
		activeStep,
		handleCheckoutEnter,
		activePackage,
		activeTime,
	} = useContext(CartContext);
	return (
		<aside className="step-counter">
			<div className="step-counter__watcher">
				{stepInfo.map((step) => {
					const x = parseInt(activeStep);

					let stepType =
						step.num < x
							? "complete"
							: step.num === x
							? "active"
							: "incomplete";
					return (
						<p className={`step step--${stepType}`}>
							{step.num}. {step.name}
						</p>
					);
				})}
			</div>
			{activeStep && (
				<div className="step-counter__next">
					{activeStep == 1 && (
						<Link href="/schedule/2">
							<a>
								<span>2. Schedule</span>
							</a>
						</Link>
					)}
					{activeStep == 2 && (
						<Link href={activeTime ? "/schedule/3" : "#"}>
							<a
								onClick={(e) => {
									if (!activeTime) {
										alert("Please select a date & time.")
									}
								}}
							>
								<span>3. contact info</span>
							</a>
						</Link>
					)}
					{activeStep == 3 && (
						<a
							onClick={(e) => {
								console.log(watchCustInputs);
								validated
									? handleCheckoutEnter(e, watchCustInputs)
									: alert(
											"Please enter all required information"
									  );
							}}
						>
							<span>
								{stepInfo[activeStep].num +
									". " +
									stepInfo[activeStep].name}
							</span>
						</a>
					)}
				</div>
			)}
		</aside>
	);
}
