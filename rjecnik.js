<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tursko-Bosanski Rječnik</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        h1 {
            color: #e63946;
            text-align: center;
        }
        .container {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input, textarea, select {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }
        button {
            background-color: #e63946;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin-right: 10px;
        }
        button:hover {
            background-color: #c1121f;
        }
        .search-container {
            margin: 20px 0;
            display: flex;
            gap: 10px;
        }
        .search-container input {
            flex-grow: 1;
        }
        .dictionary-list {
            margin-top: 20px;
        }
        .word-card {
            background-color: #f8f9fa;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 4px;
            border-left: 4px solid #e63946;
        }
        .word-header {
            font-weight: bold;
            font-size: 18px;
            color: #e63946;
            margin-bottom: 5px;
        }
        .translation {
            font-style: italic;
        }
        .example {
            margin-top: 5px;
            font-size: 14px;
            color: #555;
        }
        .category-tag {
            display: inline-block;
            background-color: #a8dadc;
            color: #1d3557;
            padding: 2px 8px;
            border-radius: 10px;
            font-size: 12px;
            margin-right: 5px;
        }
        .date-added {
            margin-top: 5px;
            font-size: 12px;
            color: #777;
        }
        .tab-buttons {
            display: flex;
            margin-bottom: 15px;
            border-bottom: 1px solid #ddd;
        }
        .tab-button {
            padding: 10px 15px;
            cursor: pointer;
            background: none;
            border: none;
            border-bottom: 3px solid transparent;
            color: #1d3557;
        }
        .tab-button.active {
            border-bottom: 3px solid #e63946;
            font-weight: bold;
        }
        .category-section {
            margin-top: 30px;
        }
        .category-title {
            color: #1d3557;
            border-bottom: 2px solid #a8dadc;
            padding-bottom: 5px;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Tursko-Bosanski Rječnik</h1>
        
        <div class="tab-buttons">
            <button class="tab-button active" onclick="showTab('add-word')">Dodaj riječ</button>
            <button class="tab-button" onclick="showTab('view-words')">Pregled riječi</button>
        </div>
        
        <div id="add-word" class="tab-content">
            <div class="form-group">
                <label for="turkishWord">Turska riječ/fraza:</label>
                <input type="text" id="turkishWord" placeholder="Unesite tursku riječ ili frazu">
            </div>
            
            <div class="form-group">
                <label for="bosnianTranslation">Bosanski prijevod:</label>
                <input type="text" id="bosnianTranslation" placeholder="Unesite bosanski prijevod">
            </div>
            
            <div class="form-group">
                <label for="exampleSentence">Primjer rečenice (opciono):</label>
                <textarea id="exampleSentence" rows="3" placeholder="Unesite primjer rečenice na turskom"></textarea>
            </div>
            
            <div class="form-group">
                <label for="wordCategory">Kategorija:</label>
                <select id="wordCategory">
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
            
            <button onclick="addWord()">Dodaj u rječnik</button>
        </div>
        
        <div id="view-words" class="tab-content" style="display: none;">
            <div class="search-container">
                <input type="text" id="searchInput" placeholder="Pretraži turske ili bosanske riječi...">
                <button onclick="searchWords()">Pretraži</button>
                <button onclick="clearSearch()">Poništi</button>
            </div>
            
            <div id="wordEntries"></div>
        </div>
    </div>

    <script>
        // Initialize dictionary from localStorage or create empty array
        let dictionary = JSON.parse(localStorage.getItem('turkishBosnianDictionary')) || [];
        
        // Function to show/hide tabs
        function showTab(tabId) {
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.style.display = 'none';
            });
            document.querySelectorAll('.tab-button').forEach(button => {
                button.classList.remove('active');
            });
            
            document.getElementById(tabId).style.display = 'block';
            event.target.classList.add('active');
        }
        
        // Function to add a new word to the dictionary
        function addWord() {
            const turkishWord = document.getElementById('turkishWord').value.trim();
            const bosnianTranslation = document.getElementById('bosnianTranslation').value.trim();
            const exampleSentence = document.getElementById('exampleSentence').value.trim();
            const category = document.getElementById('wordCategory').value;
            
            if (!turkishWord || !bosnianTranslation) {
                alert('Molimo unesite tursku riječ i bosanski prijevod!');
                return;
            }
            
            // Create new word entry
            const newEntry = {
                id: Date.now(), // Use timestamp as unique ID
                turkish: turkishWord,
                bosnian: bosnianTranslation,
                example: exampleSentence,
                category: category,
                dateAdded: new Date().toLocaleDateString('bs-BA')
            };
            
            // Add to dictionary array
            dictionary.push(newEntry);
            
            // Save to localStorage
            localStorage.setItem('turkishBosnianDictionary', JSON.stringify(dictionary));
            
            // Clear form
            document.getElementById('turkishWord').value = '';
            document.getElementById('bosnianTranslation').value = '';
            document.getElementById('exampleSentence').value = '';
            
            // Show success message
            alert('Riječ "' + turkishWord + '" uspješno dodana u rječnik!');
            
            // Update display if we're on the view tab
            if (document.getElementById('view-words').style.display === 'block') {
                displayDictionary();
            }
        }
        
        // Function to search words
        function searchWords() {
            const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
            
            if (!searchTerm) {
                displayDictionary();
                return;
            }
            
            const filteredWords = dictionary.filter(entry => 
                entry.turkish.toLowerCase().includes(searchTerm) || 
                entry.bosnian.toLowerCase().includes(searchTerm)
            );
            
            displayWordList(filteredWords);
        }
        
        // Function to clear search
        function clearSearch() {
            document.getElementById('searchInput').value = '';
            displayDictionary();
        }
        
        // Function to display the dictionary organized by categories
        function displayDictionary() {
            const wordEntries = document.getElementById('wordEntries');
            wordEntries.innerHTML = '';
            
            if (dictionary.length === 0) {
                wordEntries.innerHTML = '<p>Još niste dodali nijednu riječ u rječnik.</p>';
                return;
            }
            
            // Sort dictionary by date added (newest first)
            dictionary.sort((a, b) => b.id - a.id);
            
            // Group by category
            const categories = {};
            dictionary.forEach(entry => {
                if (!categories[entry.category]) {
                    categories[entry.category] = [];
                }
                categories[entry.category].push(entry);
            });
            
            // Display by category
            for (const [category, words] of Object.entries(categories)) {
                const categorySection = document.createElement('div');
                categorySection.className = 'category-section';
                
                const categoryTitle = document.createElement('h2');
                categoryTitle.className = 'category-title';
                categoryTitle.textContent = getCategoryName(category);
                categorySection.appendChild(categoryTitle);
                
                words.forEach(entry => {
                    categorySection.appendChild(createWordCard(entry));
                });
                
                wordEntries.appendChild(categorySection);
            }
        }
        
        // Helper function to display a list of words (for search results)
        function displayWordList(words) {
            const wordEntries = document.getElementById('wordEntries');
            wordEntries.innerHTML = '';
            
            if (words.length === 0) {
                wordEntries.innerHTML = '<p>Nema rezultata pretrage.</p>';
                return;
            }
            
            words.forEach(entry => {
                wordEntries.appendChild(createWordCard(entry));
            });
        }
        
        // Helper function to create a word card
        function createWordCard(entry) {
            const wordCard = document.createElement('div');
            wordCard.className = 'word-card';
            
            let exampleHtml = '';
            if (entry.example) {
                exampleHtml = `<div class="example"><strong>Primjer:</strong> ${entry.example}</div>`;
            }
            
            wordCard.innerHTML = `
                <div class="word-header">${entry.turkish}</div>
                <div class="translation"><strong>Prijevod:</strong> ${entry.bosnian}</div>
                ${exampleHtml}
                <div><span class="category-tag">${getCategoryName(entry.category)}</span></div>
                <div class="date-added"><small>Dodano: ${entry.dateAdded}</small></div>
            `;
            
            return wordCard;
        }
        
        // Helper function to get category display name
        function getCategoryName(categoryKey) {
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
        }
        
        // Display dictionary when page loads if on view tab
        window.onload = function() {
            if (window.location.hash === '#view') {
                showTab('view-words');
            }
            displayDictionary();
        };
    </script>
</body>
</html>