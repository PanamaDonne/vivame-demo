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
    { id: 'discover', title: 'Kunskapsbank' },
    { id: 'assess', title: 'Självskattning' },
    { id: 'engage', title: 'Hitta stöd' },
    { id: 'community', title: 'Gemenskap' }
  ];

  const renderHomepage = () => (
    <motion.div 
      className="min-h-screen bg-vivame-cream"
      style={{ backgroundColor: '#FEFCFB' }}
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
              <span>2,847 kvinnor gick med denna vecka</span>
            </motion.span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-display font-bold text-vivame-dark mb-6 leading-tight">
            Din resa till klimakteriehälsa
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Tusentals kvinnor har hittat personligt stöd genom evidensbaserad kunskap, gemenskap och professionell vård
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-gray-500">
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>500+ Expertartiklar</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>1,200+ Gemenskapsberättelser</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>150+ Verifierade vårdgivare</span>
            </motion.div>
          </div>
          
          {isNewUser && (
            <motion.div 
              className="max-w-md mx-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-display font-bold text-vivame-dark mb-4">Starta självskattning</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-4">
                    Få personliga rekommendationer baserat på din unika upplevelse
                  </p>
                </div>
                
                <div className="text-center">
                  <button 
                    className="bg-black text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                    onClick={() => setCurrentStep('assess')}
                  >
                    Starta självskattning
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Journey Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div 
            className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
            style={{ backgroundColor: 'white' }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-center mb-6">
              <h3 className="text-3xl font-display font-bold text-vivame-dark mb-4">Upptäck kunskap & gemenskap</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Bläddra genom evidensbaserade artiklar, personliga berättelser och expertinsikter
              </p>
              <div className="flex justify-center items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  <span>23 nya artiklar idag</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                  <span>47 aktiva diskussioner</span>
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="bg-vivame-blue/10 text-vivame-blue px-4 py-2 rounded-full text-sm font-medium">Evidensbaserat innehåll</span>
              <span className="bg-vivame-purple/10 text-vivame-purple px-4 py-2 rounded-full text-sm font-medium">Gemenskapsberättelser</span>
              <span className="bg-vivame-green/10 text-vivame-green px-4 py-2 rounded-full text-sm font-medium">Expert Q&A</span>
            </div>
            
            <div className="text-center">
              <Tooltip content="Bläddra genom 500+ expertartiklar och gemenskapsberättelser">
                <button 
                  className="text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  style={{ 
                    background: 'linear-gradient(to right, #E91E63, #9C27B0)',
                    color: 'white'
                  }}
                  onClick={() => setCurrentStep('discover')}
                >
                  Kunskapsbank
                </button>
              </Tooltip>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
            style={{ backgroundColor: 'white' }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center mb-6">
              <h3 className="text-3xl font-display font-bold text-vivame-dark mb-4">Hitta stöd & marknadsplats</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Anslut med vårdgivare, kliniker och specialiserade tjänster för personlig vård
              </p>
              <div className="flex justify-center items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span>12 vårdgivare tillgängliga nu</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  <span>98% nöjdhetsgrad</span>
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="bg-vivame-teal/10 text-vivame-teal px-4 py-2 rounded-full text-sm font-medium">Klinikregister</span>
              <span className="bg-vivame-green/10 text-vivame-green px-4 py-2 rounded-full text-sm font-medium">Vårdgivarprofiler</span>
              <span className="bg-vivame-orange/10 text-vivame-orange px-4 py-2 rounded-full text-sm font-medium">Boka tider</span>
            </div>
            
            <div className="text-center">
              <Tooltip content="Anslut med 150+ verifierade vårdgivare">
                <button 
                  className="text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  style={{ 
                    background: 'linear-gradient(to right, #00BCD4, #2196F3)',
                    color: 'white'
                  }}
                  onClick={() => setCurrentStep('engage')}
                >
                  Hitta stöd
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
      <div className="min-h-screen bg-vivame-cream" style={{ backgroundColor: '#FEFCFB' }}>
        {/* Header */}
        <motion.header 
          className="bg-vivame-red text-white shadow-lg"
          style={{ 
            backgroundColor: '#8B1538',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 py-6">
            {/* Header with logo and login buttons */}
            <div className="flex justify-between items-center mb-6">
              <motion.h1 
                className="text-4xl font-bold cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setCurrentStep('home')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Vivame
              </motion.h1>
              
              <div className="flex gap-2">
                <motion.button
                  className="px-6 py-2 bg-white/20 text-white rounded-full font-medium hover:bg-white/30 transition-all duration-300 border border-white/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Klient
                </motion.button>
                <motion.button
                  className="px-6 py-2 bg-white/20 text-white rounded-full font-medium hover:bg-white/30 transition-all duration-300 border border-white/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Klinik
                </motion.button>
              </div>
            </div>
            
            {/* Subtitle and navigation */}
            <div className="text-center mb-6">
              <p className="text-lg opacity-90">Kunskap & gemenskap för klimakteriestöd</p>
            </div>
            
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
                        ? 'bg-white shadow-lg' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                    style={currentStep === step.id ? { color: '#8B1538' } : {}}
                    onClick={() => setCurrentStep(step.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-sm">{step.title}</span>
                  </motion.button>
                ))}
              </motion.nav>
            )}
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
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Upptäck kunskap & gemenskap</h2>
                  <p className="text-xl text-gray-600">Evidensbaserat innehåll och gemenskapsberättelser för att stödja din resa</p>
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
          <p className="text-gray-300">&copy; 2025 Vivame </p>
        </motion.footer>
    </div>
    </ThemeProvider>
  );
}

export default App;
