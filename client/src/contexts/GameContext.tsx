import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface GameState {
  playerName: string;
  currentSphere: 'biology' | 'chemistry' | 'physics' | null;
  currentQuestionIndex: number;
  score: number;
  startTime: number | null;
  endTime: number | null;
  answeredQuestions: {
    questionId: string;
    answered: boolean;
    correct: boolean;
  }[];
  sphereProgress: {
    biology: { completed: boolean; score: number };
    chemistry: { completed: boolean; score: number };
    physics: { completed: boolean; score: number };
  };
}

interface GameContextType {
  gameState: GameState;
  startGame: (playerName: string) => void;
  startSphere: (sphere: 'biology' | 'chemistry' | 'physics') => void;
  answerQuestion: (questionId: string, correct: boolean) => void;
  nextQuestion: () => void;
  completeSphere: (sphere: 'biology' | 'chemistry' | 'physics') => void;
  completeGame: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const initialGameState: GameState = {
  playerName: '',
  currentSphere: null,
  currentQuestionIndex: 0,
  score: 0,
  startTime: null,
  endTime: null,
  answeredQuestions: [],
  sphereProgress: {
    biology: { completed: false, score: 0 },
    chemistry: { completed: false, score: 0 },
    physics: { completed: false, score: 0 },
  },
};

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const startGame = (playerName: string) => {
    setGameState(prev => ({
      ...prev,
      playerName,
      startTime: Date.now(),
    }));
  };

  const startSphere = (sphere: 'biology' | 'chemistry' | 'physics') => {
    setGameState(prev => ({
      ...prev,
      currentSphere: sphere,
      currentQuestionIndex: 0,
    }));
  };

  const answerQuestion = (questionId: string, correct: boolean) => {
    setGameState(prev => {
      const newScore = correct ? prev.score + 10 : Math.max(0, prev.score - 5);
      return {
        ...prev,
        score: newScore,
        answeredQuestions: [
          ...prev.answeredQuestions,
          { questionId, answered: true, correct },
        ],
      };
    });
  };

  const nextQuestion = () => {
    setGameState(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
    }));
  };

  const completeSphere = (sphere: 'biology' | 'chemistry' | 'physics') => {
    setGameState(prev => ({
      ...prev,
      sphereProgress: {
        ...prev.sphereProgress,
        [sphere]: {
          completed: true,
          score: prev.score,
        },
      },
    }));
  };

  const completeGame = () => {
    setGameState(prev => ({
      ...prev,
      endTime: Date.now(),
    }));
  };

  const resetGame = () => {
    setGameState(initialGameState);
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        startGame,
        startSphere,
        answerQuestion,
        nextQuestion,
        completeSphere,
        completeGame,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}
