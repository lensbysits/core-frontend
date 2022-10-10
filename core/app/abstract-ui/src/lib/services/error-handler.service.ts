import { Injectable, OnDestroy } from '@angular/core';
import { ErrorHandlerService as BaseErrorHandlerService } from '@lens/app-abstract';
import { Subject, takeUntil } from 'rxjs';
import { DialogService } from '.';
import { ErrorDetailComponent } from '../components';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements OnDestroy {

  private readonly destroy$ = new Subject<void>();
  constructor(
    errorHandlerService: BaseErrorHandlerService,
    dialogService: DialogService) {
    errorHandlerService.OnError.pipe(
      takeUntil(this.destroy$)
    )
      .subscribe(error => {
        console.log(error);
        dialogService.open(ErrorDetailComponent, {});
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
