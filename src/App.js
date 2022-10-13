import "./App.css";
import { shuffle } from "lodash";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import { useState } from "react";

const quizQuestions = [
  {
    id: 1,
    prompt: "What is your name?",
    answer: "King Arthur",
    distractors: ["Sir Lancelot", "Sir Galahad", "Sir Robin"],
  },
  {
    id: 2,
    prompt: "What is your quest?",
    answer: "To seek the Holy Grail",
    distractors: ["Fame", "Fortune", "Love"],
  },
  {
    id: 3,
    prompt: "What is the air-speed velocity of an unladen swallow?",
    answer: "What do you mean? An African or European swallow?",
    distractors: ["24mph", "12mph", "18mph"],
  },
];

function App() {
  const [questions, setQuestions] = useState(quizQuestions);
  const quizTemplate = questions.map((question) => {
    return {
      ...question,
      options: shuffle([...question.distractors, question.answer]),
      response: "",
      isAnswered: false,
      isCorrect: false,
    };
  });
  const [quiz, setQuiz] = useState(quizTemplate);
  const isComplete = quiz
    .map((question) => question.isAnswered)
    .every((x) => x);
  const score = quiz.map((question) => question.isCorrect).filter((x) => x).length; 
  const answerQuestion = (id, response) => {
    const currentQuestion = quiz.find((question) => question.id === id);
    const isCorrect = currentQuestion.answer === response;
    const newQuiz = quiz.map((question) => {
      if (question.id === currentQuestion.id) {
        return {
          ...question,
          isCorrect,
          isAnswered: true,
        };
      } else {
        return question;
      }
    });
    setQuiz(newQuiz);
  };

  return (
    <div className="App">
      <h1>Quiz!</h1>
      {!isComplete ? (
        quiz.map((question) => (
          <MultipleChoiceQuestion
            key={question.id}
            question={question}
            respond={answerQuestion}
          />
        ))
      ) : (
        <p>"You finished! Your score is {score}</p>
      )}
    </div>
  );
}

export default App;
