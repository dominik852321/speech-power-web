import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { MaterialModule } from '../../modules/material.module';
import { BasicModule } from '../../modules/basic.module';

@Component({
  selector: 'app-form-criteria',
  standalone: true,
  imports: [MaterialModule, BasicModule, AsyncPipe],
  templateUrl: './form-criteria.component.html',
  styleUrl: '../../../pages/form/form.component.css',
})
export class FormCriteriaComponent {
  @Input() public form!: FormGroup;

  public separatorKeysCodes: number[] = [ENTER, COMMA];

  public allCriteria: string[] = [
    'Czy poinformował że rozmowa jest nagrywana?',
    'Czy przedstawił się z imienia i nazwiska?',
    'Czy zaoferował produkty?',
    'Czy zasugerował wizytę?',
    'Czy umówił na wizytę następną?',
  ];

  public criteria: string[] = [];
  public specialWords: string[] = [];

  public criteriaCtrl = new FormControl('');
  public filteredCriteria: Observable<string[]>;
  @ViewChild('criteriaInput') criteriaInput: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredCriteria = this.criteriaCtrl.valueChanges.pipe(
      startWith(null),
      map((criteria: string | null) =>
        criteria ? this._filterWithText(criteria) : this._filterWithoutText()
      )
    );
  }

  public addSpecialWord(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.specialWords.push(value);
    }
    event.chipInput!.clear();
  }

  public removeSpecialWord(word: string): void {
    const index = this.specialWords.indexOf(word);
    if (index >= 0) {
      this.specialWords.splice(index, 1);
    }
  }

  public addCriteria(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.criteria.push(value);
    }
    this.criteriaInput.nativeElement.value = '';
    this.criteriaCtrl.setValue(null);
  }

  public removeCriteria(criteria: string): void {
    const index = this.criteria.indexOf(criteria);
    if (index >= 0) {
      this.criteria.splice(index, 1);
    }
    this.criteriaCtrl.setValue(null);
  }

  public selectedCriteria(event: MatAutocompleteSelectedEvent): void {
    this.criteria.push(event.option.viewValue);
    this.criteriaInput.nativeElement.value = '';
    this.criteriaCtrl.setValue(null);
  }

  private _filterWithText(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allCriteria.filter(
      (criteria) =>
        criteria.toLowerCase().includes(filterValue) &&
        !this.criteria.includes(criteria)
    );
  }

  private _filterWithoutText(): string[] {
    return this.allCriteria.filter(
      (criteria) => !this.criteria.includes(criteria)
    );
  }
}
