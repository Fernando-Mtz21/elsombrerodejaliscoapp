import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private quickNotificationTime: number = 1000;
  private normalNotificationTime: number = 5000;

  constructor(private toastrService: ToastrService) {}

  public showSuccess(message: string, title?: string, isQuick?: boolean): void {
    this.toastrService.success(message, title, {
      progressBar: true,
      newestOnTop: true,
      closeButton: false,
      timeOut: !isQuick
        ? this.normalNotificationTime
        : this.quickNotificationTime,
    });
  }

  public showError(message: string, title?: string, isQuick?: boolean): void {
    this.toastrService.error(message, title, {
      progressBar: true,
      newestOnTop: true,
      closeButton: false,
      timeOut: !isQuick
        ? this.normalNotificationTime
        : this.quickNotificationTime,
    });
  }

  public showWarning(message: string, title?: string, isQuick?: boolean): void {
    this.toastrService.warning(message, title, {
      progressBar: true,
      newestOnTop: true,
      closeButton: false,
      timeOut: !isQuick
        ? this.normalNotificationTime
        : this.quickNotificationTime,
    });
  }

  public showInfo(message: string, title?: string, isQuick?: boolean): void {
    this.toastrService.info(message, title, {
      progressBar: true,
      newestOnTop: true,
      closeButton: false,
      timeOut: !isQuick
        ? this.normalNotificationTime
        : this.quickNotificationTime,
    });
  }
}
