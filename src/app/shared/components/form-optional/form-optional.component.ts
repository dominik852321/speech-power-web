import { AfterContentInit, AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { BasicModule } from '../../modules/basic.module';
import { FormGroup } from '@angular/forms';



@Component({
  selector: 'app-form-optional',
  standalone: true,
  imports: [MaterialModule, BasicModule],
  templateUrl: './form-optional.component.html',
  styleUrl: '../../../pages/form/form.component.css'
})
export class FormOptionalComponent implements AfterContentInit {
  @Input() public form!: FormGroup;
  public optionalInfoList: string[] = ["Nastrój rozmówcy", "Chęć klienta do rozmowy", "Typ klienta"]

   constructor() {
   }

  public ngAfterContentInit(): void {
    this.form?.get('optionalFormGroup')?.get('optionalInfo')?.setValue(this.optionalInfoList[0]);
  }
}
