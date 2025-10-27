import React, { useState } from 'react';
import './SelfAssessment.css';

const SelfAssessment = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState(null);
  const [isDailyAssessment, setIsDailyAssessment] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoDay, setDemoDay] = useState(1);
  const [historicalData, setHistoricalData] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState({});

  // Daglig självskattning - klimakteriefokus (6 frågor + fritext, <1 minut)
  const dailyQuestions = [
    {
      id: 'hot_flashes',
      question: 'Värmevallningar / svettningar',
      type: 'scale',
      scale: { min: 1, max: 5, labels: ['Inga', 'Milda', 'Måttliga', 'Svåra', 'Mycket svåra'] }
    },
    {
      id: 'sleep_quality',
      question: 'Sömnkvalitet',
      type: 'scale',
      scale: { min: 1, max: 5, labels: ['Mycket dålig', 'Dålig', 'Okej', 'Bra', 'Mycket bra'] }
    },
    {
      id: 'mood_anxiety',
      question: 'Humör / oro / irritation',
      type: 'scale',
      scale: { min: 1, max: 5, labels: ['Mycket dåligt', 'Dåligt', 'Okej', 'Bra', 'Mycket bra'] }
    },
    {
      id: 'energy_level',
      question: 'Energinivå',
      type: 'scale',
      scale: { min: 1, max: 5, labels: ['Mycket låg', 'Låg', 'Okej', 'Bra', 'Mycket bra'] }
    },
    {
      id: 'intimacy',
      question: 'Sexlust / torrhet / närhet',
      type: 'scale',
      scale: { min: 1, max: 5, labels: ['Mycket dåligt', 'Dåligt', 'Okej', 'Bra', 'Mycket bra'] }
    },
    {
      id: 'concentration',
      question: 'Koncentration / minne',
      type: 'scale',
      scale: { min: 1, max: 5, labels: ['Mycket dåligt', 'Dåligt', 'Okej', 'Bra', 'Mycket bra'] }
    },
    {
      id: 'daily_impact',
      question: 'Något som påverkat dig idag?',
      type: 'text',
      placeholder: 'Berätta om något som påverkat ditt mående idag...'
    }
  ];

  // Profil och bakgrundsdata (vid start)
  const initialQuestions = [
    {
      id: 'age',
      question: 'Vilken åldersgrupp tillhör du?',
      type: 'radio',
      options: [
        { value: '40-45', label: '40-45 år' },
        { value: '46-50', label: '46-50 år' },
        { value: '51-55', label: '51-55 år' },
        { value: '56-60', label: '56-60 år' },
        { value: '61-65', label: '61-65 år' }
      ]
    },
    {
      id: 'menstrual_status',
      question: 'Menscykelstatus',
      type: 'radio',
      options: [
        { value: 'regular', label: 'Regelbunden mens' },
        { value: 'irregular', label: 'Oregelbunden mens' },
        { value: 'no_period', label: 'Ingen mens (12+ månader)' }
      ]
    },
    {
      id: 'symptom_severity',
      question: 'Symptomgrad',
      type: 'radio',
      options: [
        { value: 'mild', label: 'Mild - påverkar inte vardagen' },
        { value: 'moderate', label: 'Måttlig - påverkar vardagen något' },
        { value: 'severe', label: 'Svår - påverkar vardagen betydligt' }
      ]
    },
    {
      id: 'current_treatment',
      question: 'Eventuella behandlingar',
      type: 'radio',
      options: [
        { value: 'none', label: 'Ingen behandling' },
        { value: 'supplements', label: 'Kosttillskott / naturliga preparat' },
        { value: 'hrt', label: 'Hormonbehandling (HRT)' },
        { value: 'other', label: 'Annat' }
      ]
    }
  ];

  // Demo data för att simulera flera dagar (klimakteriefokus)
  const demoData = {
    1: { hot_flashes: 4, sleep_quality: 2, mood_anxiety: 3, energy_level: 2, intimacy: 3, concentration: 2, daily_impact: 'Stressig dag på jobbet' },
    2: { hot_flashes: 3, sleep_quality: 3, mood_anxiety: 2, energy_level: 3, intimacy: 3, concentration: 3, daily_impact: 'Bättre sömn inatt' },
    3: { hot_flashes: 2, sleep_quality: 4, mood_anxiety: 2, energy_level: 4, intimacy: 4, concentration: 4, daily_impact: 'Gått ut och promenerat' },
    4: { hot_flashes: 3, sleep_quality: 3, mood_anxiety: 3, energy_level: 3, intimacy: 3, concentration: 3, daily_impact: 'Vanlig dag' },
    5: { hot_flashes: 2, sleep_quality: 4, mood_anxiety: 2, energy_level: 4, intimacy: 4, concentration: 4, daily_impact: 'Undvikit koffein idag' },
    6: { hot_flashes: 1, sleep_quality: 5, mood_anxiety: 1, energy_level: 5, intimacy: 5, concentration: 5, daily_impact: 'Fantastisk dag!' },
    7: { hot_flashes: 2, sleep_quality: 4, mood_anxiety: 2, energy_level: 4, intimacy: 4, concentration: 4, daily_impact: 'Känns som jag hittat en rutin' }
  };

  const questions = isDailyAssessment ? dailyQuestions : initialQuestions;

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateResults();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateResults = () => {
    const results = {
      riskLevel: calculateRiskLevel(),
      symptomProfile: analyzeSymptoms(),
      recommendations: generateRecommendations(),
      reportId: `VIV-${Date.now()}`,
      timestamp: new Date().toLocaleString('sv-SE'),
      isDaily: isDailyAssessment,
      day: isDemoMode ? demoDay : 1
    };
    
    // Spara historisk data
    if (isDailyAssessment) {
      const newEntry = {
        day: isDemoMode ? demoDay : new Date().toDateString(),
        scores: answers,
        recommendations: results.recommendations,
        timestamp: results.timestamp
      };
      setHistoricalData(prev => [...prev, newEntry]);
    }
    
    setAssessmentResults(results);
    setShowResults(true);
  };

  const calculateRiskLevel = () => {
    if (isDailyAssessment) {
      const scores = Object.values(answers).filter(score => typeof score === 'number');
      const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      
      if (averageScore <= 2) return 'hög';
      if (averageScore <= 3) return 'måttlig';
      return 'låg';
    }

    const symptoms = answers.symptoms || [];
    const lifestyle = answers.lifestyle || [];
    
    let riskScore = 0;
    riskScore += symptoms.length * 2;
    riskScore += lifestyle.length;
    
    if (riskScore >= 8) return 'hög';
    if (riskScore >= 4) return 'måttlig';
    return 'låg';
  };

  const analyzeSymptoms = () => {
    if (isDailyAssessment) {
      return {
        hot_flashes: answers.hot_flashes || 0,
        sleep_quality: answers.sleep_quality || 0,
        mood_anxiety: answers.mood_anxiety || 0,
        energy_level: answers.energy_level || 0,
        intimacy: answers.intimacy || 0,
        concentration: answers.concentration || 0
      };
    }

    const symptoms = answers.symptoms || [];
    const categories = {
      fysiska: ['hot_flashes', 'night_sweats', 'weight_gain', 'fatigue'],
      emotionella: ['mood_swings', 'anxiety', 'memory_issues'],
      sömn: ['sleep_issues']
    };
    
    const profile = {};
    Object.keys(categories).forEach(category => {
      profile[category] = categories[category].filter(symptom => symptoms.includes(symptom));
    });
    
    return profile;
  };

  const generateRecommendations = () => {
    const recommendations = [];
    
    if (isDailyAssessment) {
      // Dagliga personliga råd baserat på svaren (klimakteriefokus)
      const scores = answers;
      
      if (scores.hot_flashes && scores.hot_flashes >= 3) {
        recommendations.push({
          category: 'Livsstilsråd',
          title: 'Hantera värmevallningar naturligt',
          description: 'Undvik koffein, alkohol och kryddig mat. Bär lagerkläder du enkelt kan ta av. Andningsövningar kan hjälpa vid akuta vågor.',
          source: '1177.se - Klimakteriet'
        });
      }
      
      if (scores.sleep_quality && scores.sleep_quality <= 2) {
        recommendations.push({
          category: 'Sömn & återhämtning',
          title: 'Bättre sömn under klimakteriet',
          description: 'Håll sovrummet svalt (18-20°C), använd lättare täcken, undvik koffein efter 14:00. Prova magnesiumtillskott före läggdags.',
          source: 'Netdoktor.se - Sömnproblem vid klimakteriet'
        });
      }
      
      if (scores.mood_anxiety && scores.mood_anxiety <= 2) {
        recommendations.push({
          category: 'Stresshantering',
          title: 'Mindfulness för humörsvängningar',
          description: '10 minuters meditation dagligen kan hjälpa. Prova appen "Headspace" eller "Calm". Andningsövningar vid irritation.',
          source: 'Klimakterieportalen - Psykiska symptom'
        });
      }
      
      if (scores.energy_level && scores.energy_level <= 2) {
        recommendations.push({
          category: 'Kost & hälsa',
          title: 'Energi genom rätt kost',
          description: 'Ät regelbundet med komplexa kolhydrater, järnrika livsmedel (kött, spenat) och B-vitaminer. Undvik sockerchockar.',
          source: 'Folkhälsomyndigheten - Kostråd för kvinnor 40+'
        });
      }
      
      if (scores.intimacy && scores.intimacy <= 2) {
        recommendations.push({
          category: 'Relationer & intimitet',
          title: 'Intimitet under klimakteriet',
          description: 'Prata öppet med din partner om förändringar. Använd naturliga glidmedel. Fokusera på närhet och beröring, inte bara sex.',
          source: '1177.se - Sex och klimakteriet'
        });
      }
      
      if (scores.concentration && scores.concentration <= 2) {
        recommendations.push({
          category: 'Hjärnhälsa',
          title: 'Stärk koncentration och minne',
          description: 'Träna hjärnan med pussel, läsning eller språkinlärning. Omega-3 tillskott kan hjälpa. Få tillräckligt med sömn.',
          source: 'Klimakterieportalen - Kognitiva symptom'
        });
      }
      
      // Naturliga behandlingar
      if (scores.hot_flashes >= 3 || scores.mood_anxiety <= 2) {
        recommendations.push({
          category: 'Naturliga behandlingar',
          title: 'Fytoöstrogener och kosttillskott',
          description: 'Soja, rödklöver och linfrö innehåller fytoöstrogener. Diskutera med läkare innan kosttillskott. Vitamin D och magnesium kan hjälpa.',
          source: 'Netdoktor.se - Naturliga behandlingar vid klimakteriet'
        });
      }
    } else {
      // Initiala rekommendationer
      const symptoms = answers.symptoms || [];
      const lifestyle = answers.lifestyle || [];
      
      if (symptoms.includes('hot_flashes')) {
        recommendations.push({
          category: 'Kost & hälsa',
          title: 'Hantera hettflusher',
          description: 'Undvik kryddig mat, alkohol och varma drycker. Bär lagerkläder och håll dig sval.',
          source: '1177.se'
        });
      }
      
      if (symptoms.includes('sleep_issues')) {
        recommendations.push({
          category: 'Sömn & återhämtning',
          title: 'Förbättra din sömn',
          description: 'Skapa en sömnrutin, håll sovrummet svalt och mörkt, undvik koffein på eftermiddagen.',
          source: 'Folkhälsomyndigheten'
        });
      }
      
      if (symptoms.includes('mood_swings') || symptoms.includes('anxiety')) {
        recommendations.push({
          category: 'Mental balans',
          title: 'Stöd för humörsvängningar',
          description: 'Prata med vänner, familj eller en professionell. Regelbunden motion och sömn hjälper också.',
          source: 'Mindfulness Sverige'
        });
      }
      
      if (lifestyle.includes('stress')) {
        recommendations.push({
          category: 'Mental balans',
          title: 'Stresshantering',
          description: 'Lär dig andningsövningar, meditation eller yoga. Ta pauser under dagen och prioritera vila.',
          source: '1177.se'
        });
      }
      
      if (lifestyle.includes('exercise')) {
        recommendations.push({
          category: 'Rörelse & aktivitet',
          title: 'Regelbunden motion',
          description: 'Sträva efter 150 minuter måttlig aktivitet per vecka. Promenader, cykling eller dans är bra alternativ.',
          source: 'Folkhälsomyndigheten'
        });
      }
      
      if (lifestyle.includes('relationships')) {
        recommendations.push({
          category: 'Relationer & socialt',
          title: 'Stärk dina relationer',
          description: 'Prata öppet med partner och familj om dina behov. Sök stöd från vänner eller stödgrupper.',
          source: '1177.se'
        });
      }
    }
    
    return recommendations;
  };

  const resetAssessment = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
    setAssessmentResults(null);
    setIsDailyAssessment(false);
  };

  const startDailyAssessment = () => {
    setIsDailyAssessment(true);
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const startInitialAssessment = () => {
    setIsDailyAssessment(false);
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const startDemoMode = () => {
    setIsDemoMode(true);
    setIsDailyAssessment(true);
    setDemoDay(1);
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
    setHistoricalData([]);
  };

  const nextDemoDay = () => {
    if (demoDay < 7) {
      setDemoDay(demoDay + 1);
      setCurrentStep(0);
      setAnswers({});
      setShowResults(false);
    } else {
      // Efter 7 dagar, visa feedback-frågor
      setShowFeedback(true);
    }
  };

  const handleFeedback = (tipId, tried, helpful) => {
    setFeedbackData(prev => ({
      ...prev,
      [tipId]: { tried, helpful }
    }));
  };

  const submitFeedback = () => {
    // Simulera att spara feedback och justera rekommendationer
    alert('Tack för din feedback! Dina rekommendationer kommer att förbättras baserat på vad som fungerar bäst för dig.');
    setShowFeedback(false);
    setIsDemoMode(false);
    setDemoDay(1);
    setHistoricalData([]);
  };

  if (showResults && assessmentResults) {
    return (
      <div className="assessment-results">
        <div className="results-header">
          <h2>{isDailyAssessment ? 'Din dagliga självskattning' : 'Dina självskattningsresultat'}</h2>
          <p className="report-id">Rapport ID: {assessmentResults.reportId}</p>
          <p className="timestamp">Datum: {assessmentResults.timestamp}</p>
        </div>

        <div className="results-summary">
          <div className={`risk-level ${assessmentResults.riskLevel}`}>
            <h3>Risknivå: {assessmentResults.riskLevel.toUpperCase()}</h3>
            <p>
              {assessmentResults.riskLevel === 'hög' && 'Vi rekommenderar att du kontaktar en vårdgivare för stöd.'}
              {assessmentResults.riskLevel === 'måttlig' && 'Fortsätt med dina nuvarande strategier och överväg professionell rådgivning.'}
              {assessmentResults.riskLevel === 'låg' && 'Bra jobbat! Fortsätt med dina hälsosamma vanor.'}
            </p>
          </div>
        </div>

        {isDailyAssessment && (
          <div className="daily-scores">
            <h3>Dina dagliga poäng</h3>
            <div className="score-grid">
              {Object.entries(assessmentResults.symptomProfile).map(([key, value]) => (
                <div key={key} className="score-item">
                  <span className="score-label">
                    {key === 'hot_flashes' && 'Hettflusher'}
                    {key === 'sleep_quality' && 'Sömnkvalitet'}
                    {key === 'mood_anxiety' && 'Humör/Oro'}
                    {key === 'energy_level' && 'Energi'}
                    {key === 'intimacy' && 'Intimitet'}
                    {key === 'concentration' && 'Koncentration'}
                  </span>
                  <div className="score-bar">
                    <div 
                      className="score-fill" 
                      style={{ width: `${(value / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className="score-value">{value}/5</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="recommendations">
          <h3>Personliga råd för dig</h3>
          {assessmentResults.recommendations.map((rec, index) => (
            <div key={index} className={`recommendation ${rec.category.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="recommendation-header">
                <h4>{rec.title}</h4>
                <span className="category-badge">{rec.category}</span>
              </div>
              <p>{rec.description}</p>
              <p className="source">Källa: {rec.source}</p>
            </div>
          ))}
        </div>

        {isDemoMode && (
          <div className="demo-progress">
            <h3>Demo: Dag {demoDay} av 7</h3>
            <div className="progress-dots">
              {Array.from({ length: 7 }, (_, i) => (
                <span 
                  key={i} 
                  className={`dot ${i < demoDay ? 'completed' : i === demoDay - 1 ? 'current' : 'pending'}`}
                />
              ))}
            </div>
            <p>Efter 7 dagar får du frågor om vilka tips som fungerade bäst för dig!</p>
          </div>
        )}

        {historicalData.length > 0 && (
          <div className="historical-data">
            <h3>Din utveckling över tid</h3>
            <div className="progress-chart">
              {historicalData.map((entry, index) => (
                <div key={index} className="chart-day">
                  <div className="day-label">Dag {entry.day}</div>
                  <div className="day-scores">
                    {Object.entries(entry.scores).map(([key, value]) => (
                      <div key={key} className="mini-score">
                        <span className="score-name">
                          {key === 'hot_flashes' && 'H'}
                          {key === 'sleep_quality' && 'S'}
                          {key === 'mood_anxiety' && 'M'}
                          {key === 'energy_level' && 'E'}
                          {key === 'intimacy' && 'I'}
                          {key === 'concentration' && 'K'}
                        </span>
                        <div className="mini-bar">
                          <div 
                            className="mini-fill" 
                            style={{ height: `${(value / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="results-actions">
          {isDemoMode ? (
            <button className="next-day-btn" onClick={nextDemoDay}>
              {demoDay < 7 ? 'Nästa dag' : 'Slutför demo'}
            </button>
          ) : (
            <>
              <button className="download-report-btn">
                Ladda ner rapport
              </button>
              <button className="new-assessment-btn" onClick={resetAssessment}>
                Ny självskattning
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // Feedback system
  if (showFeedback) {
    return (
      <div className="feedback-system">
        <div className="feedback-header">
          <h2>Vilka tips provade du? Hur fungerade det?</h2>
          <p>Efter 7 dagar med daglig självskattning vill vi veta vad som fungerade bäst för dig.</p>
        </div>
        
        <div className="feedback-questions">
          {historicalData.flatMap(entry => entry.recommendations).map((rec, index) => (
            <div key={index} className="feedback-question">
              <h4>{rec.title}</h4>
              <p>{rec.description}</p>
              <div className="feedback-options">
                <label>
                  <input 
                    type="checkbox" 
                    onChange={(e) => handleFeedback(index, e.target.checked, feedbackData[index]?.helpful || false)}
                  />
                  Jag provade detta tips
                </label>
                {feedbackData[index]?.tried && (
                  <div className="helpfulness">
                    <label>Hur hjälpsamt var det?</label>
                    <select onChange={(e) => handleFeedback(index, true, e.target.value)}>
                      <option value="">Välj...</option>
                      <option value="very-helpful">Mycket hjälpsamt</option>
                      <option value="somewhat-helpful">Ganska hjälpsamt</option>
                      <option value="not-helpful">Inte särskilt hjälpsamt</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="feedback-actions">
          <button className="submit-feedback-btn" onClick={submitFeedback}>
            Skicka feedback
          </button>
        </div>
      </div>
    );
  }

  // Show assessment type selection only when no assessment type is chosen
  if (!isDailyAssessment && !showResults && currentStep === 0 && Object.keys(answers).length === 0) {
    return (
      <div className="assessment-start">
        <div className="start-header">
          <h2>Välkommen till din självskattning</h2>
          <p>Välj vilken typ av självskattning du vill göra:</p>
        </div>
        
        <div className="assessment-options">
          <div className="option-card demo-card" onClick={startDemoMode}>
            <h3>🎯 Demo: 7-dagars resa</h3>
            <p>Se hur appen fungerar över tid med simulerad data</p>
            <ul>
              <li>7 dagar av dagliga skattningar</li>
              <li>Personliga råd som förbättras</li>
              <li>Feedback-system som lär sig</li>
              <li>Historik och utveckling</li>
            </ul>
            <button className="start-btn demo-btn">Starta demo</button>
          </div>
          
          <div className="option-card" onClick={startDailyAssessment}>
            <h3>Daglig självskattning</h3>
            <p>Snabb daglig koll på ditt mående (under 1 minut)</p>
            <ul>
              <li>6 enkla frågor + fritext</li>
              <li>Personliga råd direkt</li>
              <li>Spåra din utveckling</li>
            </ul>
            <button className="start-btn">Starta daglig skattning</button>
          </div>
          
          <div className="option-card" onClick={startInitialAssessment}>
            <h3>Omfattande självskattning</h3>
            <p>Detaljerad bedömning av dina symptom och behov</p>
            <ul>
              <li>3 kategorier av frågor</li>
              <li>Personliga rekommendationer</li>
              <li>Rapport för vårdgivare</li>
            </ul>
            <button className="start-btn">Starta omfattande skattning</button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="self-assessment">
      <div className="assessment-header">
        <h2>{isDailyAssessment ? 'Daglig självskattning' : 'Självskattning'}</h2>
        <p>{isDailyAssessment ? 'En snabb koll på ditt mående idag' : 'Ta denna omfattande bedömning för att förstå dina symptom och få personliga rekommendationer'}</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="progress-text">Fråga {currentStep + 1} av {questions.length}</p>
      </div>

      <div className="question-container">
        <h3 className="question-title">{currentQuestion.question}</h3>
        
        <div className="question-options">
          {currentQuestion.type === 'scale' ? (
            <div className="scale-container">
              {Array.from({ length: currentQuestion.scale.max - currentQuestion.scale.min + 1 }, (_, i) => {
                const value = i + currentQuestion.scale.min;
                const label = currentQuestion.scale.labels[i];
                return (
                  <label key={value} className="scale-option">
                    <input
                      type="radio"
                      name={currentQuestion.id}
                      value={value}
                      checked={answers[currentQuestion.id] === value}
                      onChange={(e) => handleAnswerChange(currentQuestion.id, parseInt(e.target.value))}
                    />
                    <div className="scale-option-content">
                      <span className="scale-number">{value}</span>
                      <span className="scale-label">{label}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          ) : currentQuestion.type === 'text' ? (
            <textarea
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              placeholder={currentQuestion.placeholder}
              rows="3"
              className="text-input"
            />
          ) : (
            currentQuestion.options.map((option) => (
              <label key={option.value} className="option-label">
                <input
                  type={currentQuestion.type}
                  name={currentQuestion.id}
                  value={option.value}
                  checked={
                    currentQuestion.type === 'checkbox'
                      ? (answers[currentQuestion.id] || []).includes(option.value)
                      : answers[currentQuestion.id] === option.value
                  }
                  onChange={(e) => {
                    if (currentQuestion.type === 'checkbox') {
                      const currentValues = answers[currentQuestion.id] || [];
                      const newValues = e.target.checked
                        ? [...currentValues, option.value]
                        : currentValues.filter(v => v !== option.value);
                      handleAnswerChange(currentQuestion.id, newValues);
                    } else {
                      handleAnswerChange(currentQuestion.id, option.value);
                    }
                  }}
                />
                <span className="option-text">{option.label}</span>
              </label>
            ))
          )}
        </div>
      </div>

      <div className="assessment-navigation">
        <button
          className="nav-btn prev-btn"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Föregående
        </button>
        
        <button
          className="nav-btn next-btn"
          onClick={handleNext}
          disabled={
            currentQuestion.type === 'text' 
              ? false // Text input is optional
              : !answers[currentQuestion.id] || (Array.isArray(answers[currentQuestion.id]) && answers[currentQuestion.id].length === 0)
          }
        >
          {currentStep === questions.length - 1 ? 'Slutför skattning' : 'Nästa'}
        </button>
      </div>
    </div>
  );
};

export default SelfAssessment;