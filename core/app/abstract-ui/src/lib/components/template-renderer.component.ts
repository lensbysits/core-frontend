import { Component, EmbeddedViewRef, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";

@Component({
    selector: "lens-template-renderer",
    template: ''
})
export class TemplateRendererComponent implements OnInit, OnDestroy {
    @Input() template!: TemplateRef<any>;

    private view!: EmbeddedViewRef<any>;

    constructor(
        private viewContainerRef: ViewContainerRef
    ) { }

    ngOnInit(): void {
        this.view = this.viewContainerRef.createEmbeddedView(this.template);
    }

    ngOnDestroy(): void {
        this.view.destroy();
    }
}