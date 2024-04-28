import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import * as apiClient from "../api-client";
import ManageHotelForm from "../components/ManageHotelForm";

const EditHotel = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId || ""),
    {
      // This query will only run if enabled is true.
      // That means if hotelId is not available, this query will not execute.
      enabled: !!hotelId,
    }
  );

  return <ManageHotelForm hotel={hotel} />;
};

export default EditHotel;
