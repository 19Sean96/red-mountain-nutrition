import Link from 'next/link'

const LifestylePackages = (props) => {
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
				<div className="package package__jumpstart">
					<h3 className="package--title">jumpstart</h3>
					<p className="package--duration">4 weeks</p>
					<p className="package--price">$249</p>
                    <hr/>
					<ul className="package--list">
						<li>1 initial consultation</li>
						<li>1 follow up meeting</li>
						<li>1 progress evaluation</li>
						<li>2 Phone/Email Checkins</li>
					</ul>
					<Link href={{
						pathname: "/schedule",
						query: {
							type: "jumpstart",
							focus: null
						}
					}}
						as="/schedule"
                        >
						<a className="package--submit">
							Sign Up
						</a>
					</Link>
				</div>
				<div className="package package__standard">
					<h3 className="package--title">standard</h3>
					<p className="package--duration">12 weeks</p>
					<p className="package--price">$439</p>
                    <hr/>
					<ul className="package--list">
						<li>1 initial consultation</li>
						<li>2 follow up meetings</li>
						<li>1 progress evaluation</li>
						<li>6 Phone/Email Checkins</li>
					</ul>
					<Link href={{
						pathname: "/schedule",
						query: {
							type: "standard",
							focus: null
						}
					}}
						as="/schedule"
                        >
						<a className="package--submit">
							Sign Up
						</a>
					</Link>
				</div>
				<div className="package package__premium">
					<h3 className="package--title">premium</h3>
					<p className="package--duration">24 weeks</p>
					<p className="package--price">$799</p>
                    <hr/>
					<ul className="package--list">
						<li>1 initial consultation</li>
						<li>3 follow up meetings</li>
						<li>2 progress evaluations</li>
						<li>8 Phone/Email Checkins</li>
					</ul>
					<Link href={{
						pathname: "/schedule",
						query: {
							type: "premium",
							focus: null
						}
					}}
						as="/schedule"
                        >
						<a className="package--submit">
							Sign Up
						</a>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default LifestylePackages;
