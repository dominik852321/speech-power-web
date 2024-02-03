import { Component, OnInit } from '@angular/core';
import { TranscriptionService } from '../../shared/services/transcription.service';

@Component({
  selector: 'app-transcription',
  standalone: true,
  imports: [],
  templateUrl: './transcription.component.html',
  styleUrl: './transcription.component.css',
})
export class TranscriptionComponent implements OnInit {
  public recordings: any[];

  constructor(private transcriptionService: TranscriptionService) {}

  public ngOnInit(): void {
    this.getTranscribedFiles();
  }

  public getTranscribedFiles(): void {
    this.transcriptionService.getTranscribedFiles().subscribe(console.log);
  }
}
