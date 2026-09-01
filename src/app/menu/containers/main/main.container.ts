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
  labels: any = {}; 
  hoursForHh: string = '00';
  minutesForHh: string = '00';
  secondsForHh: string = '00';
  timeForHH: string = '00:00:00';
  left: string = 'LEFT FOR HAPPY HOUR';
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
 this.menuService.getLabels().subscribe({
    next: (res) => {
      this.labels = res;
    },
    error: (err) => console.error(err)
  });
this.spinnerService.show();
this.hhservice.ngOnInit();

this.hhservice.timeForHappyHour.subscribe((value) => {
  if (value === '00:00:00') {
    this.timeForHH = '¡Happy Hour!';
    this.left = '';
  } else {
    this.timeForHH = this.formatTimeWithDays(value);
    this.left = 'HAPPY HOUR LEFT';
  }
  this.cdr.detectChanges();
});

    this.menuService.getMenu().subscribe({
      next: (menu) => {
        this.menu = menu;
        console.log('Menu: ', this.menu);
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

  seeProducts(categories: any[]): void {
    const onlyOneCategory = categories?.length == 1;

    if(onlyOneCategory){
      this.router.navigate(['/Products'], {state: {products: categories[0].products}})
      return;
    }

    this.router.navigate(['/Categories'], { state: { categories } });
  }

  goToBar(): void {
    const barMenu = this.menu.find((item: any) =>
      item.name?.includes('+21') ||
      item.name?.toLowerCase().includes('drink')
    );
    if (barMenu) this.seeProducts(barMenu.categories);
  }

  goToMargaritas(): void {
    const barMenu = this.menu.find((item: any) =>
      item.name?.includes('+21') ||
      item.name?.toLowerCase().includes('drink')
    );
    const margaritasCategory = barMenu?.categories?.find((cat: any) =>
      cat.name?.toLowerCase().includes('margarita')
    );
    if (margaritasCategory) {
      this.router.navigate(['/Products'], {
        state: { products: margaritasCategory.products }
      });
    }
  }

    images: string[] = [
    'https://www.elsombrerodejalisco.com/images/camara/carrusel/1.jpg',
    'https://www.elsombrerodejalisco.com/images/camara/carrusel/2.jpg',
    'https://www.elsombrerodejalisco.com/images/camara/carrusel/3.jpg',
    'https://www.elsombrerodejalisco.com/images/camara/carrusel/4.jpg',
    'https://www.elsombrerodejalisco.com/images/camara/carrusel/5.jpg',
  ];

  formatTimeWithDays(timeStr: string): string {
  if (!timeStr) return '';

  const [hoursStr, minutesStr, secondsStr] = timeStr.split(':');

  const totalHours = parseInt(hoursStr, 10) || 0;
  const minutes = parseInt(minutesStr, 10) || 0;
  const seconds = parseInt(secondsStr, 10) || 0;

  const days = Math.floor(totalHours / 24);
  const remainingHours = totalHours % 24;

  if (days > 0) {
    const dayLabel = days === 1 ? '1 Day' : `${days} Days`;
        if (remainingHours === 0 && minutes === 0 && seconds === 0) {
      return dayLabel;
    }
    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${dayLabel} ${pad(remainingHours)}:${pad(minutes)}:${pad(seconds)}`;
  }
  return timeStr;
}
}
