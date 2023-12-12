import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../utils/db";

const AddPlace = ({ navigation }) => {
  const createPlaceHandler = async (place) => {
    try {
      await insertPlace(place);
      navigation.navigate("AllPlaces");
    } catch (error) {}
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
