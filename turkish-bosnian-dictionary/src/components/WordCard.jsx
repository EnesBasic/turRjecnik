import { useState, useEffect } from 'react';

const WordCard = ({ word }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    if (word.turkish && !word.imageUrl) {
      const fetchImage = async () => {
        setImageLoading(true);
        try {
          const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${word.turkish}&per_page=1&client_id=YOUR_UNSPLASH_ACCESS_KEY`
          );
          const data = await response.json();
          setImageUrl(data.results[0]?.urls?.small);
        } catch (error) {
          console.error('Error fetching image:', error);
        } finally {
          setImageLoading(false);
        }
      };
      fetchImage();
    } else if (word.imageUrl) {
      setImageUrl(word.imageUrl);
    }
  }, [word.turkish, word.imageUrl]);

  return (
    <div className="word-card">
      <div className="word-header">
        {word.turkish}
        <span className="category-tag">{word.category}</span>
      </div>
      <div className="translation">
        <strong>Prijevod:</strong> {word.bosnian}
      </div>
      {word.example && (
        <div className="example">
          <strong>Primjer:</strong> {word.example}
        </div>
      )}
      {imageLoading ? (
        <div className="image-loading">Učitavanje slike...</div>
      ) : imageUrl ? (
        <div className="word-image">
          <img src={imageUrl} alt={word.turkish} />
        </div>
      ) : null}
      <div className="date-added">
        <small>Dodano: {word.dateAdded}</small>
      </div>
    </div>
  );
};

export default WordCard;
