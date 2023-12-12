export class Place {
  constructor(title, imageUri, address, location, id) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = {
      latitude: location.latitude,
      longitude: location.longitude,
    };
    this.id = id;
  }
}
