import { useState } from 'react';
import TurkishInput from './TurkishInput';
import { addWord } from '../services/dictionaryService';
import { fetchImageForWord } from '../services/imageService';

const AddWordForm = ({ onAddWord }) => {
  const [formData, setFormData] = useState({
    turkish: '',
    bosnian: '',
    example: '',
    category: 'opšte'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.turkish || !formData.bosnian) {
      setMessage({ text: 'Molimo unesite tursku riječ i bosanski prijevod!', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      // Fetch image for the word
      const imageUrl = await fetchImageForWord(formData.turkish);
      
      const wordData = {
        ...formData,
        dateAdded: new Date().toLocaleDateString('bs-BA'),
        ...(imageUrl && { imageUrl })
      };

      const result = await addWord(wordData);

      if (result.success) {
        onAddWord({ ...wordData, id: result.id });
        setFormData({
          turkish: '',
          bosnian: '',
          example: '',
          category: 'opšte'
        });
        setMessage({
          text: `Riječ "${wordData.turkish}" uspješno dodana!`,
          type: 'success'
        });
      } else {
        throw new Error('Failed to add word');
      }
    } catch (error) {
      setMessage({
        text: 'Došlo je do greške pri dodavanju riječi.',
        type: 'error'
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="word-form">
      <div className="form-group">
        <label htmlFor="turkish">Turska riječ/fraza:</label>
        <TurkishInput
          id="turkish"
          name="turkish"
          value={formData.turkish}
          onChange={handleChange}
          placeholder="Unesite tursku riječ ili frazu"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="bosnian">Bosanski prijevod:</label>
        <input
          id="bosnian"
          name="bosnian"
          type="text"
          value={formData.bosnian}
          onChange={handleChange}
          placeholder="Unesite bosanski prijevod"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="example">Primjer rečenice (opciono):</label>
        <textarea
          id="example"
          name="example"
          rows="3"
          value={formData.example}
          onChange={handleChange}
          placeholder="Unesite primjer rečenice na turskom"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="category">Kategorija:</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="opšte">Opšte</option>
          <option value="životinje">Životinje</option>
          <option value="brojevi">Brojevi</option>
          <option value="zanimanja">Zanimanja</option>
          <option value="hrana">Hrana</option>
          <option value="porodica">Porodica</option>
          <option value="grad">Grad</option>
          <option value="fraze">Fraze</option>
          <option value="glagoli">Glagoli</option>
          <option value="prilozi">Prilozi</option>
          <option value="drugo">Drugo</option>
        </select>
      </div>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Dodavanje...' : 'Dodaj u rječnik'}
      </button>
      
      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}
    </form>
  );
};

export default AddWordForm;
