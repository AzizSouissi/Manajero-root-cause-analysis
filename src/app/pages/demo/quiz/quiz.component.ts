import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  comments:any = [];
  quiz = [
    {
      key: 1,
      question: "What is the primary purpose of an Ishikawa diagram?",
      responses: [
        { title: "Identify root causes of problems", status: true },
        { title: "Forecast future sales", status: false },
        { title: "Organize team meetings", status: false },
        { title: "Track project milestones", status: false }
      ]
    },
    {
      key: 2,
      question: "Which of the following is NOT typically included as a category in an Ishikawa diagram?",
      responses: [
        { title: "Materials", status: false },
        { title: "Methods", status: false },
        { title: "Manpower", status: false },
        { title: "Marketing", status: true }
      ]
    },
    {
      key: 3,
      question: "What is the first step in creating an Ishikawa diagram?",
      responses: [
        { title: "Identify the problem or effect", status: true },
        { title: "Brainstorm potential causes", status: false },
        { title: "Develop action plans", status: false },
        { title: "Conduct root cause analysis", status: false }
      ]
    },
    {
      key: 4,
      question: "In the Ishikawa diagram, what does the 'Fishbone' represent?",
      responses: [
        { title: "Causes of the problem", status: true },
        { title: "The problem itself", status: false },
        { title: "Solutions to the problem", status: false },
        { title: "Stakeholders involved", status: false }
      ]
    },
    {
      key: 5,
      question: "Which tool is commonly used in conjunction with the Ishikawa diagram to identify causes?",
      responses: [
        { title: "5 Whys", status: true },
        { title: "Pareto Chart", status: false },
        { title: "Gantt Chart", status: false },
        { title: "Flowchart", status: false }
      ]
    }
  ];

  score = 0;
  totalQuestions = 0;
  correctAnswers = 0;
  falseAnswers = 0;
  answers: { [key: number]: boolean } = {};
  quizCompleted = false;
  userId: any;

  constructor(private router: Router,
   
    private http:HttpClient,
  ) {}

  ngOnInit(): void {
    this.totalQuestions = this.quiz.length;
  }

  onAnswer(questionKey: number, status: boolean): void {
    this.answers[questionKey] = status;
  }


 
 
  

  submitQuiz(): void {
    this.correctAnswers = Object.keys(this.answers).reduce((score, key) => {
      const question = this.quiz.find(q => q.key === +key);
      const answer = this.answers[+key];
      return score + (question?.responses.find(r => r.status === answer)?.status ? 1 : 0);
    }, 0);

    this.falseAnswers = this.totalQuestions - this.correctAnswers;

    alert(`Your score is ${this.correctAnswers} out of ${this.totalQuestions}`);

    this.quizCompleted = true;
  }

}