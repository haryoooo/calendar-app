import React, { Fragment, useContext, useEffect } from "react";
import { CalendarContext } from "../Context/CalendarContext";
import BeatLoader from "react-spinners/BeatLoader";
import BoxComponent from "../Components/BoxComponent";
import "../Styles/main.scss";

const styles = {
  display: "flex",
  justifyContent: "center",
  textTransform: "uppercase",
};

export default function Mainpage() {
  const calendarContext = useContext(CalendarContext);

  const isLoading = calendarContext.isLoading;

  const event = calendarContext.event;
  const getEvent = calendarContext.getCalendar;

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <Fragment>
      {isLoading === true ? (
        <div className="isLoading">
          <BeatLoader size={14} color="grey" />
        </div>
      ) : (
        <Fragment>
          <div id="header_calendar" style={styles}>
            <h2>May 2022</h2>
          </div>
          <div className="calendarWrapper">
            {event?.map((val, idx) => (
              <BoxComponent
                key={idx}
                events={val.events}
                day={val?.day}
                date={val.date}
                uuid={val.uuid}
                idx={idx}
              />
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
