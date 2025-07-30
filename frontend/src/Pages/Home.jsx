/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import SelectMovie from '../Components/SelectMovie.jsx'
import LastBookingDetail from '../Components/LastBookingDetail.jsx'
import TimeSchedule from "../Components/TimeSchedule.jsx";
import SelectSeats from "../Components/SelectSeats.jsx";
import "../Css/Home.css";
import BsContext from '../Context/BsContext.js';
import Modal from '../Components/Modal.jsx';





const Home = (props) => {
  const context = useContext(BsContext);
  const {
    movie,
    time,
    noOfSeat,
    handlePostBooking,
    setErrorPopup,
    setErrorMessage,
  } = context;

  const checkNegativeSeatsValidity = (seats) => {
  for (let seat in seats) {
    if (Number(seats[seat]) < 0) {
      return true;
    }
  }
  return false;
};

const checkZeroSeatsValidity = (seats) => {
  for (let seat in seats) {
    if (Number(seats[seat]) > 0) {
      return false;
    }
  }
  return true;
};
  const handleBookNow = () => {
  if (!movie) {
    setErrorPopup(true);
    setErrorMessage("Please select  a movie!");
  } else if (!time) {
    setErrorPopup(true);
    setErrorMessage("Please select a time slot!");
  } else if (
    checkNegativeSeatsValidity(noOfSeat) ||
    checkZeroSeatsValidity(noOfSeat)
  ) {
    setErrorPopup(true);
    setErrorMessage("Invalid Seats!");
  } else {
    //validation successfull
    handlePostBooking();
  }
};


  return (
    <>
      <Modal />
      <div className="container">
        <div className="selection_container">
          <div className="wrapper">
            <div className="select_movie_component">
              <SelectMovie />
            </div>
            <div className="last_booking_details_container">
          <LastBookingDetail/>
            </div>
          </div>
          <div className="time_seats_container">
            <TimeSchedule />
            <SelectSeats />
            <button
              onClick={() => {
                handleBookNow();
              }}
              className="BN-btn ">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home