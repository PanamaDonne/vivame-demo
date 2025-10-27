import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LiveActivity = () => {
  const [activities] = useState([
    { id: 1, user: 'Sarah M.', action: 'completed self-assessment', time: '2 min ago', type: 'assessment' },
    { id: 2, user: 'Lisa K.', action: 'shared her menopause journey', time: '5 min ago', type: 'story' },
    { id: 3, user: 'Maria R.', action: 'booked appointment with Dr. Johnson', time: '8 min ago', type: 'booking' },
    { id: 4, user: 'Jennifer W.', action: 'found relief with new treatment', time: '12 min ago', type: 'success' },
    { id: 5, user: 'Amanda F.', action: 'joined the community', time: '15 min ago', type: 'join' }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [activities.length]);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'assessment': return '📋';
      case 'story': return '💬';
      case 'booking': return '📅';
      case 'success': return '✨';
      case 'join': return '👋';
      default: return '💫';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'assessment': return 'text-blue-600';
      case 'story': return 'text-purple-600';
      case 'booking': return 'text-green-600';
      case 'success': return 'text-yellow-600';
      case 'join': return 'text-pink-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Live Activity</h3>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-sm text-gray-500">Live</span>
        </div>
      </div>
      
      <div className="relative h-16 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <span className="text-2xl">{getActivityIcon(activities[currentIndex].type)}</span>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                <span className="font-medium">{activities[currentIndex].user}</span>{' '}
                <span className={getActivityColor(activities[currentIndex].type)}>
                  {activities[currentIndex].action}
                </span>
              </p>
              <p className="text-xs text-gray-500">{activities[currentIndex].time}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Join {activities.length} others who took action today</span>
          <span className="text-green-600 font-medium">+12 this hour</span>
        </div>
      </div>
    </div>
  );
};

export default LiveActivity;
