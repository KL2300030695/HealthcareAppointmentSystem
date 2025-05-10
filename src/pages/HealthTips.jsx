import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

const HealthTips = () => {
  const user = getCurrentUser();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data (in a real app, this would come from an API)
  const healthTips = [
    {
      id: 1,
      title: "Maintaining a Healthy Diet",
      category: "nutrition",
      content: "Eat a variety of fruits and vegetables daily. Include whole grains, lean proteins, and healthy fats in your diet. Limit processed foods and sugary drinks.",
      image: "🥗",
      importance: "high"
    },
    {
      id: 2,
      title: "Regular Exercise Routine",
      category: "fitness",
      content: "Aim for at least 30 minutes of moderate exercise daily. Mix cardio with strength training for optimal health benefits. Remember to stretch before and after workouts.",
      image: "🏃‍♂️",
      importance: "high"
    },
    {
      id: 3,
      title: "Stress Management",
      category: "mental-health",
      content: "Practice mindfulness or meditation daily. Take regular breaks during work. Ensure you get enough sleep and maintain a consistent sleep schedule.",
      image: "🧘‍♀️",
      importance: "medium"
    },
    {
      id: 4,
      title: "Hydration Tips",
      category: "nutrition",
      content: "Drink at least 8 glasses of water daily. Monitor urine color for hydration levels. Increase intake during exercise or hot weather.",
      image: "💧",
      importance: "high"
    },
    {
      id: 5,
      title: "Posture Improvement",
      category: "fitness",
      content: "Maintain good posture while sitting and standing. Take regular breaks from sitting. Consider ergonomic furniture for your workspace.",
      image: "🧍‍♂️",
      importance: "medium"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Tips', icon: '📋' },
    { id: 'nutrition', name: 'Nutrition', icon: '🥗' },
    { id: 'fitness', name: 'Fitness', icon: '💪' },
    { id: 'mental-health', name: 'Mental Health', icon: '🧠' }
  ];

  const filteredTips = selectedCategory === 'all' 
    ? healthTips 
    : healthTips.filter(tip => tip.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Health Tips & Advice</h1>
          <Link
            to="/patient/dashboard"
            className="text-blue-600 hover:text-blue-700 flex items-center"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg flex items-center justify-center space-x-2 transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map((tip) => (
            <div key={tip.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{tip.image}</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    tip.importance === 'high'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {tip.importance === 'high' ? 'Important' : 'Recommended'}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-gray-600">{tip.content}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500 capitalize">{tip.category.replace('-', ' ')}</span>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthTips; 