import { CartContext } from "./context";
import { useContext, useEffect, useState, useRef, createRef } from "react";

export default function ScheduleModal(props) {
	const [buttonRefs, setButtonRefs] = useState([]);
    const {date, times, activeTime, setActiveTime, type} = props

    useEffect(() => {
		const timesLength = times && times.length;
		console.log(timesLength);

		if (timesLength) {
			setButtonRefs((buttonRefs) =>
				Array(timesLength)
					.fill()
					.map((_, i) => buttonRefs[i] || createRef())
			);
		}
    }, [times]);
    
	return (
		<section className="schedule--modal">
			<h3 className="schedule--modal--title">
				Available times on {date.value.toDateString()}
			</h3>
			<ul className="schedule--modal--list">
				{times.length > 0 ?
					times.map((time, i) => {
						if (time.minute === 0) {
							time.minute = "00";
						}
						if (time.hour === 0 && time.suffix === "AM") {
							time.hour = 12;
						}
						return (
							<li>
								<button
									key={i}
									className={`time__button ${
										activeTime?.time === time.time &&
										activeTime?.suffix === time.suffix
											? "active"
											: ""
									}`}
									ref={buttonRefs[i]}
									onClick={(e) => {
										console.log(
											buttonRefs[i].current.active
										);
										setActiveTime(time);
									}}
								>
									{time.hour}:{time.minute} {time.suffix}
								</button>
							</li>
						);
                    }) : (
                        <p>There are no available appointments on this day.</p>
                    )
                }
			</ul>
		</section>
	);
}
