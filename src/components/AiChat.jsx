import { useState, useRef, useEffect } from 'react';
import './AiChat.css';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// Phillmon's Knowledge Base
const SYSTEM_PROMPT = `You are Phillmon's AI assistant embedded in his personal portfolio website.
You answer questions about Phillmon in a friendly, professional, and enthusiastic way.
Keep answers concise (2-4 sentences max), engaging, and use emojis sparingly.
If asked something you do not know about Phillmon, say you will connect them with him directly.

Here is everything you know about Phillmon:

NAME: Phillmon Filmon Kiros
TITLE: Full Stack Engineer
LOCATION: Addis Ababa, Ethiopia
AVAILABILITY: Currently available for full-stack development projects and collaborations
EMAIL: phillipos1212@gmail.com
GITHUB: github.com/phillmona-dev
LINKEDIN: linkedin.com/in/filmon-kiros-a799252b0
EXPERIENCE: 2+ years of professional software engineering experience

TECH STACK:
- Backend: Java, Spring Boot, Spring AI, Microservices Architecture, REST APIs, JPA/Hibernate
- Frontend: React.js, Next.js, JavaScript ES6+, HTML5, CSS3
- Databases: PostgreSQL, MySQL, Redis
- DevOps & Cloud: Docker, Kubernetes, CI/CD, Observability, Cloud Deployment (AWS, GCP, Azure)
- Tools: Git, Docker, Kubernetes, IntelliJ IDEA, VS Code
- Specialties: Healthcare Tech, Insurance Systems, Enterprise Software, Interoperability HL7 FHIR, NHIA

KEY PROJECTS AND EXPERIENCE:
1. HealthConnect Provider System - Enterprise healthcare interoperability platform serving hospitals across Ethiopia. Built with Java Spring Boot microservices + React. Handles eligibility checks, claim submissions, and patient data exchange.
2. Pharmacy Management System Kenema - Full-featured pharmacy system with prescription management, compounding, inventory, and reporting. Used by multiple pharmacies in Addis Ababa.
3. Insurance Management System - End-to-end insurance platform handling policies, claims, and premium calculations.
4. Portfolio Website - This very website built with React + Vite.

STRENGTHS AND PERSONALITY:
- Passionate about building impactful enterprise software
- Healthcare tech expert with deep domain knowledge
- Strong communicator and team player
- Loves clean, maintainable code and microservices architecture
- Always eager to take on challenging, meaningful projects

QUICK FACTS:
- Serves millions of users across Ethiopia through his healthcare systems
- Open to remote opportunities worldwide
- Fluent in both backend and frontend - a true full-stack engineer
- Experience with real-world HL7 FHIR and NHIA integrations

When asked about hiring or working with Phillmon: Encourage them enthusiastically and direct them to contact via email or LinkedIn.
When asked about his projects: Give specific, impressive details.
When asked about his skills: Be confident and highlight his enterprise experience.`;

const SUGGESTIONS = [
  "What technologies does Phillmon use? 💻",
  "Tell me about his projects 🚀",
  "Is he available for hire? 🎯",
  "What makes him unique? ⭐",
  "How can I contact him? 📬",
];

async function askGemini(messages) {
  const contents = messages.map(function(m) {
    return {
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    };
  });

  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: contents,
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 300,
      },
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error ? err.error.message : 'Gemini API error');
  }

  const data = await res.json();
  const text = data.candidates &&
    data.candidates[0] &&
    data.candidates[0].content &&
    data.candidates[0].content.parts &&
    data.candidates[0].content.parts[0] &&
    data.candidates[0].content.parts[0].text;

  return text || "I couldn't fetch a response right now. Please try again!";
}

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey there! 👋 I'm Phillmon's AI assistant. Ask me anything about his skills, projects, or how to work with him!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [pulse, setPulse] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(function() {
    if (open) setPulse(false);
  }, [open]);

  useEffect(function() {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  useEffect(function() {
    if (open) {
      setTimeout(function() {
        if (inputRef.current) inputRef.current.focus();
      }, 300);
    }
  }, [open]);

  // Auto-resize input textarea to match content height
  useEffect(function() {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }
  }, [input]);

  const sendMessage = async function(text) {
    const userText = text || input.trim();
    if (!userText || loading) return;

    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const reply = await askGemini(newMessages);
      setMessages(function(prev) { return [...prev, { role: 'assistant', content: reply }]; });
    } catch (e) {
      const errMsg = "Oops! Something went wrong: " + e.message + ". Please try again.";
      setMessages(function(prev) { return [...prev, { role: 'assistant', content: errMsg }]; });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        className={`ai-fab${open ? ' ai-fab-open' : ''}${pulse ? ' ai-fab-pulse' : ''}`}
        onClick={function() { setOpen(function(o) { return !o; }); }}
        aria-label="Chat with AI"
        id="ai-chat-fab"
      >
        <span className="ai-fab-icon">
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <circle cx="9" cy="10" r="1" fill="currentColor" />
              <circle cx="12" cy="10" r="1" fill="currentColor" />
              <circle cx="15" cy="10" r="1" fill="currentColor" />
            </svg>
          )}
        </span>
        {!open && <span className="ai-fab-badge">AI</span>}
        {!open && pulse && <span className="ai-fab-ring" />}
      </button>

      {/* Chat Panel */}
      <div className={`ai-panel${open ? ' ai-panel-open' : ''}`} id="ai-chat-panel">
        {/* Header */}
        <div className="ai-panel-header">
          <div className="ai-header-left">
            <div className="ai-avatar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
              </svg>
            </div>
            <div className="ai-header-info">
              <span className="ai-header-name">Phillmon&apos;s AI</span>
              <span className="ai-header-status">
                <span className="ai-status-dot" />
                Powered by Gemini
              </span>
            </div>
          </div>
          <button
            className="ai-header-close"
            onClick={function() { setOpen(false); }}
            aria-label="Close chat"
            id="ai-chat-close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="ai-messages" id="ai-messages-area">
          {messages.map(function(msg, i) {
            return (
              <div key={i} className={`ai-msg ai-msg-${msg.role}`}>
                {msg.role === 'assistant' && (
                  <div className="ai-msg-avatar">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                )}
                <div className="ai-msg-bubble">
                  <p>{msg.content}</p>
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {loading && (
            <div className="ai-msg ai-msg-assistant">
              <div className="ai-msg-avatar">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="ai-msg-bubble ai-typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="ai-suggestions">
            {SUGGESTIONS.map(function(s, i) {
              return (
                <button
                  key={i}
                  className="ai-suggestion-chip"
                  onClick={function() { sendMessage(s); }}
                  id={`ai-suggestion-${i}`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        )}

        {/* Input */}
        <div className="ai-input-area">
          <div className="ai-input-wrap">
            <textarea
              ref={inputRef}
              className="ai-input"
              placeholder="Ask me anything about Phillmon..."
              value={input}
              onChange={function(e) { setInput(e.target.value); }}
              onKeyDown={handleKeyDown}
              rows={1}
              id="ai-chat-input"
            />
            <button
              className={`ai-send-btn${input.trim() && !loading ? ' ai-send-active' : ''}`}
              onClick={function() { sendMessage(); }}
              disabled={!input.trim() || loading}
              id="ai-send-btn"
              aria-label="Send message"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <p className="ai-input-hint">Press Enter to send · Shift+Enter for new line</p>
        </div>
      </div>
    </>
  );
}
