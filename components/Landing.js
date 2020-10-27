import LandingForm from './LandingForm'

const Landing = () => {
	return (
		<section className="landing">
			<div className="landing--inner">
				<h1 className="landing--title">red mountain nutrition</h1>
				<h2 className="landing--subtitle">
					a flexible approach to a healthy lifestyle
				</h2>
				<p className="landing--roles">
					nutrition consultation, diabetes education & weight loss programs
				</p>
				<LandingForm />
			</div>
		</section>
	);
};

export default Landing;
