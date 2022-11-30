import { Observable } from "rxjs";

export interface DialogRef {
    onClose: Observable<any>;
    close(result?: any): void;
    destroy(): void;
}