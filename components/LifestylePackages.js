import Link from "next/link";
import { useEffect, useState } from "react";

const LifestylePackages = (props) => {
	const packages = [
		{
			name: "jumpstart",
			duration: "4 weeks",
			price: 24900,
			features: [
				"1 initial consulation",
				"1 follow up",
				"1 progress evaluation",
				"2 phone/email checkins",
			],
		},
		{
			name: "standard",
			duration: "12 weeks",
			price: 43900,
			features: [
				"1 initial consulation",
				"2 follow up",
				"1 progress evaluation",
				"6 phone/email checkins",
			],
		},
		{
			name: "premium",
			duration: "24 weeks",
			price: 79900,
			features: [
				"1 initial consulation",
				"3 follow up",
				"3 progress evaluation",
				"8 phone/email checkins",
			],
		},
	];

	const [isMobile, setIsMobile] = useState();
	const [activeType, setActiveType] = useState(0);
	useEffect(() => {
		function handleResize() {
			if (window.innerWidth < 700) {

				!isMobile && setIsMobile(true);
			} else {
				isMobile && setIsMobile(false);
			}
		}

		window.addEventListener("resize", handleResize);

		return (_) => window.removeEventListener("resize", handleResize);
	});

	return (
		<section className="packages">
			<h1 className="packages--title">
				let's get you on the right track with one of our lifestyle
				packages
			</h1>
			<h2 className="packages--subtitle">
				<p>
					Red Mountain Nutrition Provides Lifestyle Packages In Order
					To Have Ongoing Guidance While Making Changes To Your Habits
					And Lifestyle.
				</p>
				<p>
					This Help You Stay On Track And Provide Support During Those
					Difficult Situations.
				</p>
			</h2>
			<div className="packages--options">
				{isMobile ? (
					<>
						<div className="package--types">
							<button
								className={`package--types__jumpstart ${activeType === 0 ? 'active__jumpstart': 0}`}
								onClick={(e) =>
									setActiveType(() => {
										return 0;
									})
								}
							>
								jumpstart
							</button>
							<button
								className={`package--types__standard ${activeType === 1 ? 'active__standard': ''}`}
								onClick={(e) =>
									setActiveType(() => {
										return 1;
									})
								}
							>
								standard
							</button>
							<button
								className={`package--types__premium ${activeType === 2 ? 'active__premium': ''}`}
								onClick={(e) =>
									setActiveType(() => {
										return 2;
									})
								}
							>
								premium
							</button>
						</div>
						<div
							className={`package package__${packages[activeType].name}`}
						>
							{/* <div className="package--types">
								<button
									className="package--types__jumpstart"
									onClick={(e) =>
										setActiveType(() => {
											console.log("jumpstart");
											return 0;
										})
									}
								>
									jumpstart
								</button>
								<button
									className="package--types__standard"
									onClick={(e) =>
										setActiveType(() => {
											console.log("standard");
											return 1;
										})
									}
								>
									standard
								</button>
								<button
									className="package--types__premium"
									onClick={(e) =>
										setActiveType(() => {
											console.log("premium");
											return 2;
										})
									}
								>
									premium
								</button>
							</div> */}
							<h3 className="package--title">
								{packages[activeType].name}
							</h3>
							<p className="package--duration">
								{packages[activeType].duration}
							</p>
							<p className="package--price">
								${packages[activeType].price / 100}
							</p>
							<hr />
							<ul className="package--list">
								{packages[activeType].features.map(
									(feature) => (
										<li>{feature}</li>
									)
								)}
							</ul>
							<Link
								href={{
									pathname: "schedule/1",
									query: {
										type: packages[activeType].name,
										focus: null,
									},
								}}
								as="schedule/1"
							>
								<a className="package--submit">Sign Up</a>
							</Link>
						</div>
					</>
				) : (
					packages.map((pack) => (
						<div className={`package package__${pack.name}`}>
							<h3 className="package--title">{pack.name}</h3>
							<p className="package--duration">{pack.duration}</p>
							<p className="package--price">
								${pack.price / 100}
							</p>
							<hr />
							<ul className="package--list">
								{pack.features.map((feature) => (
									<li>{feature}</li>
								))}
							</ul>
							<Link
								href={{
									pathname: "schedule/1",
									query: {
										type: pack.name,
										focus: null,
									},
								}}
								as="schedule/1"
							>
								<a className="package--submit">Sign Up</a>
							</Link>
						</div>
					))
				)}
			</div>
		</section>
	);
};

export default LifestylePackages;
