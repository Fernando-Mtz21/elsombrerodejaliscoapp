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

  //   startCountdown(): void {
  //     this.updateTimeLeft();

  //     this.intervalId = setInterval(() => {
  //       this.updateTimeLeft();
  //     }, 1000);
  //   }

  //   setNextHH(now: Date): void {

  //   }

  //   updateTimeLeft(): void {
  //     const now = new Date();
  //     const day = now.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado

  //     if(day < 1 || day > 4){
  //       // Ain't no HH rn
  //       // Lookin' 4 next HH
  //       this.setNextHH(now);
  //     }

  //     let nextHappyHourStart: Date = new Date(now);
  //     nextHappyHourStart.setHours(14, 0, 0, 0); // 2:00 p.m.

  //     if (now < nextHappyHourStart){
  //       // It's gonna be today, but it's not time yet.
  //     }

  //     let nextHappyHourEnd: Date = new Date(now);
  //     nextHappyHourEnd.setHours(19, 0, 0, 0); // 7:00 p.m.

  //     if (now > nextHappyHourEnd){
  //       // A'ight boys, fun time's over.
  //       // Lookin' 4 next HH
  //       this.setNextHH(now)
  //     }

  //     // It's fun time!
  //     this.isItHH = true;

  //     this.hoursForHh = '00';
  //     this.minutesForHh = '00';
  //     this.secondsForHh = '00';

  //     if (day >= 1 && day <= 4) {
  //       // Lunes a jueves
  //       if (now < nextHappyHourStart) {
  //         const diff = nextHappyHourStart.getTime() - now.getTime();
  //         this.timeLeft = this.formatTime(diff);
  //       } else if (now >= nextHappyHourStart && now <= nextHappyHourEnd) {
  //         this.timeLeft = '00h 00m 00s 🍹 ¡Estamos en Hora Feliz!';
  //       } else {
  //         // Después de las 7:00 p.m., buscar siguiente día válido
  //         const tomorrow = new Date(now);
  //         tomorrow.setDate(now.getDate() + 1);
  //         this.setNextValidHappyHour(tomorrow);
  //       }
  //     } else {
  //       // Viernes, sábado o domingo: buscar próximo lunes a las 2:00 p.m.
  //       const nextMonday = new Date(now);
  //       let daysToAdd = (8 - day) % 7;
  // if (daysToAdd === 0) {
  //   daysToAdd = 7;
  // }
  //       nextMonday.setDate(now.getDate() + daysToAdd);
  //       this.setNextValidHappyHour(nextMonday);
  //     }
  //   }

  //   setNextValidHappyHour(date: Date): void {
  //     date.setHours(14, 0, 0, 0); // 2:00 p.m. del día siguiente
  //     const now = new Date();
  //     const diff = date.getTime() - now.getTime();
  //     this.timeLeft = this.formatTime(diff);
  //   }

  //   formatTime(ms: number): string {
  //     const totalSeconds = Math.floor(ms / 1000);
  //     const hours = Math.floor(totalSeconds / 3600);
  //     const minutes = Math.floor((totalSeconds % 3600) / 60);
  //     const seconds = totalSeconds % 60;

  //     return `Faltan ${this.pad(hours)}h ${this.pad(minutes)}m ${this.pad(seconds)}s para la Hora Feliz 🍻`;
  //   }

  //   pad(n: number): string {
  //     return n < 10 ? '0' + n : '' + n;
  //   }
}
