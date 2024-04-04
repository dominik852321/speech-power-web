import { Component } from '@angular/core';
import { Observable, concatMap, first, forkJoin, map, tap } from 'rxjs';
import { TranscriptionService } from '../../../shared/services/transcription.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../../shared/modules/material.module';
import { BasicModule } from '../../../shared/modules/basic.module';
import WaveSurfer from 'wavesurfer.js';

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
  public wavesurfer: WaveSurfer;
  public audioVisible = false;

  constructor(
    private transcriptionSerivce: TranscriptionService,
    private router: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.getTranscriptionList();
  }

  public get wavesurferState() {
    if (typeof this.wavesurfer == 'undefined') return false;
    return this.wavesurfer.isPlaying();
  }

  public getTranscriptionList(): void {
    this.router.params.pipe(first()).subscribe((params) => {
      this.getTranscription(params['id']);
    });
  }

  public getTranscription(id: string): void {
    this.transcriptionSerivce
      .getTranscribtionDetailsById(id)
      .pipe(
        first(),
        tap((details) => {
          this.transcriptionDetails = details;
          this.transcriptionDetails.transcriptionArray.unshift({
            sentence: null,
            offset: 0.0,
            speaker: null,
          });
        })
      )
      .subscribe();

    this.transcriptionSerivce
      .getTranscribtionAudioById(id)
      .pipe(
        first(),
        map((audio) => {
          this.transcriptionAudio = URL.createObjectURL(audio);
        })
      )
      .subscribe(() => this.createWavesurfer());
  }

  public createWavesurfer(): void {
    this.wavesurfer = WaveSurfer.create({
      container: '#wavesurfer',
      waveColor: '#e0e0e0',
      progressColor: '#d63384',
      url: this.transcriptionAudio,
      normalize: true,
    });

    this.wavesurfer.on('decode', () => {
      this.audioVisible = true;
    });

    this.wavesurfer.on('timeupdate', (currentTime: number) => {
      this.transcriptionDetails.transcriptionArray.forEach(
        (obj: { highlight: boolean }) => (obj.highlight = false)
      );

      const activeSentence = this.transcriptionDetails.transcriptionArray.find(
        (obj: { duration: number; offset: number }) =>
          currentTime > obj.duration && currentTime < obj.duration + obj.offset
      );

      activeSentence.highlight = true;
    });
  }

  public setTime(offset: number): void {
    if (typeof this.wavesurfer != 'undefined') {
      this.wavesurfer.pause();
      this.wavesurfer.setTime(offset);
    }
  }

  public playOrPause(): void {
    if (typeof this.wavesurfer != 'undefined') {
      this.wavesurfer.playPause();
    }
  }
}
