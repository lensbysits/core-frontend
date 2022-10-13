import { Directive, ElementRef, Input, OnInit } from "@angular/core";
import { UserContextService } from "@lens/app-abstract";

@Directive({
    selector: "[lens-has-role]"
})
export class HasRoleDirective implements OnInit {
    @Input("lens-has-role") public role!: string;

    constructor (
        private readonly element: ElementRef,
        private readonly userContextService: UserContextService
    ) { }

    public ngOnInit(): void {
        if (!this.userContextService.IsInRole(this.role)) {
            this.element.nativeElement.style.display = "none";
        }
    }
}