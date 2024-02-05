import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { TranscriptionService } from '../../shared/services/transcription.service';
import { Observable } from 'rxjs';
import { BasicModule } from '../../shared/modules/basic.module';
import { FileSizePipe } from '../../shared/pipes/file-size.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transcription',
  standalone: true,
  imports: [MaterialModule, BasicModule, FileSizePipe],
  templateUrl: './transcription.component.html',
  styleUrl: './transcription.component.css',
})
export class TranscriptionComponent implements OnInit {
  public transcriptions$: Observable<any[]>;
  constructor(private transcriptionSerivce: TranscriptionService, private router: Router) {}

  public ngOnInit(): void {
    this.getTranscriptionList();
  }

  public getTranscriptionList(): void {
    this.transcriptions$ = this.transcriptionSerivce.getTranscribtions();
  }

  public deleteAll(): void {

  }

  public navigateToDetails(id: string): void {
    this.router.navigate(['/transcription/details', id]);
  }
}
