import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { BsBuilding, BsMap } from "react-icons/bs";

import * as apiClient from "../api-client";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {},
    }
  );

  if (!hotelData) {
    return <span>No hotels found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My hotels</h1>
        <Link
          to="/add-hotel"
          className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
        >
          Add hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelData?.map((hotel) => (
          <div className="flex flex-col gap-5 jusitfy-between border border-slate-300 rounded-lg p-8">
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-2">
                <BsMap />
                {hotel.city}, {hotel.country}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-2">
                <BsBuilding />
                {hotel.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-2">
                <BiMoney />${hotel.pricePerNight} per night
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-2">
                <BiHotel />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-2">
                <BiStar />
                {hotel.starRating} star rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
              >
                View details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
