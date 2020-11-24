import Head from "next/head";
import { useRouter } from "next/router";
import Interface from "../../../components/Interface";
import { connectToDatabase } from "../../../util/mongodb";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../../components/context";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
export default function Admin({ isConnected }) {
	const router = useRouter();
	const { user } = useContext(CartContext);
	const [value, onChange] = useState(new Date());
	const [activeLogInType, setActiveLogInType] = useState("logIn");
	const [schedule, setSchedule] = useState()
	console.log(router);

	const handleSubmit = async event => {
		event.preventDefault()
		console.log(value.getMonth());
		const body = {
			value: value,
			month: value.getMonth(),
			year: value.getFullYear(),
			day: value.getDay(),
			date: value.getDate(),
			time: value.getTime(),
			hour: value.getHours(),
			minute: value.getMinutes(),

		}

		const res = await fetch('/api/addTime', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})

		const response = await res.json()
	}

	const getCurrentSchedule = async () => {
		const body = { isOpen: false }
		const res = await fetch('/api/getTimes', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})

		const response = await res.json()
		console.log(response);
		return response
	}

	useEffect(async() => {
		!user &&
			router.push(
				{
					pathname: "/admin",
				},
				"/admin"
			);

		const response = await getCurrentSchedule()
		setSchedule(response)
	}, []);
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
				{user && (
					<>
						<h1 className="admin--title">Welcome back, {user}.</h1>
						<section className="admin--body">
							<div className="admin--schedule__existing">
								<h2>Current Schedule</h2>
							</div>
							<div className="admin--schedule__new">
								<DateTimePicker
									value={value}
									onChange={onChange}
								/>
								<button type="submit" onSubmit={handleSubmit} onClick={handleSubmit}>Enter Timeslot</button>
							</div>
						</section>
					</>
				)}
			</Interface>
		</>
	);
}

export async function getServerSideProps(context) {
	const { client } = await connectToDatabase();
	console.log(process.env);

	const isConnected = await client.isConnected(); // Returns true or false

	return {
		props: { isConnected },
	};
}
