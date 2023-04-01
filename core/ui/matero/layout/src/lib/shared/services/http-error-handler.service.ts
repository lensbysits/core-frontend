import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpErrorHandlerService as LensHttpErrorHandlerService } from "@lens/app-abstract";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class HttpErrorHandlerService extends LensHttpErrorHandlerService {
  constructor(private toast: ToastrService) { super(); }

	OnNotFound(error: HttpErrorResponse): void {
    console.log(error);
    this.toast.error(error.error.value ?? error.message, 'Data niet gevonden', { closeButton: true, progressBar: true, timeOut: 6000});
  }

	OnError(error: HttpErrorResponse): void {
    console.log(error);
    this.toast.error(error.error.message ?? error.message, 'Api fout', { closeButton: true, progressBar: true, timeOut: 6000});
  }
}
