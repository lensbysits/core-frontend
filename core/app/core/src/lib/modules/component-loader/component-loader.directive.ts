import { Directive, Input, Type, ViewContainerRef } from "@angular/core";

@Directive({
    selector: "[component-loader]"
})
export class ComponentLoaderDirective {
    @Input("component-loader") type!: Type<any>;
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