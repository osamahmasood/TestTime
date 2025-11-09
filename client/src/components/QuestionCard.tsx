import { Question } from '@/data/questions';
import { Button } from '@/components/ui/button';

interface QuestionCardProps {
  question: Question;
  onAnswerSelect: (optionIndex: number) => void;
  showFeedback: boolean;
  feedbackCorrect: boolean;
  selectedAnswer: number | null;
  context: string;
}

export default function QuestionCard({
  question,
  onAnswerSelect,
  showFeedback,
  feedbackCorrect,
  selectedAnswer,
  context,
}: QuestionCardProps) {
  return (
    <div className="bg-slate-800/80 border border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm">
      {/* Context */}
      <div className="mb-6 p-4 bg-slate-900/50 border border-cyan-500/20 rounded">
        <p className="text-cyan-300/70 text-sm">{context}</p>
      </div>

      {/* Question */}
      <h2 className="text-xl font-bold text-cyan-300 mb-6">{question.question}</h2>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => onAnswerSelect(index)}
            disabled={showFeedback}
            className={`w-full text-left p-4 rounded border-2 transition-all duration-300 ${
              selectedAnswer === index
                ? feedbackCorrect
                  ? 'border-lime-500 bg-lime-500/10 text-lime-300 hover:bg-lime-500/10'
                  : 'border-red-500 bg-red-500/10 text-red-300 hover:bg-red-500/10'
                : showFeedback && index === question.correctAnswer
                ? 'border-lime-500 bg-lime-500/10 text-lime-300 hover:bg-lime-500/10'
                : 'border-cyan-500/30 bg-slate-900/50 text-cyan-300 hover:border-cyan-400 hover:bg-slate-900/80'
            }`}
            variant="outline"
          >
            <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
            {option}
          </Button>
        ))}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={`p-4 rounded border-2 ${
          feedbackCorrect
            ? 'border-lime-500/30 bg-lime-500/10'
            : 'border-red-500/30 bg-red-500/10'
        }`}>
          <div className="flex items-start gap-3">
            <span className="text-2xl">{feedbackCorrect ? '✓' : '✗'}</span>
            <div className="flex-1">
              <p className={`font-bold mb-2 ${feedbackCorrect ? 'text-lime-400' : 'text-red-400'}`}>
                {feedbackCorrect ? 'Correct!' : 'Incorrect'}
              </p>
              <p className={`text-sm ${feedbackCorrect ? 'text-lime-300' : 'text-red-300'}`}>
                {question.explanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
