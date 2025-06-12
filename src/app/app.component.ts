import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerService } from '@services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public title: string = 'angular-base-template';
  protected isLoading: boolean = false;
  private languages: string[] = ['en', 'es'];

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private spinnerService: SpinnerService,
    private translateService: TranslateService
  ) {}

  public ngOnInit(): void {
    this.spinnerService.isLoading$.subscribe((value: boolean) => {
      this.isLoading = value;
      this.changeDetectionRef.markForCheck();
    });

    const language: string = navigator.language || 'en';
    let languageCode: string = language.split('-')[0];

    if (!this.languages.includes(languageCode)) {
      languageCode = this.languages[0];
    }

    if (!this.translateService.defaultLang?.length) {
      this.translateService.setDefaultLang(languageCode);
      this.translateService.use(languageCode);
    }
  }
}
