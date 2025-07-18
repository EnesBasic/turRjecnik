import { useState, useEffect } from 'react';
import { getTurkishSuggestions } from '../utils/turkishUtils';

const TurkishInput = ({ value, onChange, ...props }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (value.length > 0) {
      const lastChar = value.slice(-1);
      const newSuggestions = getTurkishSuggestions(lastChar);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [value]);

  const handleSuggestionClick = (suggestion) => {
    const newValue = value.slice(0, -1) + suggestion;
    onChange({ target: { value: newValue } });
    setShowSuggestions(false);
  };

  return (
    <div className="turkish-input-container">
      <input
        value={value}
        onChange={onChange}
        {...props}
      />
      {showSuggestions && (
        <div className="suggestions-box">
          {suggestions.map((letter, index) => (
            <button
              key={index}
              type="button"
              className="suggestion-button"
              onClick={() => handleSuggestionClick(letter)}
            >
              {value.slice(-1)} → {letter}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TurkishInput;
