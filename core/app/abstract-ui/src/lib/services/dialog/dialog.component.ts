import { Component, TemplateRef, ViewChild } from "@angular/core";

@Component({
    template: ''
})
export abstract class DialogComponent {
    @ViewChild("body", { read: TemplateRef }) public bodyTemplate!: TemplateRef<any>;
    @ViewChild("footer", { read: TemplateRef }) public footerTemplate!: TemplateRef<any>;
}