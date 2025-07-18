const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY';

export const fetchImageForWord = async (word) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${word}&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    const data = await response.json();
    return data.results[0]?.urls?.small || null;
  } catch (error) {
    console.error("Error fetching image: ", error);
    return null;
  }
};