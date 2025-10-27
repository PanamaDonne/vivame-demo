import React, { useState } from 'react';
import './QnAForm.css';

const QnAForm = () => {
  const [question, setQuestion] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      question: "Vilka är de mest effektiva naturliga botemedlen mot hettflusher?",
      answers: [
        {
          id: 1,
          text: "Jag har upptäckt att ha en fläkt i närheten och bära lagerkläder hjälper. Att undvika kryddig mat och alkohol på kvällen har också gjort stor skillnad för mig.",
          author: "Anna M.",
          timestamp: "2024-01-15 14:30",
          likes: 3
        },
        {
          id: 2,
          text: "Svart cohosh-kosttillskott fungerade bra för mig, men jag rekommenderar att prata med din läkare först. Regelbunden träning och att bibehålla en hälsosam vikt hjälper verkligen.",
          author: "Dr. Maria Andersson, ND",
          timestamp: "2024-01-15 16:45",
          likes: 7
        }
      ],
      timestamp: "2024-01-15 10:15",
      likes: 5
    },
    {
      id: 2,
      question: "Hur pratar jag med min partner om mina klimakteriesymptom?",
      answers: [
        {
          id: 3,
          text: "Jag tyckte det var hjälpsamt att förklara vad som händer med min kropp och hur det påverkar mig känslomässigt. Min partner uppskattade ärligheten och det förde oss närmare varandra.",
          author: "Karin R.",
          timestamp: "2024-01-14 09:20",
          likes: 4
        }
      ],
      timestamp: "2024-01-14 08:30",
      likes: 2
    },
    {
      id: 3,
      question: "Hur länge varar klimakteriet vanligtvis?",
      answers: [
        {
          id: 4,
          text: "Klimakteriet kan pågå i 2-10 år, men det varierar mycket mellan kvinnor. För mig varade det cirka 4 år innan jag slutade menstruera helt.",
          author: "Eva L.",
          timestamp: "2024-01-13 11:15",
          likes: 6
        },
        {
          id: 5,
          text: "Det är viktigt att komma ihåg att varje kvinnas upplevelse är unik. Vissa har milda symptom i några år, medan andra kan ha mer uttalade symptom under en längre period.",
          author: "Dr. Anna Lindqvist, MD",
          timestamp: "2024-01-13 15:30",
          likes: 8
        }
      ],
      timestamp: "2024-01-13 09:45",
      likes: 3
    }
  ]);
  const [answeringTo, setAnsweringTo] = useState(null);
  const [answerText, setAnswerText] = useState('');

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      const newQuestion = {
        id: Date.now(),
        question: question.trim(),
        answers: [],
        timestamp: new Date().toLocaleString(),
        likes: 0
      };
      setSubmissions([newQuestion, ...submissions]);
      setQuestion('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (answerText.trim() && answeringTo) {
      const newAnswer = {
        id: Date.now(),
        text: answerText.trim(),
        author: "You",
        timestamp: new Date().toLocaleString(),
        likes: 0
      };
      
      setSubmissions(submissions.map(sub => 
        sub.id === answeringTo 
          ? { ...sub, answers: [...sub.answers, newAnswer] }
          : sub
      ));
      
      setAnswerText('');
      setAnsweringTo(null);
    }
  };

  const handleLike = (id, isAnswer = false, questionId = null) => {
    if (isAnswer && questionId) {
      setSubmissions(submissions.map(sub => 
        sub.id === questionId 
          ? { 
              ...sub, 
              answers: sub.answers.map(ans => 
                ans.id === id ? { ...ans, likes: ans.likes + 1 } : ans
              )
            }
          : sub
      ));
    } else {
      setSubmissions(submissions.map(sub => 
        sub.id === id ? { ...sub, likes: sub.likes + 1 } : sub
      ));
    }
  };

  return (
    <div className="qa-container">
      <div className="qa-header">
        <h2>Gemenskapsfrågor & svar</h2>
        <p>Ställ frågor och få svar från gemenskapen</p>
      </div>

      <form className="qa-form" onSubmit={handleQuestionSubmit}>
        <div className="form-group">
          <label htmlFor="question">Ställ en fråga:</label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Vad skulle du vilja veta om klimakteriet, symptom, behandlingar eller upplevelser?"
            rows="3"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Skicka fråga
        </button>

        {submitted && (
          <div className="success-message">
            Tack för din fråga! Den har publicerats i gemenskapen.
          </div>
        )}
      </form>

      <div className="submissions-section">
        <h3>Gemenskapsfrågor & svar</h3>
        {submissions.length === 0 ? (
          <p className="no-posts">Inga frågor än. Var den första att ställa en fråga!</p>
        ) : (
          <div className="submissions-list">
            {submissions.map((submission) => (
              <div key={submission.id} className="submission-card">
                <div className="question-header">
                  <div className="question-meta">
                    <span className="timestamp">{submission.timestamp}</span>
                    <button 
                      className="like-btn"
                      onClick={() => handleLike(submission.id)}
                    >
                      ❤️ {submission.likes}
                    </button>
                  </div>
                </div>
                
                <div className="question-content">
                  <h4>Q: {submission.question}</h4>
                </div>

                <div className="answers-section">
                  <h5>Svar ({submission.answers.length})</h5>
                  {submission.answers.length === 0 ? (
                    <p className="no-answers">Inga svar än. Var den första att hjälpa!</p>
                  ) : (
                    <div className="answers-list">
                      {submission.answers.map((answer) => (
                        <div key={answer.id} className="answer-card">
                          <div className="answer-meta">
                            <span className="answer-author">{answer.author}</span>
                            <span className="answer-timestamp">{answer.timestamp}</span>
                            <button 
                              className="like-btn small"
                              onClick={() => handleLike(answer.id, true, submission.id)}
                            >
                              ❤️ {answer.likes}
                            </button>
                          </div>
                          <p className="answer-text">{answer.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {answeringTo === submission.id ? (
                    <form className="answer-form" onSubmit={handleAnswerSubmit}>
                      <textarea
                        value={answerText}
                        onChange={(e) => setAnswerText(e.target.value)}
                        placeholder="Dela ditt svar eller din upplevelse..."
                        rows="3"
                        required
                      />
                      <div className="answer-actions">
                        <button type="submit" className="submit-answer-btn">Publicera svar</button>
                        <button 
                          type="button" 
                          className="cancel-btn"
                          onClick={() => {
                            setAnsweringTo(null);
                            setAnswerText('');
                          }}
                        >
                          Avbryt
                        </button>
                      </div>
                    </form>
                  ) : (
                    <button 
                      className="answer-btn"
                      onClick={() => setAnsweringTo(submission.id)}
                    >
                      Svara på denna fråga
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QnAForm;
