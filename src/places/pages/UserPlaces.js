import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UserPlaces = () => {
  const userId = useParams().userId;

  const [places, setPlaces] = useState(null);
  const { isLoading, clearError, sendRequest, error } = useHttpClient();

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        setPlaces(responseData.places);
      } catch (err) {}
    };
    getPlaces();
  }, [sendRequest, userId]);

  const onDeleteHandler = (deletePlaceId) => {
    setPlaces((prevState) =>
      prevState.filter((place) => place.id !== deletePlaceId)
    );
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className={"center"}>
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && places && (
        <PlaceList items={places} onDeletePlace={onDeleteHandler} />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
