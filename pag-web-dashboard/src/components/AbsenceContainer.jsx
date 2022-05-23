import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

const Marker = ({ text }) => (
  <div>
    <i className="fas fa-map-marker-alt text-red-600 text-xl"></i>
  </div>
);

export default function AbsenceContainer(props) {
  const [detail, setDetail] = useState({});

  useEffect(() => {
    if (props.page === "Check In") {
      setDetail({
        time: props.detail.checkInTime,
        long: props.detail.checkInLongitude,
        lat: props.detail.checkInLatitude,
        position: props.detail.checkInPosition,
        img: props.detail.checkInImage,
      });
    } else if (props.page === "Check Out") {
      setDetail({
        time: props.detail.checkOutTime,
        long: props.detail.checkOutLongitude,
        lat: props.detail.checkOutLatitude,
        position: props.detail.checkOutPosition,
        img: props.detail.checkOutImage,
      });
    }
  }, [setDetail, props]);
  return (
    <div className="w-full lg:w-1/2 my-6 pr-0 lg:pr-2">
      <p className="text-xl pb-3 flex items-center">
        <i className="fas fa-clock text-xl mr-3"></i> {props.page} Info
      </p>
      <div className="leading-loose">
        <div className="p-3 bg-white rounded shadow-xl">
          <div className="flex">
            <div className="w-1/2">
              <div className="mb-3">
                <h3 className="font-medium m-0">{props.page} Date</h3>
                <p className="m-0 font-light text-sm">{props.detail.date}</p>
              </div>
              <div className="mb-3">
                <h3 className="font-medium m-0">{props.page} Time</h3>
                <p className="m-0 font-light text-sm">{detail.time}</p>
              </div>
              <div className="mb-3">
                <h3 className="font-medium m-0">Longitude</h3>
                <p className="m-0 font-light text-sm">{detail.long}</p>
              </div>
              <div className="mb-3">
                <h3 className="font-medium m-0">Latitude</h3>
                <p className="m-0 font-light text-sm">{detail.lat}</p>
              </div>
            </div>
            <div className="w-1/2">
              <img
                src={detail.img}
                alt="imageCheckIn"
                style={{
                  height: "245px",
                  width: "200px",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
          <div className="mb-3">
            <h3 className="font-medium m-0">Location</h3>
            <p className="m-0 font-light text-sm">{detail.position}</p>
          </div>
          <div style={{ height: "150px", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.REACT_APP_GOOGLE_API,
              }}
              defaultCenter={{ lat: -6.415952, lng: 106.88764 }}
              defaultZoom={14}
              yesIWantToUseGoogleMapApiInternals
            >
              <Marker lat={detail.lat} lng={detail.long} />
            </GoogleMapReact>
          </div>
        </div>
      </div>
    </div>
  );
}
