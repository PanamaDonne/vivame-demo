import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import QnAForm from './components/QnAForm';
import ArticleList from './components/ArticleList';
import SearchBar from './components/SearchBar';
import SelfAssessment from './components/SelfAssessment';
import Marketplace from './components/Marketplace';
import Tooltip from './components/Tooltip';

// Material UI Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
  },
});

function App() {
  const [currentStep, setCurrentStep] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewUser] = useState(true);

    const steps = [
      { id: 'discover', title: 'Discover Knowledge' },
      { id: 'assess', title: 'Self-Assessment' },
      { id: 'engage', title: 'Find Support' },
      { id: 'community', title: 'Community' }
    ];

  const renderHomepage = () => (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #f9fafb, #dbeafe)',
        padding: '2rem'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="mb-4">
            <motion.span 
              className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              <span>2,847 women joined this week</span>
            </motion.span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your Journey to{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Menopause Wellness
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Join thousands of women who've found personalized support through evidence-based knowledge, community connection, and professional care
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-gray-500">
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>500+ Expert Articles</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>1,200+ Community Stories</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>150+ Verified Providers</span>
            </motion.div>
          </div>
          
          {isNewUser && (
            <motion.div 
              className="max-w-md mx-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white shadow-2xl">
                      <h3 className="text-2xl font-semibold mb-3">Welcome! Let's start with a quick assessment</h3>
                <p className="mb-6 opacity-90">Get personalized recommendations based on your unique experience</p>
                <button 
                  className="bg-white text-primary-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  onClick={() => setCurrentStep('assess')}
                >
                  Start Self-Assessment
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Journey Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div 
            className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Discover Knowledge & Community</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Browse evidence-based articles, personal stories, and expert insights to support your menopause journey
              </p>
              <div className="flex justify-center items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  <span>23 new articles today</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                  <span>47 active discussions</span>
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">Evidence-Based Content</span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">Community Stories</span>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">Expert Q&A</span>
            </div>
            
            <div className="text-center">
              <Tooltip content="Browse 500+ expert articles and community stories">
                <button 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  onClick={() => setCurrentStep('discover')}
                >
                  Explore Knowledge
                </button>
              </Tooltip>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Find Support & Marketplace</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Connect with healthcare providers, clinics, and specialized services for personalized care
              </p>
              <div className="flex justify-center items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span>12 providers available now</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  <span>98% satisfaction rate</span>
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">Clinic Directory</span>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">Provider Profiles</span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">Book Appointments</span>
            </div>
            
            <div className="text-center">
              <Tooltip content="Connect with 150+ verified healthcare providers">
                <button 
                  className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  onClick={() => setCurrentStep('engage')}
                >
                  Find Support
                </button>
              </Tooltip>
            </div>
          </motion.div>
        </div>


      </div>
    </motion.div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <motion.header 
          className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg"
          style={{ 
            background: 'linear-gradient(to right, #667eea, #764ba2)',
            color: 'white',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 py-6">
            <div className="text-center mb-6">
              <motion.h1 
                className="text-4xl font-bold cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setCurrentStep('home')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Vivame
              </motion.h1>
              <p className="text-lg opacity-90 mt-2">Knowledge & Community for Menopause Support</p>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-4">
              {currentStep !== 'home' && (
                <motion.nav 
                  className="flex flex-wrap justify-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {steps.map((step) => (
                    <motion.button
                      key={step.id}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                        currentStep === step.id 
                          ? 'bg-white text-primary-600 shadow-lg' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                      onClick={() => setCurrentStep(step.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-sm">{step.title}</span>
                    </motion.button>
                  ))}
                </motion.nav>
              )}
              
              <div className="flex gap-2">
                <motion.button
                  className="px-6 py-2 bg-white/20 text-white rounded-full font-medium hover:bg-white/30 transition-all duration-300 border border-white/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Client Login
                </motion.button>
                <motion.button
                  className="px-6 py-2 bg-white/20 text-white rounded-full font-medium hover:bg-white/30 transition-all duration-300 border border-white/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Clinic Login
                </motion.button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="min-h-screen">
          <AnimatePresence mode="wait">
            {currentStep === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderHomepage()}
              </motion.div>
            )}
            
            {currentStep === 'discover' && (
              <motion.div
                key="discover"
                className="container mx-auto px-4 py-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Discover Knowledge & Community</h2>
                  <p className="text-xl text-gray-600">Evidence-based content and community stories to support your journey</p>
                </div>
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <ArticleList searchQuery={searchQuery} />
              </motion.div>
            )}
            
            {currentStep === 'assess' && (
              <motion.div
                key="assess"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SelfAssessment />
              </motion.div>
            )}
            
            {currentStep === 'engage' && (
              <motion.div
                key="engage"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Marketplace />
              </motion.div>
            )}
            
            {currentStep === 'community' && (
              <motion.div
                key="community"
                className="container mx-auto px-4 py-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Community Participation</h2>
                  <p className="text-xl text-gray-600">Share your story, ask questions, and connect with others</p>
                </div>
                <QnAForm />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <motion.footer 
          className="bg-gray-800 text-white text-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-gray-300">&copy; 2024 Vivame - Empowering women through knowledge and community</p>
        </motion.footer>
    </div>
    </ThemeProvider>
  );
}

export default App;
