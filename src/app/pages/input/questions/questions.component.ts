import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { BasicModule } from '../../../shared/modules/basic.module';
import { forkJoin, map } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormService } from '../../../shared/services/form.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css',
  imports: [MaterialModule, BasicModule],
})
export class QuestionsComponent implements OnInit {
  public questions: string[];
  public keywords: string[];
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('questionsInput') questionsInput: ElementRef<HTMLInputElement>;
  @ViewChild('keywordInput') keywordInput: ElementRef<HTMLInputElement>;

  constructor(private formService: FormService) {}

  public ngOnInit(): void {
    this.getQuestionsAndKeyWords();
  }

  private getQuestionsAndKeyWords() {
    const questionsRequest = this.formService.getQuestions();
    const keywordsRequest = this.formService.getKeywords();

    forkJoin([questionsRequest, keywordsRequest])
      .pipe(
        map((result) => {
          const [questions, keywords] = result;
          this.questions = questions;
          this.keywords = keywords;
        })
      )
      .subscribe();
  }

  public submit(): void {
    // console.log(this.questions);
    // console.log(this.keywords)
    const keywordsRequest = this.formService.postKeywords(this.keywords);
    const questionsRequest = this.formService.postQuestions(this.questions);
    forkJoin([keywordsRequest, questionsRequest]).subscribe();
  }

  public addSpecialWord(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.keywords.push(value);
    }
    this.keywordInput.nativeElement.value = '';
  }

  public addQuestions(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.questions.push(value);
    }
    this.questionsInput.nativeElement.value = '';
  }

  public removeSpecialWord(word: string): void {
    const index = this.keywords.indexOf(word);
    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }

  public removeQuestions(questions: string): void {
    const index = this.questions.indexOf(questions);
    if (index >= 0) {
      this.questions.splice(index, 1);
    }
  }
}
