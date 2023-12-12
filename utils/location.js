import { GOOGLE_API_KEY } from "@env";
import axios from "axios";

export const getMapPreview = (location) => {
  const { latitude, longitude } = location;
  return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
};

// It doesn't work, it's missing geocoding api permission
export const getAddress = async (location) => {
  const { latitude, longitude } = location;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
    );

    return response.data.results[1].formatted_address; //response.json().results[0].formatted_address;
  } catch (error) {
    throw new Error("Failed to fetch address");
  }
};
