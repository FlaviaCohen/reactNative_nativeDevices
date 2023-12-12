import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { getPlaces } from "../utils/db";

const AllPlaces = () => {
  const [places, setPlaces] = useState([]);

  const isFocused = useIsFocused();

  const placesHandler = async () => {
    const places = await getPlaces();
    setPlaces(places);
  };

  useEffect(() => {
    if (isFocused) {
      placesHandler();
      //setPlaces((current) => [...current, params.place]);
    }
  }, [isFocused]);

  return <PlacesList places={places} />;
};

export default AllPlaces;
