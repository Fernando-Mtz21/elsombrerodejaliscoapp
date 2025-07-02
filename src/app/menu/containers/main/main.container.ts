import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { HappyHourService } from '@services/happy-hour.service';
import { MenuService } from '@services/menu.service';
import { SpinnerService } from '@services/spinner.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.container.html',
  styleUrl: './main.container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContainer implements OnInit, OnDestroy {
  menu: any[] = [];

  hoursForHh: string = '00';
  minutesForHh: string = '00';
  secondsForHh: string = '00';

  timeForHH: string = '00:00:00';

  isItHH: boolean = false;

  nextHH: Date | null = null;

  intervalId: any;

  constructor(
    private menuService: MenuService,
    private router: Router,
    private spinnerService: SpinnerService,
    private hhservice: HappyHourService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.spinnerService.show();

    this.hhservice.ngOnInit();

    this.hhservice.timeForHappyHour.subscribe((value) => {
      this.timeForHH = value;
      this.cdr.detectChanges();
    });

    this.menuService.getMenu().subscribe({
      next: (menu) => {
        this.menu = menu;
        console.log('Mneu: ', this.menu);
      },
      complete: () => {
        timer(1000).subscribe(() => {
          this.spinnerService.hide();
        });
      },
    });
  }

  ngOnDestroy(): void {
    this.hhservice.ngOnDestroy();
  }

  seeProducts(items: any[]): void {
    this.router.navigate(['/Products'], { state: { items } });
  }
}
