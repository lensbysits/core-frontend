import { Observable } from "rxjs";

export interface DialogRef {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClose: Observable<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    close(result?: any): void;
    destroy(): void;
}