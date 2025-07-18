import WordCard from './WordCard';

const DictionaryList = ({ words }) => {
  if (words.length === 0) {
    return <p className="no-words">Nema riječi za prikaz.</p>;
  }

  // Group by category
  const categories = {};
  words.forEach(entry => {
    if (!categories[entry.category]) {
      categories[entry.category] = [];
    }
    categories[entry.category].push(entry);
  });

  return (
    <div className="dictionary-list">
      {Object.entries(categories).map(([category, categoryWords]) => (
        <div key={category} className="category-section">
          <h2 className="category-title">{getCategoryName(category)}</h2>
          {categoryWords.map(word => (
            <WordCard key={word.id} word={word} />
          ))}
        </div>
      ))}
    </div>
  );
};

const getCategoryName = (categoryKey) => {
  const categoryNames = {
    'opšte': 'Opšte riječi',
    'životinje': 'Životinje',
    'brojevi': 'Brojevi',
    'zanimanja': 'Zanimanja',
    'hrana': 'Hrana',
    'porodica': 'Porodica',
    'grad': 'Grad',
    'fraze': 'Korisne fraze',
    'glagoli': 'Glagoli',
    'prilozi': 'Prilozi',
    'drugo': 'Drugo'
  };
  return categoryNames[categoryKey] || categoryKey;
};

export default DictionaryList;
