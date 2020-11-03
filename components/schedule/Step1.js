import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../components/context";

const Step1 = (props) => {
	const router = useRouter();
	const { cart, setCart, activeFocus, setActiveFocus, activePackage, setActivePackage } = useContext(
		CartContext
	);

	useEffect(() => {
		setCart({
			focus: router.query.focus,
			type: router.query.type,
		})
	}, [])

	useEffect(() => {
		let focusArr = []

		activeFocus.diabetes && focusArr.push('diabetes')
		activeFocus.nutrition && focusArr.push('nutrition')
		activeFocus.weightLoss && focusArr.push('weightLoss')
		setCart({
			focus: focusArr,
			type: router.query.type,
		});
	}, [activeFocus]);

	return (
		<>
			<div className="schedule--content__focus">
				<h2 className="schedule--content--title">
					main issue(s) to focus on:
				</h2>
				<div className="schedule--content__focus--options">
					<button
						className={`option--nutrition ${
							activeFocus.nutrition && "option__active"
						}`}
						onClick={(e) =>
							setActiveFocus({
								nutrition: !activeFocus.nutrition,
								diabetes: activeFocus.diabetes,
								weightLoss: activeFocus.weightLoss,
							})
						}
					>
						nutrition
					</button>
					<button
						className={`option--diabetes ${
							activeFocus.diabetes && "option__active"
						}`}
						onClick={(e) =>
							setActiveFocus({
								nutrition: activeFocus.nutrition,
								diabetes: !activeFocus.diabetes,
								weightLoss: activeFocus.weightLoss,
							})
						}
					>
						diabetes
					</button>
					<button
						className={`option--weight-loss ${
							activeFocus.weightLoss && "option__active"
						}`}
						onClick={(e) =>
							setActiveFocus({
								nutrition: activeFocus.nutrition,
								diabetes: activeFocus.diabetes,
								weightLoss: !activeFocus.weightLoss,
							})
						}
					>
						weight loss
					</button>
				</div>
			</div>
			<div className="schedule--content__packages">
				<h2 className="schedule--content--title">
					choose a package that fits you:
				</h2>
				<div className="schedule--content__packages--options">
					<button className={`option option__initial ${activePackage === "initial" ? 'option__active' : ''}`} onClick={() => setActivePackage('initial')}>
						<div className="option--head">
							<h4 className="option--name">initial</h4>
							<h5 className="option--price">$99</h5>
						</div>
						<div className="option--body">
							<p>includes:</p>
							<ul>
								<li>1 initial consultation</li>
							</ul>
						</div>
					</button>
					<button className={`option option__follow-up ${activePackage === "follow-up" ? 'option__active' : ''}`} onClick={() => setActivePackage('follow-up')}>
						<div className="option--head">
							<h4 className="option--name">follow up</h4>
							<h5 className="option--price">$79</h5>
						</div>
						<div className="option--body">
							<p>includes:</p>
							<ul>
								<li>1 follow up</li>
							</ul>
						</div>
					</button>
					<button className={`option option__jumpstart ${activePackage === "jumpstart" ? 'option__active' : ''}`} onClick={() => setActivePackage('jumpstart')}>
						<div className="option--head">
							<h4 className="option--name">jumpstart</h4>
							<h5 className="option--price">$249</h5>
						</div>
						<div className="option--body">
							<p>includes:</p>
							<ul>
								<li>1 initial consultation</li>
								<li>1 follow up</li>
								<li>1 progress evaluation</li>
								<li>2 phone/email checkins</li>
							</ul>
						</div>
					</button>
					<button className={`option option__standard ${activePackage === "standard" ? 'option__active' : ''}`} onClick={() => setActivePackage('standard')}>
						<div className="option--head">
							<h4 className="option--name">standard</h4>
							<h5 className="option--price">$439</h5>
						</div>
						<div className="option--body">
							<p>includes:</p>
							<ul>
								<li>1 initial consultation</li>
								<li>2 follow ups</li>
								<li>1 progress evaluation</li>
								<li>6 phone/email checkins</li>
							</ul>
						</div>
					</button>
					<button className={`option option__premium ${activePackage === "premium" ? 'option__active' : ''}`} onClick={() => setActivePackage('premium')}>
						<div className="option--head">
							<h4 className="option--name">premium</h4>
							<h5 className="option--price">$799</h5>
						</div>
						<div className="option--body">
							<p>includes:</p>
							<ul>
								<li>1 initial consultation</li>
								<li>3 follow up</li>
								<li>3 progress evaluation</li>
								<li>8 phone/email checkins</li>
							</ul>
						</div>
					</button>
				</div>
			</div>
			<a className="schedule--content__confirm" onClick={e => props.setStep(2)}>
				confirm & schedule appointment
			</a>
		</>
	);
};

export default Step1;
