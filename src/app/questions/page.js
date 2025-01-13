"use client";
import axios from "axios";
import { useState } from "react";
import React from "react";

const Page = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [typingStartTime, setTypingStartTime] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState("");

  const questionSet = [
    {
      question: "How do you spend your time?",
    },
    {
      question:
        "If you could go on a dream vacation with someone special, where would it be and why?",
    },
    {
      question: "What's the most romantic thing someone has ever done for you?",
    },
    {
      question:
        "What's one thing you've learned about relationships that you think everyone should know?",
    },
  ];

  const handleTypingStart = () => {
    if (!typingStartTime) {
      setTypingStartTime(Date.now());
    }
  };

  const handleAnswerSubmit = async () => {
    const responseTime = Date.now() - typingStartTime;

    const updatedResponses = {
      ...responses,
      [currentQuestionIndex]: {
        question: questionSet[currentQuestionIndex].question,
        answer: currentAnswer,
        responseTime,
      },
    };

    // Update the responses state
    setResponses(updatedResponses);

    setCurrentAnswer("");
    setTypingStartTime(null);

    const nextIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextIndex);

    if (nextIndex === questionSet.length) {
      // Wait for responses to update before sending the final request
      await submitDataToBackend(updatedResponses);
    }
  };

  const submitDataToBackend = async (finalResponses) => {
    try {
      const response = await axios.post("/api/send-response", {
        responses: finalResponses,
      });
      console.log("Data submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const currentQuestion = questionSet[currentQuestionIndex];

  return (
    <div className="bg-gray-100 h-screen w-full flex items-center justify-center p-5">
      {currentQuestionIndex < questionSet.length ? (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4">
            Question {currentQuestionIndex + 1}/{questionSet.length}
          </h2>
          <p className="mb-4">{currentQuestion.question}</p>
          <textarea
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Type your answer here..."
            value={currentAnswer}
            onChange={(e) => {
              handleTypingStart();
              setCurrentAnswer(e.target.value);
            }}
          />
          <button
            className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600"
            onClick={handleAnswerSubmit}
          >
            Submit Answer
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-4">Thank You Cutie!</h2>
        </div>
      )}
    </div>
  );
};

export default Page;
