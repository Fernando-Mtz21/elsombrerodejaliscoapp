import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { NotificationService } from '@services/notification.service';

@Injectable({ providedIn: 'root' })
export class PushService {
  constructor(private notificationService: NotificationService) {}

  public async init(): Promise<void> {
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    let permission = await PushNotifications.checkPermissions();

    if (permission.receive === 'prompt') {
      permission = await PushNotifications.requestPermissions();
    }

    if (permission.receive !== 'granted') {
      return;
    }

    await PushNotifications.addListener('registration', (token: Token) => {
      // TODO: send token.value to the backend once the endpoint exists.
      console.info('Push registration token', token.value);
    });

    await PushNotifications.addListener('registrationError', (error) => {
      console.error(error);
    });

    await PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        this.notificationService.showInfo(
          notification.body ?? '',
          notification.title
        );
      }
    );

    await PushNotifications.register();
  }
}
