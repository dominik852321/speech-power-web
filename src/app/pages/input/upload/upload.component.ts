import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MaterialModule } from '../../../shared/modules/material.module';
import { BasicModule } from '../../../shared/modules/basic.module';
import { FormService } from '../../../shared/services/form.service';

@Component({
  selector: 'app-form',
  standalone: true,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
  imports: [MaterialModule, BasicModule],
})
export class UploadComponent {
  public fileFormGroup: FormGroup;

  constructor(private formService: FormService) {
    this.fileFormGroup = new FormGroup({
      mp3Files: new FormControl([], Validators.required),
    });
  }

  public onFileSelected(event: any): void {
    if (event.files) {
      this.fileFormGroup.patchValue({ mp3Files: event.files });
    }
  }

  public submit(): void {
    // console.log(this.fileFormGroup.get('mp3Files')?.value);
    this.formService
      .uploadFiles(this.fileFormGroup.get('mp3Files')?.value)
      .subscribe();
  }
}
