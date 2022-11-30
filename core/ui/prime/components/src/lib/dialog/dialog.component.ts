import { Component, ViewContainerRef, OnInit, createEnvironmentInjector, EnvironmentInjector } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { DialogComponent as AbstractDialogComponent, DialogConfig, DialogRef } from "@lens/app-abstract-ui";

@Component({
    templateUrl: "dialog.component.html",
    styleUrls: [ "dialog.component.scss" ]
})
export class DialogComponent implements OnInit {
    public component!: AbstractDialogComponent;

    constructor(
        private readonly ref: DynamicDialogRef,
        public readonly config: DynamicDialogConfig,
        private readonly viewContainerRef: ViewContainerRef,
        private readonly environmentInjector: EnvironmentInjector
    ) { }

    public ngOnInit(): void {
        const newEnvironmentInjector = createEnvironmentInjector([
            { provide: "LensDialogRef", useValue: <DialogRef>this.ref},
            { provide: "LensDialogConfig", useValue: <DialogConfig>this.config},
        ], this.environmentInjector);
        const componentRef = this.viewContainerRef.createComponent(this.config.data.componentType, { environmentInjector: newEnvironmentInjector });
        this.component = componentRef.instance as AbstractDialogComponent
    }

    public onCloseClick() {
        this.ref.close();
    }
}