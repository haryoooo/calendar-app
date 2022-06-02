import React, { Fragment, useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import IconPlus from "../Assets/icon-plus.png";
import IconUpdate from "../Assets/icons-update.png";
import IconDelete from "../Assets/icons-remove.png";
import { db } from "../Utils/firebase";
import { randomizeBackground } from "../Utils/RandomizeBackground";
import { ref, onValue } from "firebase/database";
import { CalendarContext } from "../Context/CalendarContext";
import {
  calendarBoxStyling,
  dateStyling,
  eventStyling,
} from "../Utils/Helpers";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    zIndex: 2,
  },
};

export default function BoxComponent({ date, events, uuid, idx, day }) {
  const [hex, setHex] = useState("#ffffff");
  const [index, setIndex] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [event, setEvent] = useState({
    invitees: "",
    name: "",
    time: "",
    bgColor: "",
  });

  const calendarContext = useContext(CalendarContext);

  const createEvent = calendarContext.createEvent;
  const updateEvent = calendarContext.updateEvent;
  const removeEvent = calendarContext.removeEvent;

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleUpdate = (indexs, isUpdates) => {
    setIndex(indexs);
    detailEvent(indexs);
    if (isUpdates !== undefined) {
      setIsUpdate(true);
      setIsOpen(true);
    }
  };

  const handleRemove = (index) => {
    confirmAlert({
      title: "Delete Event",
      message: "Are you sure you want to delete event?",
      buttons: [
        {
          label: "Yes",
          onClick: () => removeEvent(uuid, index),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const detailEvent = (indexs) => {
    onValue(ref(db, `/calendar/${uuid}/events/${indexs}`), (snapshot) => {
      const data = snapshot.val();

      setEvent((prev) => ({
        ...prev,
        invitees: data?.invitees,
        name: data?.name,
        time: data?.time,
        bgColor:
          data?.bgColor !== undefined || data?.bgColor !== null
            ? data?.bgColor
            : hex,
      }));
    });
  };

  const createEvents = (data, title) => {
    setHex(randomizeBackground);
    setEvent((prev) => ({
      ...prev,
      [title]: data,
      bgColor: hex,
    }));
  };

  const renderModal = (date) => {
    return (
      <>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <div className="modal__content">
            <div className="modal__content__header">
              <h2>{isUpdate === true ? "Update Event" : "Create Event"}</h2>
              <span onClick={closeModal}>
                <strong>X</strong>
              </span>
            </div>
            <div className="modal__content__input">
              <div className="modal__content__input">
                <header>Event Invitees</header>
                <input
                  type="text"
                  defaultValue={event.invitees}
                  onChange={(e) => createEvents(e.target.value, "invitees")}
                  placeholder={"Invitees"}
                />
              </div>
              <header>Event Name</header>
              <input
                type="text"
                defaultValue={event.name}
                onChange={(e) => createEvents(e.target.value, "name")}
                placeholder={"Event Name"}
              />
            </div>
            <div className="modal__content__input">
              <header>Event Time</header>
              <input
                type="time"
                onChange={(e) => createEvents(e.target.value, "time")}
                defaultValue={event.time}
                placeholder={"Event Time"}
              />
            </div>
            <div className="modal__content__button">
              <div
                onClick={() =>
                  isUpdate === true
                    ? updateEvent(uuid, index, event)
                    : createEvent(uuid, date, event, events)
                }
              >
                {isUpdate === true ? "Update Event" : "Create Event"}
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  };

  useEffect(() => {}, [hex, index]);

  return (
    <Fragment>
      <div style={calendarBoxStyling(idx, window.innerWidth)}>
        {window.innerWidth > 1200 && window.innerWidth < 1700 ? (
          <div className="calendarBox__days">{idx < 7 ? day : null}</div>
        ) : null}
        <div className="calendarBox__date">
          <span style={dateStyling(idx)}>{moment(date).format("D")}</span>
        </div>
        <div className="calendarBox__iconContainer">
          {(!events || events?.length === 0) && date?.startsWith("202205") ? (
            <div className="IconPlus">
              <img src={IconPlus} onClick={openModal} />
            </div>
          ) : date?.startsWith("202204") || date?.startsWith("202206") ? (
            <></>
          ) : (
            events?.map((val, i) => (
              <div
                onChange={console.log(window.innerHeight)}
                style={
                  events?.length === 0
                    ? eventStyling(0)
                    : eventStyling(1, val.bgColor, events?.length)
                }
              >
                <div className="calendarBox__event">
                  <div className="invitees">Invitees: {val.invitees}</div>
                  <div>Name: {val.name}</div>
                  <div>Time: {val.time}</div>
                </div>
                <div className="calendarBox__event__remove">
                  {(i > 0 && i < 2) || events?.length >= 3 ? null : (
                    <div>
                      <img src={IconPlus} alt="icon-plus" onClick={openModal} />
                    </div>
                  )}
                  <div>
                    <img
                      src={IconUpdate}
                      alt="icon-update"
                      onClick={() => handleUpdate(i, "isUpdate")}
                    />
                    {modalIsOpen === true && isUpdate === true
                      ? renderModal(date)
                      : null}
                  </div>
                  <div>
                    <img
                      src={IconDelete}
                      alt="icon-delete"
                      onClick={() => handleRemove(i)}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
          {modalIsOpen === true && isUpdate === false
            ? renderModal(date)
            : null}
        </div>
      </div>
    </Fragment>
  );
}
