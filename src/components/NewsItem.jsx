import React, { useState } from 'react';
import image from '../assets/news.jpg';

// 🧠 AI API URL (dynamic style)


const NewsItem = ({ title, description, src, url }) => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  // 🧠 Grog summary
  const getSummary = async () => {
  setLoading(true);

  try {
      console.log("API KEY:", import.meta.env.VITE_GROQ_API_KEY);
    const text = `${title || ""}. ${description || ""}`;

    const res = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },

        body: JSON.stringify({
          model: "llama-3.1-8b-instant",

          messages: [
            {
              role: "user",
              content: `Summarize this news in 2 short lines:\n${text}`,
            },
          ],
        }),
      }
    );

    const data = await res.json();

    console.log("GROQ RESPONSE:", data);

    const result =
      data?.choices?.[0]?.message?.content ||
      "No summary available";

    setSummary(result);

  } catch (error) {
    console.log(error);
    setSummary("Error generating summary");

  } finally {
    setLoading(false);
  }
};
  // 🔊 voice
  const speakSummary = () => {
    if (!summary) return;

    const speech = new SpeechSynthesisUtterance(summary);
    speech.lang = "en-US";

    window.speechSynthesis.speak(speech);
  };

  // ⛔ stop voice
  const stopVoice = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <div className="card bg-dark text-light h-100" style={{ maxWidth: "345px" }}>
      <img
        src={src ? src : image}
        className="card-img-top"
        alt="news"
      />

      <div className="card-body">
        <h5 className="card-title">
          {title?.slice(0, 50)}
        </h5>

        <p className="card-text">
          {description
            ? description.slice(0, 90)
            : "No description"}
        </p>

        {/* AI Summary */}
        <button
          onClick={getSummary}
          className="btn btn-info btn-sm me-2"
        >
          {loading ? "Thinking..." : "🧠 AI Summary"}
        </button>

        {/* Listen */}
        <button
          onClick={speakSummary}
          className="btn btn-success btn-sm me-2"
        >
          🔊 Listen
        </button>

        {/* Stop */}
        <button
          onClick={stopVoice}
          className="btn btn-danger btn-sm me-2"
        >
          ⛔ Stop
        </button>

        {/* Summary */}
        {summary && (
          <p className="text-warning small mt-2">
            🤖 {summary}
          </p>
        )}

        <a
          href={url}
          className="btn btn-primary btn-sm mt-2"
          target="_blank"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsItem;