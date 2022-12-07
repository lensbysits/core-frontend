import { Directive, Input, OnInit, Type, ViewContainerRef } from "@angular/core";

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: "[component-loader]"
})
export class ComponentLoaderDirective implements OnInit {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Input("component-loader") type!: Type<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Input() args: any;

    constructor(
        private readonly viewContainerRef: ViewContainerRef
    ) { }

    ngOnInit() {
        const componentRef = this.viewContainerRef.createComponent(this.type);
        
        if (!this.args) {
            return;
        }

        Object.keys(this.args).forEach(key => {
            componentRef.instance[key] = this.args[key];
        });
    }
}