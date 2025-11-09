import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { questions, sphereInfo } from '@/data/questions';
import QuestionCard from '@/components/QuestionCard';
import SphereSelector from '@/components/SphereSelector';

export default function GameScreen() {
  const { gameState, startSphere, answerQuestion, nextQuestion, completeSphere, completeGame } = useGame();
  const [, setLocation] = useLocation();
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackCorrect, setFeedbackCorrect] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Redirect if no player name
  useEffect(() => {
    if (!gameState.playerName) {
      setLocation('/game');
    }
  }, [gameState.playerName, setLocation]);

  // Get questions for current sphere
  const sphereQuestions = gameState.currentSphere
    ? questions.filter(q => q.sphere === gameState.currentSphere)
    : [];

  const currentQuestion = sphereQuestions[gameState.currentQuestionIndex];

  // Handle answer selection
  const handleAnswerSelect = (optionIndex: number) => {
    if (showFeedback) return;

    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    setSelectedAnswer(optionIndex);
    setFeedbackCorrect(isCorrect);
    setShowFeedback(true);

    answerQuestion(currentQuestion.id, isCorrect);
  };

  // Handle next question
  const handleNext = () => {
    if (gameState.currentQuestionIndex < sphereQuestions.length - 1) {
      nextQuestion();
      setShowFeedback(false);
      setSelectedAnswer(null);
    } else {
      // Sphere complete
      if (gameState.currentSphere) {
        completeSphere(gameState.currentSphere);
      }
      // Check if all spheres are complete
      const allComplete =
        gameState.sphereProgress.biology.completed &&
        gameState.sphereProgress.chemistry.completed &&
        gameState.sphereProgress.physics.completed;

      if (allComplete) {
        completeGame();
        setLocation('/complete');
      } else {
        // Return to sphere selector
        setLocation('/play');
      }
    }
  };

  // If no sphere selected, show sphere selector
  if (!gameState.currentSphere) {
    return <SphereSelector />;
  }

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  const sphereData = sphereInfo[gameState.currentSphere];
  const totalQuestions = sphereQuestions.length;
  const progressPercent = ((gameState.currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-72 h-72 bg-gradient-to-br ${sphereData.color} opacity-10 rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br ${sphereData.color} opacity-10 rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-cyan-300/60 text-sm">CURRENT MISSION</p>
              <h1 className="text-2xl font-bold text-cyan-300">
                {sphereData.icon} {sphereData.name}
              </h1>
            </div>
            <div className="text-right">
              <p className="text-cyan-300/60 text-sm">ENERGY UNITS</p>
              <p className="text-3xl font-bold text-lime-400">{gameState.score}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-slate-900/50 border border-cyan-500/20 rounded p-3">
            <div className="flex justify-between text-xs text-cyan-300/70 mb-2">
              <span>PROGRESS</span>
              <span>{gameState.currentQuestionIndex + 1}/{totalQuestions}</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${sphereData.color} transition-all duration-300`}
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <QuestionCard
          question={currentQuestion}
          onAnswerSelect={handleAnswerSelect}
          showFeedback={showFeedback}
          feedbackCorrect={feedbackCorrect}
          selectedAnswer={selectedAnswer}
          context={currentQuestion.context}
        />

        {/* Navigation */}
        {showFeedback && (
          <div className="mt-8">
            <Button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-3 rounded transition-all duration-300"
            >
              {gameState.currentQuestionIndex < totalQuestions - 1 ? 'NEXT QUESTION' : 'COMPLETE SPHERE'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
