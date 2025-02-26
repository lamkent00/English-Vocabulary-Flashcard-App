import React, { useState, useRef, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import type { Flashcard } from '../types';

interface FlashcardDeckProps {
  flashcards: Flashcard[];
}

export function FlashcardDeck({ flashcards }: FlashcardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Reset current index when flashcards change
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [flashcards]);

  const currentCard = flashcards[currentIndex];
  const progress = ((currentIndex + 1) / flashcards.length) * 100;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  if (!currentCard) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 text-lg">No flashcards available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-2xl">
      <div className="w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{currentIndex + 1} / {flashcards.length}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div
          className="relative perspective-1000 cursor-pointer mb-8"
          onClick={handleFlip}
        >
          <div
            className={`relative w-full transition-transform duration-700 transform-style-preserve-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* Front of card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 backface-hidden">
              <div className="aspect-video mb-6 overflow-hidden rounded-lg">
                <img
                  src={currentCard.imageUrl}
                  alt={currentCard.word}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {currentCard.word}
                </h2>
                <p className="text-gray-600 text-lg">
                  {currentCard.pronunciation}
                </p>
              </div>
            </div>

            {/* Back of card */}
            <div className="absolute inset-0 bg-white rounded-2xl shadow-xl p-6 backface-hidden rotate-y-180">
              <div className="h-full flex items-center justify-center">
                <p className="text-xl text-gray-700 text-center">
                  {currentCard.meaning}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={handlePrevious}
            className="px-6 py-2 bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={playAudio}
            className="p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors"
          >
            <Volume2 size={24} />
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      <audio ref={audioRef} src={currentCard.audioUrl} />

      {/* Instructions */}
      <div className="mt-8 text-center text-gray-600">
        <p>Click the card to flip • Use buttons to navigate • Click speaker to hear pronunciation</p>
      </div>
    </div>
  );
}