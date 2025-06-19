import { useState } from 'react';
import { Vote, CheckCircle, Circle } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from "../axios";

const VoteForm = () => {
  const [votes, setVotes] = useState({
    animal: '',
    food: '',
    drink: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!votes.animal || !votes.food || !votes.drink) return;

    const payload = {
      votes: [
        { question_id: 1, option: votes.animal },
        { question_id: 2, option: votes.food },
        { question_id: 3, option: votes.drink },
      ],
    };

    try {
      setIsSubmitting(true);
      await API.post("/vote", payload);
      toast.success("✅ Vote submitted successfully!");

      // Reset form
      setVotes({
        animal: '',
        food: '',
        drink: ''
      });
    } catch (err) {
      toast.error("❌ Failed to submit vote.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVoteChange = (category, option) => {
    setVotes(prev => ({
      ...prev,
      [category]: option
    }));
  };

  const handleViewResults = () => {
    navigate("/result");
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

  const isComplete = votes.animal && votes.food && votes.drink;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <ToastContainer position="top-center" />
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
          <div className="flex items-center justify-center mb-8">
            <Vote className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Cast Your Vote</h1>
          </div>

          <div className="space-y-8">
            {questions.map((question) => (
              <div key={question.id} className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                  <span className="text-2xl mr-2">{question.icon}</span>
                  {question.title}
                </h2>

                <div className="space-y-3">
                  {question.options.map((option) => (
                    <label
                      key={option}
                      className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        votes[question.id] === option
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={option}
                        checked={votes[question.id] === option}
                        onChange={() => handleVoteChange(question.id, option)}
                        className="sr-only"
                      />
                      {votes[question.id] === option ? (
                        <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400 mr-3" />
                      )}
                      <span className={`text-lg ${
                        votes[question.id] === option ? 'text-blue-700 font-medium' : 'text-gray-700'
                      }`}>
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={handleSubmit}
              disabled={!isComplete || isSubmitting}
              className={`w-full py-4 px-6 rounded-lg text-white font-semibold text-lg transition-all duration-200 ${
                isComplete && !isSubmitting
                  ? 'bg-blue-600 hover:bg-blue-700 transform hover:scale-105'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Vote'}
            </button>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={handleViewResults}
              className="text-blue-600 hover:text-blue-800 font-medium underline"
            >
              View Current Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteForm;
