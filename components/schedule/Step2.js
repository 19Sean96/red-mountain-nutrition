import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../components/context";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import data from '../../schedule-data'

const Step2 = (props) => {
	const router = useRouter();
	const { cart, setCart, activeFocus, setActiveFocus, activePackage, setActivePackage } = useContext(
		CartContext
    );
    const [date, setDate] = useState(new Date())
	const [times, setTimes] = useState(null)
    const onChange = date => {
		console.log(date);
		setDate(date)
	}

	useEffect(() => {
		console.log("the date has been changed or the calendar has been manipulated");

		console.log(date.toString());
		let month = date.getMonth()
		let day = date.getDate()
		console.log(month, day);

		let availableTimes = data.months[month].days[day]
		console.log(availableTimes);

		setTimes(availableTimes.times)
		
	}, [date])

	console.log(data);
	return (
		<>
			<div className="schedule--calendar">
				<h2 className="schedule--calendar--title">
					Pick a date for your initial appointment:
				</h2>

			</div>
			<div className="schedule--calendar--content">
				<div className="calendar--dates">
				    <Calendar 
						onChange={onChange}
						value={date}
					/>
				</div>
				<div className="calendar--times">
					<h3 className="calendar--times--title">
						Available times on {date.toDateString()}
					</h3>
					<ul className="calendar--times--list">
						{times && times.map(time => (
							<li>
								<button>{time.time} {time.suffix}</button>
							</li>
						))}
					</ul>
				</div>
			</div>
			<a className="schedule--content__confirm" onClick={e => props.setStep(3)}>
				confirm & schedule appointment
			</a>
		</>
	);
};

export default Step2;