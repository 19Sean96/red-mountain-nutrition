import { useContext, useEffect, useState, useRef } from "react";
import Head from "next/head";
import { CartContext } from "../../../components/context";
import { useForm, Controller, ErrorMessage } from "react-hook-form";

import Interface from "../../../components/Interface";
import ScheduleInterface from "../../../components/Schedule/Interface";
import NumberFormat from "react-number-format";

const emailIsValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const phoneIsValid = (phone) => /^\(\d{3}\)\s\d{3}-\d{4}/.test(phone);
export default function Schedule() {
	const { register, watch, control } = useForm();
	const watchInputs = watch();
	const [nameValid, validateName] = useState(false)
	const [emailValid, validateEmail] = useState(false);
	const [phoneValid, validatePhone] = useState(false);
	const [fullyValidated, fullyValidate] = useState(false);

	useEffect(() => {
		console.log(watchInputs);
		validateEmail(emailIsValid(watchInputs.custEmail));
		validatePhone(phoneIsValid(watchInputs.custPhone));
		watchInputs?.custName && validateName(() => (watchInputs.custName.length > 1))
		fullyValidate(emailValid && phoneValid && nameValid);
	}, [watchInputs]);

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
					<ScheduleInterface
						watchCustInputs={watchInputs}
						validated={fullyValidated}
					>
						<div className="schedule--customer">
							<h2 className="schedule--customer--title">
								Enter Your Contact Info.
							</h2>
							<form className="schedule--customer--form">
								<div className={`schedule--customer__name input__wrapper ${nameValid ? 'valid' : watchInputs?.custName?.length > 0 ? 'invalid' : ''}`}>
									<input
										type="text"
										name="custName"
										id="custName"
										ref={register}
										placeholder="Your Name"
									/>
									<label htmlFor="custName">Name:</label>
								</div>
								<div className={`schedule--customer__email input__wrapper ${emailValid ? 'valid' : watchInputs?.custEmail?.length > 0 ? 'invalid' : ''}`}>
									<input
										type="email"
										name="custEmail"
										id="custEmail"
										ref={register}
										placeholder="example@email.com"
									/>
									<label htmlFor="custEmail">Email:</label>
								</div>

								<div className={`schedule--customer__phone input__wrapper ${phoneValid ? 'valid' : watchInputs?.custPhone?.length > 0 ? 'invalid' : ''}`}>
									<Controller
										control={control}
										name="custPhone"
										defaultValue=""
										id="custPhone"
										ref={register}
										render={({
											onChange,
											onBlur,
											value,
											name,
											id,
											className,
										}) => (
											<NumberFormat
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												format="(###) ###-####"
												placeholder="(123) 456-7890"
												mask="_"
												name={name}
												id={id}
											/>
										)}
									/>
									<label htmlFor="custPhone">Phone:</label>
								</div>
							</form>
						</div>
					</ScheduleInterface>
				</section>
			</Interface>
		</>
	);
}
