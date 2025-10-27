import React, { useState } from 'react';
import './QnAForm.css';

const QnAForm = () => {
  const [question, setQuestion] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      question: "What are the most effective natural remedies for hot flashes?",
      answers: [
        {
          id: 1,
          text: "I've found that keeping a fan nearby and wearing layers helps. Also, avoiding spicy foods and alcohol in the evening has made a big difference for me.",
          author: "Sarah M.",
          timestamp: "2024-01-15 14:30",
          likes: 3
        },
        {
          id: 2,
          text: "Black cohosh supplements worked well for me, but I'd recommend talking to your doctor first. Also, regular exercise and maintaining a healthy weight really helps.",
          author: "Dr. Lisa Chen, ND",
          timestamp: "2024-01-15 16:45",
          likes: 7
        }
      ],
      timestamp: "2024-01-15 10:15",
      likes: 5
    },
    {
      id: 2,
      question: "How do I talk to my partner about my menopause symptoms?",
      answers: [
        {
          id: 3,
          text: "I found it helpful to explain what's happening to my body and how it affects me emotionally. My partner appreciated the honesty and it brought us closer together.",
          author: "Maria R.",
          timestamp: "2024-01-14 09:20",
          likes: 4
        }
      ],
      timestamp: "2024-01-14 08:30",
      likes: 2
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
        <h2>Community Q&A</h2>
        <p>Ask questions and get answers from the community</p>
      </div>

      <form className="qa-form" onSubmit={handleQuestionSubmit}>
        <div className="form-group">
          <label htmlFor="question">Ask a Question:</label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What would you like to know about menopause, symptoms, treatments, or experiences?"
            rows="3"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Ask Question
        </button>

        {submitted && (
          <div className="success-message">
            Thank you for your question! It has been posted to the community.
          </div>
        )}
      </form>

      <div className="submissions-section">
        <h3>Community Questions & Answers</h3>
        {submissions.length === 0 ? (
          <p className="no-posts">No questions yet. Be the first to ask!</p>
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
                  <h5>Answers ({submission.answers.length})</h5>
                  {submission.answers.length === 0 ? (
                    <p className="no-answers">No answers yet. Be the first to help!</p>
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
                        placeholder="Share your answer or experience..."
                        rows="3"
                        required
                      />
                      <div className="answer-actions">
                        <button type="submit" className="submit-answer-btn">Post Answer</button>
                        <button 
                          type="button" 
                          className="cancel-btn"
                          onClick={() => {
                            setAnsweringTo(null);
                            setAnswerText('');
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <button 
                      className="answer-btn"
                      onClick={() => setAnsweringTo(submission.id)}
                    >
                      Answer this question
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
