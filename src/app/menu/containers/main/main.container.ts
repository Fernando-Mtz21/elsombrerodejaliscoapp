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
  left: string = 'HAPPY HOUR LEFT';
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
}
