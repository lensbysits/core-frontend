import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DropdownComponent } from "./dropdown.component";
import { DropdownModule } from "./dropdown.module";

describe("DropdownComponent", () => {
    beforeEach(() => {
        cy.mount(DropdownComponent, {
            componentProperties: {
                options: [
                    { value: 1, label: "Item 1" },
                    { value: 2, label: "Item 2" },
                    { value: 3, label: "Item 3" },
                    { value: 4, label: "Item 4" }
                ]
            },
            imports: [ DropdownModule, BrowserAnimationsModule ]
        });
    });

    it("should have four options", () => {
        cy.get(".p-dropdown-trigger").click();
        cy.pause();
        cy.get("p-dropdownitem").should("have.length", 4);
        cy.get("p-dropdownitem:nth-of-type(4)").click();
        cy.get(".p-dropdown-label").should("have.text", "Item 4");
    });
});