import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { FileSizePipe } from '../../pipes/file-size.pipe';
import { BasicModule } from '../../modules/basic.module';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-recordings',
  standalone: true,
  imports: [
    MaterialModule,
    BasicModule,
    FileSizePipe
  ],
  templateUrl: './form-recordings.component.html',
  styleUrl: '../../../pages/form/form.component.css'
})
export class FormRecordingsComponent {
  @Input() public form!: FormGroup;

  public recordings: File[] = [];

  public onFileSelected(event: any) {
    this.recordings = event.files;
    if(this.recordings){
      this.form.get('fileFormGroup')?.patchValue({"mp3Files": this.recordings})
    }
    console.log(this.recordings);
  }
}
