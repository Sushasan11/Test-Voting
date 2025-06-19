import React, { useEffect, useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/results`)
      .then(res => setResults(res.data))
      .catch(() => alert("Failed to fetch results"));
  }, []);

  const handleBack = () => {
    navigate('/');
  };

  const questions = [
    {
      id: 'animal',
      title: 'Favourite Animal',
      options: ['Dog', 'Cat'],
      icon: '🐾'
    },
    {
      id: 'food',
      title: 'Favourite Food',
      options: ['Momo', 'Thupka'],
      icon: '🍜'
    },
    {
      id: 'drink',
      title: 'Favourite Drink',
      options: ['Coke', 'Pepsi'],
      icon: '🥤'
    }
  ];

  const getPercentage = (category, option) => {
    if (!results || !results[category]) return 0;
    const categoryResults = results[category];
    const total = Object.values(categoryResults).reduce((sum, count) => sum + count, 0);
    const count = categoryResults[option] || 0;
    return total > 0 ? Math.round((count / total) * 100) : 0;
  };

  const getCount = (category, option) => {
    if (!results || !results[category]) return 0;
    const categoryResults = results[category];
    return categoryResults[option] || 0;
  };

  const getTotalVotes = (category) => {
    if (!results || !results[category]) return 0;
    const categoryResults = results[category];
    return Object.values(categoryResults).reduce((sum, count) => sum + count, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
          <div className="flex items-center justify-center mb-8">
            <BarChart3 className="w-8 h-8 text-green-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Voting Results</h1>
          </div>

          <div className="space-y-8">
            {questions.map((question) => (
              <div key={question.id} className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                  <span className="text-2xl mr-2">{question.icon}</span>
                  {question.title}
                  <span className="ml-auto text-sm text-gray-500">
                    Total votes: {getTotalVotes(question.id)}
                  </span>
                </h2>

                <div className="space-y-4">
                  {question.options.map((option) => {
                    const percentage = getPercentage(question.id, option);
                    const count = getCount(question.id, option);

                    return (
                      <div key={option} className="relative">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-lg font-medium text-gray-700">{option}</span>
                          <span className="text-sm text-gray-600">
                            {count} votes ({percentage}%)
                          </span>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleBack}
            className="mt-8 w-full py-3 px-6 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors duration-200"
          >
            Back to Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
