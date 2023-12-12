import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

// If the db doesn't exist it will create it, if it does it will just open it
const db = SQLite.openDatabase("places.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        // "places" table and its columns
        `CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT NOT NULL,
            latitude REAL NOT NULL,
            longitude REAL NOT NULL
        )`,
        [],
        // Callback if success
        () => {
          resolve();
        },
        // Callback if error
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const insertPlace = (place) => {
  const { title, imageUri, address, location } = place;
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, latitude, longitude) VALUES (?,?,?,?,?)`,
        [title, imageUri, address, location.latitude, location.longitude],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};

export const getPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) =>
      tx.executeSql(
        "SELECT * FROM places",
        [],
        (_, result) => {
          let places = [];

          places = result.rows._array.map(
            (place) =>
              new Place(
                place.title,
                place.imageUri,
                place.address,
                {
                  latitude: place.latitude,
                  longitude: place.longitude,
                },
                place.id
              )
          );
          resolve(places);
        },
        (_, error) => {
          reject(error);
        }
      )
    );
  });

  return promise;
};

export const getPlace = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) =>
      tx.executeSql(
        "SELECT * FROM places WHERE id = ?",
        [id],
        (_, result) => {
          const { title, imageUri, address, latitude, longitude, id } =
            result.rows._array[0];
          const place = new Place(
            title,
            imageUri,
            address,
            {
              latitude,
              longitude,
            },
            id
          );
          resolve(place);
        },
        (_, error) => {
          reject(error);
        }
      )
    );
  });

  return promise;
};
