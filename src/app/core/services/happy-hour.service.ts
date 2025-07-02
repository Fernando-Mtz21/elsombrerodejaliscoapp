import { Injectable, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  interval,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HappyHourService implements OnInit, OnDestroy {
  private _isHappyHour: boolean = false;
  private stop$ = new Subject<void>();

  private empty: string = '00:00:00';
  private _timeForHappyHour: BehaviorSubject<string> =
    new BehaviorSubject<string>(this.empty);

  private _currentDay!: number;
  private _currentHour!: number;

  private _nextHappyHour!: Date;

  // public isHappyHour$: Observable<boolean> = this._isHappyHour.asObservable();
  public timeForHappyHour: Observable<string> =
    this._timeForHappyHour.asObservable();

  private pad = (n: number) => n.toString().padStart(2, '0');

  ngOnInit(): void {
    console.log('ONINIT HH');
    this.isHappyHour(new Date());

    interval(1000)
      .pipe(takeUntil(this.stop$))
      .subscribe(() => {
        console.log('INTERVAL');
        let elapsedTime: string = this.empty;

        if (!this.isHappyHour(new Date())) {
          elapsedTime = this.getTimeDifference(this._nextHappyHour, new Date());
          console.log('TIME ELAPSED', elapsedTime);
        }

        this._timeForHappyHour.next(elapsedTime);
      });
  }

  ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
    console.log('ONDESTROY HH');
  }

  private getTimeDifference(start: Date, end: Date): string {
    const diffMs = Math.abs(end.getTime() - start.getTime());

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  public isHappyHourv1(currentDate: Date): boolean {
    // L-J 2-7pm
    const day: number = currentDate.getDay();

    if (day === 0 || day > 4) {
      return false;
    }

    const hour: number = currentDate.getHours();

    if (hour < 14 || hour >= 19) {
      return false;
    }

    // Happy Hour
    return true;
  }

  public isHappyHour(currentDate: Date) {
    // L-J 2-7pm
    let nextHappyHour: Date = new Date(currentDate);
    const day: number = currentDate.getDay();

    if (day === 0) {
      // It's sunday. Set Next as tomorrow 2 p.m.
      nextHappyHour.setDate(currentDate.getDate() + 1);
      nextHappyHour.setHours(14, 0, 0, 0);
      this._nextHappyHour = nextHappyHour;

      return false;
    }

    if (day > 4) {
      // Between friday and saturday.
      const daysMore: number = day == 5 ? 3 : 2;
      nextHappyHour.setDate(currentDate.getDate() + daysMore);
      nextHappyHour.setHours(14, 0, 0, 0);
      this._nextHappyHour = nextHappyHour;

      return false;
    }

    const hour: number = currentDate.getHours();

    if (hour < 14) {
      // Set Next as today 2 p.m.
      nextHappyHour.setHours(14, 0, 0, 0);
      this._nextHappyHour = nextHappyHour;
      return false;
    }

    if (hour >= 19) {
      // Check next date.
      if (day > 0 && day < 4) {
        nextHappyHour.setDate(currentDate.getDate() + 1);
        nextHappyHour.setHours(14, 0, 0, 0);
        this._nextHappyHour = nextHappyHour;
      } else {
        const daysMoreLeft: number = day == 4 ? 2 : 3;
        nextHappyHour.setDate(currentDate.getDate() + daysMoreLeft);
        nextHappyHour.setHours(14, 0, 0, 0);
        this._nextHappyHour = nextHappyHour;
      }

      return false;
    }

    // Happy Hour
    return true;
  }
}
