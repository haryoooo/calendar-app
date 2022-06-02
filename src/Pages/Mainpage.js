import React, { useContext, useEffect } from "react";
import { CalendarContext } from "../Context/CalendarContext";
import BeatLoader from "react-spinners/BeatLoader";
import BoxComponent from "../Components/BoxComponent";
import "../Styles/main.scss";

export default function Mainpage() {
  const calendarContext = useContext(CalendarContext);

  const isLoading = calendarContext.isLoading;

  const event = calendarContext.event;
  const getEvent = calendarContext.getCalendar;

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <div className="calendarWrapper">
      {isLoading === true ? (
        <div className="isLoading">
          <BeatLoader size={12} color="grey" />
        </div>
      ) : (
        event?.map((val, idx) => (
          <BoxComponent
            key={idx}
            events={val.events}
            day={val?.day}
            date={val.date}
            uuid={val.uuid}
            idx={idx}
          />
        ))
      )}
    </div>
  );
}
