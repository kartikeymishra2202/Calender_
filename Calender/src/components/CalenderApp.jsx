import { useEffect, useState } from "react";

const CalenderApp = () => {
  const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  //no of days in months------>
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  // get the first day of the months i.e. mon ,tue, as 1,2 etc.
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const [selectDate, setSelectDate] = useState(currentDate);
  const [showEventPopup, setEventPopup] = useState(false);

  const [event, setEvent] = useState(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    return storedEvents.map((ev) => ({
      ...ev,
      date: new Date(ev.date), // Convert stored ISO date strings back to Date objects
    }));
  });
  const [eventTime, setEventTime] = useState({ hours: "00", minutes: "00" });
  const [eventText, setEventText] = useState("");

  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      "events",
      JSON.stringify(
        event.map((ev) => ({
          ...ev,
          date: ev.date.toISOString(), // Store date as ISO string for consistency
        }))
      )
    );
  }, [event]);

  const handleDayClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    const today = new Date();
    if (clickedDate >= today || isSameDay(clickedDate, today)) {
      setSelectDate(clickedDate);
      setEventPopup(true);
      setEventText("");
      setEventTime({ hours: "00", minutes: "00" });
      setEditingEvent(null);
    }
  };

  const handleEventSubmit = () => {
    const newEvent = {
      id: editingEvent ? editingEvent.id : Date.now(),
      date: selectDate,
      time: `${eventTime.hours.padStart(2, "0")}:${eventTime.minutes.padStart(
        2,
        "0"
      )}`,
      text: eventText,
    };

    let updateEvents = [...event];
    if (editingEvent) {
      updateEvents = updateEvents.map((event) =>
        event.id === editingEvent.id ? newEvent : event
      );
    } else {
      updateEvents.push(newEvent);
    }
    updateEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    setEvent(updateEvents);
    setEventTime({ hours: "00", minutes: "00" });
    setEventText("");
    showEventPopup(false);
    setEditingEvent(null);
  };

  const handleEditingEvent = (event) => {
    setSelectDate(new Date(event.date));
    setEventTime({
      hours: event.time.split(":")[0],
      minutes: event.time.split(":")[1],
    });
    setEventText(event.text);
    setEditingEvent(event);
    setEventPopup(true);
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvent = event.filter((event) => event.id !== eventId);
    setEvent(updatedEvent);
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseInt(value, 10);

    if (name === "hours") {
      if (numericValue >= 0 && numericValue < 24) {
        setEventTime((prevTime) => ({
          ...prevTime,
          [name]: numericValue.toString().padStart(2, "0"),
        }));
      }
    } else if (name === "minutes") {
      if (numericValue >= 0 && numericValue < 60) {
        setEventTime((prevTime) => ({
          ...prevTime,
          [name]: numericValue.toString().padStart(2, "0"),
        }));
      }
    }
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDay() === date2.getDay()
    );
  };

  ///better apprach--->
  const prevMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11;
      } else {
        return prevMonth - 1;
      }
    });
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0;
      } else {
        return prevMonth + 1;
      }
    });
  };

  return (
    <div className="calender-app">
      <div className="calender">
        <h1 className="heading">Calender</h1>
        <div className="navigate-date">
          <h2 className="month">{monthOfYear[currentMonth]}</h2>
          <h2 className="year">{currentYear}</h2>
          <div className="buttons">
            <i className="bx bx-chevron-left" onClick={prevMonth}></i>
            <i className="bx bx-chevron-right" onClick={nextMonth}></i>
          </div>
        </div>
        <div className="weekdays">
          {dayOfWeek.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="days">
          {[...Array(firstDayOfMonth).keys()].map((_, index) => (
            <span key={`empty-${index}`}></span>
          ))}
          {[...Array(daysInMonth).keys()].map((day) => (
            <span
              key={day + 1}
              className={
                day + 1 === currentDate.getDate() &&
                currentMonth === currentDate.getMonth() &&
                currentYear === currentDate.getFullYear()
                  ? "current-day"
                  : ""
              }
              onClick={() => handleDayClick(day + 1)}
            >
              {day + 1}
            </span>
          ))}
        </div>
      </div>
      <div className="events">
        {showEventPopup && (
          <div className="event-popup">
            <div className="time-input">
              <div className="event-popup-time">Time</div>
              <input
                type="number"
                name="hours"
                min={0}
                max={24}
                className="hours"
                value={eventTime.hours}
                onChange={handleTimeChange}
              />
              <input
                type="number"
                name="minutes"
                min={0}
                max={59}
                className="minutes"
                value={eventTime.minutes}
                onChange={handleTimeChange}
              />
            </div>
            <textarea
              placeholder="Enter Event Text (Maximum 60 Characters)"
              value={eventText}
              onChange={(e) => {
                if (e.target.value.length <= 60) {
                  setEventText(e.target.value);
                }
              }}
            ></textarea>
            <button className="event-popup-btn" onClick={handleEventSubmit}>
              {editingEvent ? "Update Event" : "Add Event"}
            </button>
            <button
              className="close-event-popup"
              onClick={() => setEventPopup(false)}
            >
              <i className="bx bx-x"></i>
            </button>
          </div>
        )}

        {event.map((event, index) => (
          <div className="event" key={index}>
            <div className="event-date-wrapper">
              <div className="event-date">{`${
                monthOfYear[new Date(event.date).getMonth()]
              } ${new Date(event.date).getDate()} ${new Date(
                event.date
              ).getFullYear()}`}</div>
              <div className="event-time">{event.time}</div>
            </div>
            <div className="event-text">{event.text}</div>
            <div className="event-buttons">
              <i
                className="bx bxs-edit-alt"
                onClick={() => {
                  handleEditingEvent(event);
                }}
              ></i>
              <i
                className="bx bxs-message-alt-x "
                onClick={() => {
                  handleDeleteEvent(event.id);
                }}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalenderApp;