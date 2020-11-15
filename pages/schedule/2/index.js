import { useRouter } from "next/router";
import { useContext, useEffect, useState, useRef, createRef } from "react";
import Head from "next/head";
import { CartContext } from "../../../components/context";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import data from "../../../schedule-data";

import Interface from "../../../components/Interface";


export default function Schedule() {
  const router = useRouter();
  const [buttonRefs, setButtonRefs] = useState([])
  const {
    handleCheckoutEnter,
    activeTime,
    setActiveTime
  } = useContext(CartContext);
  const [date, setDate] = useState(new Date());
  const [times, setTimes] = useState([]);
  const onChange = (date) => {
    console.log(date);
    setDate(date);
  };


  useEffect(() => {
    console.log(
      "the date has been changed or the calendar has been manipulated"
    );

    console.log(date.toString());
    let month = date.getMonth();
    let day = date.getDate();
    console.log(month, day);

    let availableTimes = data.months[month].days[day];

    setTimes(() => {
      let arr = []
      availableTimes && availableTimes.times.map(time => {
        time.active = false
        arr.push(time)
      })
      return arr
    });

  }, [date]);

  useEffect(() => {
    const timesLength = times && times.length
    console.log(timesLength);

    if (timesLength) {
      setButtonRefs(buttonRefs => (
        Array(timesLength).fill().map((_, i) => buttonRefs[i] || createRef())
      ))
    }
  }, [times])

  useEffect(() => {
    if (activeTime) {
      activeTime.active = true
    }
  }, [activeTime])

  // console.log(data);
  return (
    <>
      <Head>
        <title>Red Mountain Nutrition</title>
        <link rel="stylesheet" href="https://use.typekit.net/vyg3jkt.css" />
        <link rel="icon" href="/logo.ico" />
      </Head>

      <Interface>
        <section className="schedule">
          <h1 className="schedule--title">let's get you scheduled.</h1>
          <div className="schedule--content">
            <div className="schedule--calendar">
              <h2 className="schedule--calendar--title">
                Pick a date for your initial appointment:
              </h2>
            </div>
            <div className="schedule--calendar--content">
              <div className="calendar--dates">
                <Calendar onChange={onChange} value={date} />
              </div>
              <div className="calendar--times">
                <h3 className="calendar--times--title">
                  Available times on {date.toDateString()}
                </h3>
                <ul className="calendar--times--list">
                  {times &&
                    times.map((time, i) => (
                      <li>
                        <button 
                          key={i} 
                          className={`time__button ${(activeTime.time === time.time && activeTime.suffix === time.suffix) ? 'active' : ''}`} 
                          ref={buttonRefs[i]} 
                          onClick={e => {
                          console.log(buttonRefs[i].current.active);
                          setActiveTime(time)
                        }}>
                          {time.time} {time.suffix}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <a
              className="schedule--content__confirm"
              onClick={handleCheckoutEnter}
            >
              confirm & make payment
            </a>
          </div>
        </section>
      </Interface>
    </>
  );
}
