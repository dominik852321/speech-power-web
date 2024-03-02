import { Component } from '@angular/core';
import { Observable, concatMap, first, forkJoin, map, tap } from 'rxjs';
import { TranscriptionService } from '../../../shared/services/transcription.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../../shared/modules/material.module';
import { BasicModule } from '../../../shared/modules/basic.module';
import { url } from 'inspector';

@Component({
  selector: 'app-transcription-details',
  standalone: true,
  imports: [MaterialModule, BasicModule],
  templateUrl: './transcription-details.component.html',
  styleUrl: './transcription-details.component.css',
})
export class TranscriptionDetailsComponent {
  public transcriptionDetails: any;
  public transcriptionAudio: string;

  constructor(
    private transcriptionSerivce: TranscriptionService,
    private router: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.getTranscriptionList();
  }

  public getTranscriptionList(): void {
    this.router.params.pipe(first()).subscribe((params) => {
      this.getTranscription(params['id']);
    });
  }

  public getTranscription(id: string): void {
      this.transcriptionSerivce.getTranscribtionDetailsById(id).pipe(first(), tap(details => {
        this.transcriptionDetails = details;
        this.transcriptionDetails.transcriptionArray.unshift({sentence: null, offset: 0.00, speaker: null});
      })).subscribe();

      this.transcriptionSerivce.getTranscribtionAudioById(id).pipe(first(), tap(audio => {
        this.transcriptionAudio = URL.createObjectURL(audio);
      })).subscribe();
  }

  // public navigateToDetails(id: string): void {
  //   this.router.navigate(['/transcription/details', id]);
  // }
}
