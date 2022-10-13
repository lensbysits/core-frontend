import { Directive, ElementRef, Input, OnInit } from "@angular/core";
import { UserContextService } from "@lens/app-abstract";

@Directive({
    selector: "[lens-has-claim]"
})
export class HasClaimDirective implements OnInit {
    @Input("lens-has-claim") public claim!: string;

    constructor (
        private readonly element: ElementRef,
        private readonly userContextService: UserContextService
    ) { }

    public ngOnInit(): void {
        if (!this.userContextService.HasClaim(this.claim)) {
            this.element.nativeElement.style.display = "none";
        }
    }
}