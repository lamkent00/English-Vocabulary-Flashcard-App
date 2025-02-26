import React, { useState } from 'react';
import { FlashcardDeck } from './components/FlashcardDeck';
import { categories } from './data';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const currentCategory = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto pt-8 px-4">
        <div className="mb-8">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Select Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full rounded-lg border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <FlashcardDeck flashcards={currentCategory?.flashcards || []} />
      </div>
    </div>
  );
}

export default App;