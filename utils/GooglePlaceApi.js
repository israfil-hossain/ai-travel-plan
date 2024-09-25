export const GetPhotoRef = async (placeName) => {
  const resp = await fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${placeName}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
  );
  const result = await resp.json();
  return result;
};
