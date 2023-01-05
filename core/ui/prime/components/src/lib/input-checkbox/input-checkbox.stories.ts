import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { InputCheckboxComponent } from "./input-checkbox.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

const form: FormGroup = new FormGroup({
    checkbox: new FormControl("", []),
});

export default {
    component: InputCheckboxComponent,
    title: "Components/InputCheckbox",
    decorators: [
        moduleMetadata({
            imports: [ FormsModule, ReactiveFormsModule ]
        })
    ]
} as Meta

const Template: Story = args => ({
    template:  `<form [formGroup]="form">
                <lens-input-checkbox
                    id="id"
                    formControlName="checkbox"
                    label="label">
                </lens-input-checkbox>
                </form>`,
    props: {
        ...args,
        form: form
    }
});

export const Default = Template.bind({});
Default.args = {
    id: "foo",
    label: "the checkbox to be checked"
}