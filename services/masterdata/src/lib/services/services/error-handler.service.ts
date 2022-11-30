import { Injectable, OnDestroy } from "@angular/core";
import { DialogService } from "@lens/app-abstract-ui";
import { Subject, takeUntil } from "rxjs";
import { ErrorHandlerService as BaseErrorHandlerService } from "@lens/app-abstract";
import { ErrorDetailsComponent } from "../../components/error-details/error-details.component";

@Injectable()
export class ErrorHandlerService implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  constructor(errorHandlerService: BaseErrorHandlerService, dialogService: DialogService) {
    errorHandlerService.OnError.pipe(takeUntil(this.destroy$)).subscribe((error) => {
      console.error(error);
      dialogService.open(ErrorDetailsComponent, {
        header: "An error occurred",
        data: { error: error },
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
