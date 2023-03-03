import { Directive, ElementRef, Input, OnInit } from "@angular/core";
import { Claim, UserContextService } from "@lens/app-abstract";

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: "[lens-has-claim]"
})
export class HasClaimDirective implements OnInit {
    @Input("lens-has-claim") public claim!: Claim;

    constructor (
        private readonly element: ElementRef,
        private readonly userContextService: UserContextService
    ) { }

    public ngOnInit(): void {
        if (!this.userContextService.hasClaims(this.claim)) {
            this.element.nativeElement.style.display = "none";
        }
    }
}