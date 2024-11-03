import React, { memo, useEffect, useState } from "react";
import icons from "../ultils/icons";
import GoogleMapReact from "google-map-react";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

const { FaLocationDot } = icons;

const Position = ({ icon }) => (
  <div className="flex items-center gap-1 flex-col">{icon}</div>
);
const Map = ({ address }) => {
  const [coords, setCoords] = useState(null);
  useEffect(() => {
    const getCoords = async () => {
      try {
        const results = await geocodeByAddress(address);
        const latLng = await getLatLng(results[0]);
        setCoords(latLng);
      } catch (error) {
        console.error("Error getting coordinates:", error);
      }
    };

    if (address) {
      getCoords();
    } else {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setCoords({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting current position:", error);
        }
      );
    }
  }, [address]);
  return (
    <div className="h-[300px] w-full relative">
      {address && (
        <div className="absolute top-[8px] left-[8px] z-50 bg-white shadow-md p-4 text-xs rounded-md max-w-[200px]">
          {address}
        </div>
      )}
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env?.REACT_APP_MAP_API }}
        defaultCenter={coords}
        defaultZoom={11}
        center={coords}
      >
        <Position
          lat={coords?.lat}
          lng={coords?.lng}
          icon={<FaLocationDot color="red" size={24} />}
        />
      </GoogleMapReact>
    </div>
  );
};

export default memo(Map);
