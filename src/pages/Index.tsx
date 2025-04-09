
import React from 'react';
import QuizComponent from '@/components/QuizComponent';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Multiple Choice Quiz</h1>
        <QuizComponent />
      </div>
    </div>
  );
};

export default Index;
