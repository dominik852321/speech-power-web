import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MaterialModule } from '../../shared/modules/material.module';
import { FormRecordingsComponent } from "../../shared/components/form-recordings/form-recordings.component";
import { FormCriteriaComponent } from "../../shared/components/form-criteria/form-criteria.component";
import { FormOptionalComponent } from "../../shared/components/form-optional/form-optional.component";
import { BasicModule } from '../../shared/modules/basic.module';

@Component({
    selector: 'app-form',
    standalone: true,
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { displayDefaultIndicatorType: false },
        },
    ],
    templateUrl: './form.component.html',
    styleUrl: './form.component.css',
    imports: [
        MaterialModule,
        BasicModule,
        FormRecordingsComponent,
        FormCriteriaComponent,
        FormOptionalComponent
    ]
})
export class FormComponent implements OnInit {
  public mainFormGroup!: FormGroup;

  constructor() {
      this.mainFormGroup = new FormGroup({
        fileFormGroup: new FormGroup({
          mp3Files: new FormControl([], Validators.required),
        }),
        inputFormGroup: new FormGroup({
          selectedCriteria: new FormControl([], Validators.required),
          specialWords: new FormControl ([], Validators.required),
        }),
        optionalFormGroup: new FormGroup({
          optionalInfo: new FormControl([], Validators.required),
        })
      });
  }

  public ngOnInit(): void {
    // this.createFormGroups();
  }

  public submit(): void {
    console.log(this.mainFormGroup.value);
  }
}
