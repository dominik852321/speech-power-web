import { Component } from '@angular/core';
import { Observable, concatMap, first, forkJoin, map, tap } from 'rxjs';
import { TranscriptionService } from '../../../shared/services/transcription.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../../shared/modules/material.module';
import { BasicModule } from '../../../shared/modules/basic.module';
import WaveSurfer from 'wavesurfer.js'

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
  public wavesurfer: any;

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

        this.wavesurfer = WaveSurfer.create({
          container: '#wavesurfer',
          waveColor: 'rgb(200, 0, 200)',
          progressColor: 'rgb(100, 0, 100)',
          url: this.transcriptionAudio, // TODO pobieranie bezpośrednio, będzie można dzięki temu wyświetlić loader
          normalize: true,
        })
    
        this.wavesurfer.on('click', () => {
          this.wavesurfer.playPause()
          //TODO lepsza obsługa, może przycisk
        })

        this.wavesurfer.on('timeupdate', (currentTime: number) => {
          this.transcriptionDetails.transcriptionArray.forEach((obj: { highlight: boolean; }) => obj.highlight = false);

          const activeSentence = this.transcriptionDetails.transcriptionArray.find((obj: { duration: number; offset: number; }) => 
            currentTime > obj.duration && currentTime < (obj.duration + obj.offset)
          )

          activeSentence.highlight = true;
        })
      })).subscribe();
    }

    setTime(offset: number): void {
      if(typeof(this.wavesurfer) != 'undefined')
      {
        this.wavesurfer.setTime(offset);
        this.wavesurfer.play();
      }
    }
}
