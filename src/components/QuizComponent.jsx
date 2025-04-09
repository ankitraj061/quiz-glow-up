
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Check, X } from 'lucide-react';

// Quiz questions data
const quizData = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: [
      { id: "A", text: "London" },
      { id: "B", text: "Berlin" },
      { id: "C", text: "Paris" },
      { id: "D", text: "Madrid" }
    ],
    correctAnswer: "C"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: [
      { id: "A", text: "Venus" },
      { id: "B", text: "Mars" },
      { id: "C", text: "Jupiter" },
      { id: "D", text: "Saturn" }
    ],
    correctAnswer: "B"
  },
  {
    id: 3,
    question: "What is the largest ocean on Earth?",
    options: [
      { id: "A", text: "Atlantic Ocean" },
      { id: "B", text: "Indian Ocean" },
      { id: "C", text: "Arctic Ocean" },
      { id: "D", text: "Pacific Ocean" }
    ],
    correctAnswer: "D"
  },
  {
    id: 4,
    question: "Who painted the Mona Lisa?",
    options: [
      { id: "A", text: "Vincent van Gogh" },
      { id: "B", text: "Pablo Picasso" },
      { id: "C", text: "Leonardo da Vinci" },
      { id: "D", text: "Michelangelo" }
    ],
    correctAnswer: "C"
  }
];

const QuizComponent = () => {
  // State to track user's answers
  const [answers, setAnswers] = useState({});
  
  // State to track if quiz has been submitted
  const [submitted, setSubmitted] = useState(false);

  // Handler for when an answer is selected
  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  // Handler for submitting the quiz
  const handleSubmit = () => {
    setSubmitted(true);
  };

  // Function to reset the quiz
  const resetQuiz = () => {
    setAnswers({});
    setSubmitted(false);
  };

  // Function to check if an answer is correct
  const isCorrect = (questionId) => {
    const question = quizData.find(q => q.id === questionId);
    return answers[questionId] === question.correctAnswer;
  };

  // Function to determine the class name for an option
  const getOptionClassName = (questionId, optionId) => {
    if (!submitted || answers[questionId] !== optionId) {
      return "border-gray-200 bg-white";
    }
    
    const question = quizData.find(q => q.id === questionId);
    if (optionId === question.correctAnswer) {
      return "border-green-300 bg-green-50";
    }
    
    return "border-red-300 bg-red-50";
  };

  return (
    <div className="space-y-8">
      {quizData.map((question) => (
        <Card key={question.id} className="p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-medium text-gray-800">{question.question}</h2>
          </div>
          
          <RadioGroup 
            value={answers[question.id] || ""} 
            onValueChange={(value) => handleAnswerChange(question.id, value)}
            disabled={submitted}
            className="space-y-3"
          >
            {question.options.map((option) => (
              <div 
                key={option.id} 
                className={`flex items-center p-3 rounded-md border transition-colors ${getOptionClassName(question.id, option.id)}`}
              >
                <RadioGroupItem value={option.id} id={`q${question.id}-${option.id}`} className="mr-3" />
                <Label htmlFor={`q${question.id}-${option.id}`} className="flex-1 cursor-pointer">
                  <span className="font-medium mr-2">{option.id}.</span> {option.text}
                </Label>
                
                {submitted && option.id === question.correctAnswer && (
                  <Check className="h-5 w-5 text-green-500" />
                )}
                
                {submitted && answers[question.id] === option.id && option.id !== question.correctAnswer && (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </div>
            ))}
          </RadioGroup>
          
          {submitted && answers[question.id] && !isCorrect(question.id) && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-800">
              <p className="flex items-center">
                <Check className="h-5 w-5 mr-2" />
                <span>Correct answer: <strong>{question.correctAnswer}. {quizData.find(q => q.id === question.id).options.find(o => o.id === question.correctAnswer).text}</strong></span>
              </p>
            </div>
          )}
        </Card>
      ))}
      
      <div className="flex justify-between pt-4">
        {submitted ? (
          <Button onClick={resetQuiz} className="w-full bg-purple-500 hover:bg-purple-600">
            Try Again
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="w-full bg-blue-500 hover:bg-blue-600" disabled={Object.keys(answers).length !== quizData.length}>
            Submit Quiz
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;
