export default function FetchAddress() {
  const key = process.env['REACT_APP_MAPS_API_KEY'];
  const lat = placeData.lat;
  const lng = placeData.lng;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      export const area = data.results[5].formatted_address;
      export const exactAddress = data.results[0].formatted_address;
    })
    .catch((error) => console.log(error.message));
}
