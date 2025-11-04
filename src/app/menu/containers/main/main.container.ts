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
  left: string = 'HAPPY HOUR LEFT';
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
     if (value === '00:00:00') {
      this.timeForHH = '¡Happy Hour!';
      this.left = '';
    } else {
      this.timeForHH = value;
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
    this.router.navigate(['/Categories'], { state: { categories } });
  }
  //Cambiar por standard de Carrusel EX: images/carrusel/carrusel1.jpg
    images: string[] = [
    'https://www.elsombrerodejalisco.com/images/camara/cucumber.jpg',
    'https://www.elsombrerodejalisco.com/images/camara/lime.jpg',
    'https://www.elsombrerodejalisco.com/images/camara/mango.jpg',
    'https://www.elsombrerodejalisco.com/images/camara/strawberry.jpg',
    'https://www.elsombrerodejalisco.com/images/camara/sangria.jpg',
  ];

}
