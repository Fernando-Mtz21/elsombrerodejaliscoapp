import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpinnerService } from '@services/spinner.service';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Here it is possible to add headers in the request.

    // this.spinnerService.show();

    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        // Here the logic in case of success.
        if (event instanceof HttpResponse) {
          // this.spinnerService.hide();
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // this.spinnerService.hide();
        // Here the logic in case of error.
        return of();
      })
    );
  }
}
