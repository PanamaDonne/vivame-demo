import React, { useState } from 'react';
import './SelfAssessment.css';

const SelfAssessment = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState(null);

  const questions = [
    {
      id: 'age_group',
      question: 'What is your age group?',
      type: 'radio',
      options: [
        { value: 'under_30', label: 'Under 30' },
        { value: '30_35', label: '30-35' },
        { value: '36_40', label: '36-40' },
        { value: '41_45', label: '41-45' },
        { value: '46_50', label: '46-50' },
        { value: '51_55', label: '51-55' },
        { value: 'over_55', label: 'Over 55' }
      ]
    },
    {
      id: 'menopause_stage',
      question: 'Which best describes your current situation?',
      type: 'radio',
      options: [
        { value: 'premenopausal', label: 'Regular periods, no changes' },
        { value: 'perimenopausal', label: 'Irregular periods or early symptoms' },
        { value: 'menopausal', label: 'No periods for 12+ months' },
        { value: 'postmenopausal', label: 'Post-menopause (5+ years)' },
        { value: 'surgical', label: 'Surgical menopause (hysterectomy/oophorectomy)' },
        { value: 'unsure', label: 'Not sure' }
      ]
    },
    {
      id: 'symptoms',
      question: 'Which symptoms are you currently experiencing? (Select all that apply)',
      type: 'checkbox',
      options: [
        { value: 'hot_flashes', label: 'Hot flashes/night sweats' },
        { value: 'sleep_issues', label: 'Sleep disturbances' },
        { value: 'mood_changes', label: 'Mood swings or irritability' },
        { value: 'anxiety', label: 'Anxiety or depression' },
        { value: 'memory', label: 'Memory problems or brain fog' },
        { value: 'weight_gain', label: 'Weight gain or difficulty losing weight' },
        { value: 'libido', label: 'Decreased sex drive' },
        { value: 'vaginal_dryness', label: 'Vaginal dryness or discomfort' },
        { value: 'joint_pain', label: 'Joint pain or stiffness' },
        { value: 'hair_changes', label: 'Hair thinning or changes' },
        { value: 'skin_changes', label: 'Skin changes or dryness' },
        { value: 'fatigue', label: 'Fatigue or low energy' }
      ]
    },
    {
      id: 'symptom_severity',
      question: 'How would you rate the overall impact of your symptoms on your daily life?',
      type: 'radio',
      options: [
        { value: 'none', label: 'No impact' },
        { value: 'mild', label: 'Mild - occasionally bothersome' },
        { value: 'moderate', label: 'Moderate - affects daily activities' },
        { value: 'severe', label: 'Severe - significantly impacts quality of life' }
      ]
    },
    {
      id: 'current_treatments',
      question: 'Are you currently using any treatments or therapies? (Select all that apply)',
      type: 'checkbox',
      options: [
        { value: 'none', label: 'No current treatments' },
        { value: 'hrt', label: 'Hormone replacement therapy (HRT)' },
        { value: 'natural_supplements', label: 'Natural/herbal supplements' },
        { value: 'lifestyle_changes', label: 'Lifestyle changes (diet, exercise)' },
        { value: 'alternative_therapy', label: 'Alternative therapies (acupuncture, etc.)' },
        { value: 'medication', label: 'Other medications' },
        { value: 'counseling', label: 'Counseling or therapy' }
      ]
    },
    {
      id: 'support_system',
      question: 'How would you describe your current support system?',
      type: 'radio',
      options: [
        { value: 'excellent', label: 'Excellent - family, friends, and healthcare providers' },
        { value: 'good', label: 'Good - some support available' },
        { value: 'limited', label: 'Limited - minimal support' },
        { value: 'none', label: 'No support system' }
      ]
    },
    {
      id: 'health_goals',
      question: 'What are your primary health goals right now? (Select all that apply)',
      type: 'checkbox',
      options: [
        { value: 'symptom_relief', label: 'Relief from specific symptoms' },
        { value: 'better_sleep', label: 'Improve sleep quality' },
        { value: 'mood_stability', label: 'Stabilize mood and emotions' },
        { value: 'energy_levels', label: 'Increase energy levels' },
        { value: 'weight_management', label: 'Manage weight changes' },
        { value: 'bone_health', label: 'Maintain bone health' },
        { value: 'heart_health', label: 'Protect heart health' },
        { value: 'overall_wellness', label: 'Overall wellness and vitality' }
      ]
    },
    {
      id: 'clinic_interest',
      question: 'Are you interested in connecting with healthcare providers or clinics?',
      type: 'radio',
      options: [
        { value: 'yes_immediately', label: 'Yes, I need help now' },
        { value: 'yes_soon', label: 'Yes, within the next few months' },
        { value: 'maybe', label: 'Maybe, I\'m considering it' },
        { value: 'no', label: 'No, not at this time' }
      ]
    }
  ];

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
    // Calculate assessment results based on answers
    const results = {
      riskLevel: calculateRiskLevel(),
      symptomProfile: analyzeSymptoms(),
      recommendations: generateRecommendations(),
      clinicMatch: assessClinicNeed(),
      reportId: `VIV-${Date.now()}`,
      timestamp: new Date().toLocaleString()
    };
    
    setAssessmentResults(results);
    setShowResults(true);
  };

  const calculateRiskLevel = () => {
    const symptoms = answers.symptoms || [];
    const severity = answers.symptom_severity;
    const support = answers.support_system;
    
    let riskScore = 0;
    
    // Symptom count scoring
    riskScore += symptoms.length * 2;
    
    // Severity scoring
    if (severity === 'severe') riskScore += 10;
    else if (severity === 'moderate') riskScore += 6;
    else if (severity === 'mild') riskScore += 3;
    
    // Support system scoring
    if (support === 'none') riskScore += 5;
    else if (support === 'limited') riskScore += 3;
    
    if (riskScore >= 15) return 'high';
    if (riskScore >= 8) return 'moderate';
    return 'low';
  };

  const analyzeSymptoms = () => {
    const symptoms = answers.symptoms || [];
    const categories = {
      physical: ['hot_flashes', 'weight_gain', 'joint_pain', 'hair_changes', 'skin_changes', 'fatigue'],
      emotional: ['mood_changes', 'anxiety', 'memory'],
      sexual: ['libido', 'vaginal_dryness'],
      sleep: ['sleep_issues']
    };
    
    const profile = {};
    Object.keys(categories).forEach(category => {
      profile[category] = categories[category].filter(symptom => symptoms.includes(symptom));
    });
    
    return profile;
  };

  const generateRecommendations = () => {
    const recommendations = [];
    const symptoms = answers.symptoms || [];
    // const treatments = answers.current_treatments || []; // Available for future use
    
    if (symptoms.includes('hot_flashes')) {
      recommendations.push({
        type: 'lifestyle',
        title: 'Hot Flash Management',
        description: 'Consider cooling strategies, layered clothing, and avoiding triggers like spicy foods and alcohol.',
        resources: ['Hot Flash Management Guide', 'Cooling Products']
      });
    }
    
    if (symptoms.includes('sleep_issues')) {
      recommendations.push({
        type: 'lifestyle',
        title: 'Sleep Optimization',
        description: 'Establish a consistent sleep routine and create a cool, dark bedroom environment.',
        resources: ['Sleep Hygiene Checklist', 'Meditation Apps']
      });
    }
    
    if (symptoms.includes('mood_changes') || symptoms.includes('anxiety')) {
      recommendations.push({
        type: 'support',
        title: 'Emotional Support',
        description: 'Consider counseling, support groups, or stress management techniques.',
        resources: ['Support Groups', 'Mental Health Resources']
      });
    }
    
    if (answers.symptom_severity === 'severe' || answers.clinic_interest !== 'no') {
      recommendations.push({
        type: 'medical',
        title: 'Professional Consultation',
        description: 'Consider consulting with a menopause specialist or healthcare provider.',
        resources: ['Find a Specialist', 'Clinic Directory']
      });
    }
    
    return recommendations;
  };

  const assessClinicNeed = () => {
    const severity = answers.symptom_severity;
    const clinicInterest = answers.clinic_interest;
    const support = answers.support_system;
    
    if (clinicInterest === 'yes_immediately' || severity === 'severe') {
      return { priority: 'high', message: 'Immediate consultation recommended' };
    }
    if (clinicInterest === 'yes_soon' || severity === 'moderate') {
      return { priority: 'moderate', message: 'Consider scheduling consultation soon' };
    }
    if (support === 'none' || support === 'limited') {
      return { priority: 'moderate', message: 'Professional support could be beneficial' };
    }
    return { priority: 'low', message: 'Continue current approach' };
  };

  const resetAssessment = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
    setAssessmentResults(null);
  };

  const shareWithClinic = () => {
    // In a real app, this would integrate with the marketplace
    alert('Assessment report would be shared with selected clinic. This feature would integrate with the marketplace booking system.');
  };

  if (showResults && assessmentResults) {
    return (
      <div className="assessment-results">
        <div className="results-header">
          <h2>Your Self-Assessment Results</h2>
          <p className="report-id">Report ID: {assessmentResults.reportId}</p>
        </div>

        <div className="results-summary">
          <div className={`risk-level ${assessmentResults.riskLevel}`}>
            <h3>Risk Level: {assessmentResults.riskLevel.toUpperCase()}</h3>
            <p>{assessmentResults.clinicMatch.message}</p>
          </div>
        </div>

        <div className="symptom-profile">
          <h3>Symptom Profile</h3>
          <div className="symptom-categories">
            {Object.entries(assessmentResults.symptomProfile).map(([category, symptoms]) => (
              symptoms.length > 0 && (
                <div key={category} className="symptom-category">
                  <h4>{category.charAt(0).toUpperCase() + category.slice(1)} Symptoms</h4>
                  <ul>
                    {symptoms.map(symptom => (
                      <li key={symptom}>
                        {symptom.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            ))}
          </div>
        </div>

        <div className="recommendations">
          <h3>Personalized Recommendations</h3>
          {assessmentResults.recommendations.map((rec, index) => (
            <div key={index} className={`recommendation ${rec.type}`}>
              <h4>{rec.title}</h4>
              <p>{rec.description}</p>
              <div className="resources">
                <strong>Resources:</strong>
                <ul>
                  {rec.resources.map((resource, i) => (
                    <li key={i}>{resource}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="clinic-engagement">
          <h3>Clinic Engagement</h3>
          <div className={`clinic-priority ${assessmentResults.clinicMatch.priority}`}>
            <p><strong>Priority:</strong> {assessmentResults.clinicMatch.priority.toUpperCase()}</p>
            <p>{assessmentResults.clinicMatch.message}</p>
          </div>
          
          {assessmentResults.clinicMatch.priority !== 'low' && (
            <div className="clinic-actions">
              <button className="share-clinic-btn" onClick={shareWithClinic}>
                Share Report with Clinic
              </button>
              <button className="find-clinic-btn">
                Find Nearby Clinics
              </button>
            </div>
          )}
        </div>

        <div className="results-actions">
          <button className="download-report-btn">
            Download Report
          </button>
          <button className="new-assessment-btn" onClick={resetAssessment}>
            Take New Assessment
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="self-assessment">
      <div className="assessment-header">
        <h2>Menopause Self-Assessment</h2>
        <p>Take this comprehensive assessment to understand your symptoms and get personalized recommendations.</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="progress-text">Question {currentStep + 1} of {questions.length}</p>
      </div>

      <div className="question-container">
        <h3 className="question-title">{currentQuestion.question}</h3>
        
        <div className="question-options">
          {currentQuestion.options.map((option) => (
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
          ))}
        </div>
      </div>

      <div className="assessment-navigation">
        <button
          className="nav-btn prev-btn"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Previous
        </button>
        
        <button
          className="nav-btn next-btn"
          onClick={handleNext}
          disabled={!answers[currentQuestion.id] || (Array.isArray(answers[currentQuestion.id]) && answers[currentQuestion.id].length === 0)}
        >
          {currentStep === questions.length - 1 ? 'Complete Assessment' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default SelfAssessment;
