import { useState, useEffect } from 'react';
import AddWordForm from './components/AddWordForm';
import DictionaryList from './components/DictionaryList';
import SearchBar from './components/SearchBar';
import { getWords } from './services/dictionaryService';
import './styles/App.css';

function App() {
  const [dictionary, setDictionary] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('add-word');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDictionary = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const words = await getWords();
        setDictionary(words);
      } catch (err) {
        console.error('Error loading dictionary:', err);
        setError('Došlo je do greške pri učitavanju rječnika.');
      } finally {
        setIsLoading(false);
      }
    };
    loadDictionary();
  }, []);

  const handleAddWord = (newWord) => {
    setDictionary(prev => [newWord, ...prev]);
  };

  const filteredWords = dictionary.filter(entry => 
    entry.turkish.toLowerCase().includes(searchTerm.toLowerCase()) || 
    entry.bosnian.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Tursko-Bosanski Rječnik</h1>
      
      <div className="tab-buttons">
        <button 
          className={`tab-button ${activeTab === 'add-word' ? 'active' : ''}`}
          onClick={() => setActiveTab('add-word')}
        >
          Dodaj riječ
        </button>
        <button 
          className={`tab-button ${activeTab === 'view-words' ? 'active' : ''}`}
          onClick={() => setActiveTab('view-words')}
        >
          Pregled riječi
        </button>
      </div>
      
      {error ? (
        <div className="error-message">{error}</div>
      ) : isLoading ? (
        <div className="loading">Učitavanje rječnika...</div>
      ) : activeTab === 'add-word' ? (
        <AddWordForm onAddWord={handleAddWord} />
      ) : (
        <>
          <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
          />
          <DictionaryList words={filteredWords} />
        </>
      )}
    </div>
  );
}

export default App;
