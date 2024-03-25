import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranscriptionService } from '../services/transcription.service';
import { AuthService } from '../services/auth.service';
import { FileSizePipe } from '../pipes/file-size.pipe';
import { SecondsMinutesPipe } from '../pipes/seconds-minutes.pipe';
import { OffsetSecondsPipe } from '../pipes/offset-seconds.pipe';
import { FormService } from '../services/form.service';

@NgModule({
  imports:[ 
    FileSizePipe,
    SecondsMinutesPipe,
    OffsetSecondsPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileSizePipe,
    SecondsMinutesPipe,
    OffsetSecondsPipe
  ],
  providers: [FormService, TranscriptionService, AuthService],
})
export class BasicModule {}
