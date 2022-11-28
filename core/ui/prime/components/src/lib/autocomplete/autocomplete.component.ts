import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { InputBaseComponent } from "../input-base/input-base.component";

@Component({
    selector: "lens-autocomplete",
    templateUrl: "autocomplete.component.html",
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AutoCompleteComponent), multi: true }
    ]
})
export class AutoCompleteComponent extends InputBaseComponent implements OnInit {
    @Input() public options: { key: any, value: string }[] = [];

    public filteredOptions: { key: any, value: string }[] = [];

    public ngOnInit(): void {
        this.filteredOptions = this.options;
    }

    public onItemSelected(value: any): void {
        this.value = value;
        this.valueChanged();
    }

    public onSearched(event: any): void {
        this.filteredOptions = this.options.filter(option => option.value.toLowerCase().indexOf(event.query.toLowerCase()) >= 0);
    }
}