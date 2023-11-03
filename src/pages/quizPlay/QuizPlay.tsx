import React, {FC} from "react";
import "./quizplay.scss";
import Quiz from "react-quiz-component";


const QuizPlay: FC = () => {

  return (
      <div  style={{display: "flex", justifyContent: "center", paddingTop: "50px"}}>
        <Quiz quiz={quiz} shuffle={true}/>
      </div>
  );
};

export default QuizPlay;
export const quiz = {
  "quizTitle": "QuizPlay sur la Cybersécurité",
  "quizSynopsis": "Testez vos connaissances en cybersécurité de base.",
  "nrOfQuestions": "4",
  "questions": [
    {
      "question": "Quel est le terme désignant un logiciel malveillant capable de se répliquer et de se propager à d'autres ordinateurs ?",
      "questionType": "text",
      "answerSelectionType": "single",
      "answers": [
        "Virus",
        "Firewall",
        "Chiffrement",
        "Phishing"
      ],
      "correctAnswer": "1",
      "messageForCorrectAnswer": "Réponse correcte. Bien joué !",
      "messageForIncorrectAnswer": "Réponse incorrecte. Veuillez réessayer.",
      "explanation": "Un virus informatique est un type de logiciel malveillant capable de se répliquer et de se propager à d'autres ordinateurs. Il peut causer différents types de dommages, tels que la corruption de données ou le vol d'informations.",
      "point": "20"
    },
    {
      "question": "Quelle est la pratique consistant à protéger les informations en les transformant en un format illisible ?",
      "questionType": "text",
      "answerSelectionType": "single",
      "answers": [
        "Firewall",
        "Déchiffrement",
        "Chiffrement",
        "Logiciel malveillant"
      ],
      "correctAnswer": "3",
      "messageForCorrectAnswer": "Réponse correcte. Bien joué !",
      "messageForIncorrectAnswer": "Réponse incorrecte. Veuillez réessayer.",
      "explanation": "Le chiffrement est le processus de conversion des informations ou des données en un code pour empêcher l'accès non autorisé. C'est une technique fondamentale en cybersécurité pour protéger les informations sensibles.",
      "point": "20"
    },
    {
      "question": "Quel est le terme désignant un e-mail ou un site Web trompeur qui trompe les utilisateurs pour qu'ils révèlent des informations sensibles, telles que des mots de passe ou des numéros de carte de crédit ?",
      "questionType": "text",
      "answerSelectionType": "single",
      "answers": [
        "Phishing",
        "Firewall",
        "Chiffrement",
        "Virus"
      ],
      "correctAnswer": "1",
      "messageForCorrectAnswer": "Réponse correcte. Bien joué !",
      "messageForIncorrectAnswer": "Réponse incorrecte. Veuillez réessayer.",
      "explanation": "Le phishing est une méthode d'attaque informatique où les attaquants utilisent des e-mails ou des sites Web trompeurs pour tromper les utilisateurs afin qu'ils révèlent des informations sensibles. Il est important de se méfier des tentatives de phishing.",
      "point": "20"
    },
    {
      "question": "Quel est le but principal d'un pare-feu en cybersécurité ?",
      "questionType": "text",
      "answerSelectionType": "single",
      "answers": [
        "Chiffrer les données",
        "Bloquer tout le trafic réseau",
        "Surveiller les performances du réseau",
        "Contrôler et filtrer le trafic réseau"
      ],
      "correctAnswer": "4",
      "messageForCorrectAnswer": "Réponse correcte. Bien joué !",
      "messageForIncorrectAnswer": "Réponse incorrecte. Veuillez réessayer.",
      "explanation": "Un pare-feu est un dispositif ou un logiciel de sécurité utilisé pour contrôler et filtrer le trafic réseau en fonction d'un ensemble de règles prédéfinies. Son objectif principal est de protéger un réseau contre les accès non autorisés et les menaces potentielles.",
      "point": "20"
    }
  ]
}

