import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { InputChipsComponent } from "./input-chips.component";
import { InputChipsModule } from "./input-chips.module";
import { action } from "@storybook/addon-actions";

const form: FormGroup = new FormGroup({
    chips: new FormControl("", []),
});


export default {
    component: InputChipsComponent,
    title: "Components/InputChips",
    decorators: [
        moduleMetadata({
            imports: [ InputChipsModule, BrowserAnimationsModule, ReactiveFormsModule ]
        })
    ]
} as Meta

const Template: Story = args => ({
    template:  `<form [formGroup]="form">
                <lens-input-chips
                    formControlName="chips"
                    name="chips"
                    [id]="id"
                    (search)="search($event)"
                    (remove)="remove($event)">
                </lens-input-chips>
                </form>`,
    props: {
        ...args,
        form: form,
        remove: action("remove"),
        search: action("search")
    }
});

export const Default = Template.bind({});
Default.args = {
    id: "foo"
}