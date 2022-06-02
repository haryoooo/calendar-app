import React, { createContext, useState } from "react";
import { ref, onValue, set } from "firebase/database";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { db } from "../Utils/firebase";

export const CalendarContext = createContext();

const CalendarContextProvider = ({ children }) => {
  const [isLoading, setisLoading] = useState(false);
  const [event, setEvent] = useState([]);

  const getCalendar = () => {
    try {
      setisLoading(true);
      onValue(ref(db), (snapshot) => {
        setisLoading(false);
        const data = snapshot.val();

        let convertData = Object.entries(data.calendar).map(([key, value]) => ({
          uuid: key,
          ...value,
        }));

        let filterData = convertData.sort((asc, desc) =>
          asc.date?.localeCompare(desc.date)
        );

        setEvent(filterData);
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    }
  };

  const createEvent = (uid, date, value, events) => {
    try {
      if (value.invitees === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You must fill invitees first!",
        });
        return;
      }

      if (value.name === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You must fill event name first!",
        });
        return;
      }

      if (value.time === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You must fill event time first!",
        });
        return;
      }

      const index = events?.length;

      const payload = {
        invitees: value.invitees,
        name: value.name,
        time: value.time,
        bgColor: value.bgColor,
      };
      const data = {
        date: date,
        events: [payload],
      };

      if (events?.length >= 1 && events?.length < 3) {
        set(ref(db, `/calendar/${uid}/events/${index}`), payload);
      }

      if (!events || events?.length === 0) {
        set(
          ref(db, `/calendar/${uid}`),
          date === "20220501" ? { ...data, day: "sunday" } : data
        );
      }
      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    }
  };

  const detailEvent = (uuid, index) => {
    onValue(ref(db, `/calendar/${uuid}/events/${index}`), (snapshot) => {
      const data = snapshot.val();

      setEvent((prev) => ({
        ...prev,
        invitees: data?.invitees,
        name: data?.name,
        time: data?.time,
      }));
    });
  };

  const removeEvent = (uuid, index) => {
    setisLoading(true);
    try {
      let filterData = [];
      onValue(ref(db, `/calendar/${uuid}`), (snapshot) => {
        setisLoading(false);
        const data = snapshot.val()?.events;
        let filteringData = data.filter((val, i) => i !== index);

        filterData = filteringData;
      });
      set(ref(db, `/calendar/${uuid}/events`), filterData);
      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    }
  };

  const updateEvent = (uuid, index, events) => {
    console.log(events, index);
    try {
      if (events?.invitees === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You must fill invitees first!",
        });
        return;
      }

      if (events?.name === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You must fill event name first!",
        });
        return;
      }

      if (events?.time === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You must fill event time first!",
        });
        return;
      }
      set(ref(db, `/calendar/${uuid}/events/${index}`), events);
      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    }
  };

  return (
    <CalendarContext.Provider
      value={{
        event,
        setEvent,
        isLoading,
        setisLoading,
        getCalendar,
        detailEvent,
        createEvent,
        removeEvent,
        updateEvent,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarContextProvider;
