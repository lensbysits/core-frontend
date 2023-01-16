import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { InputTextareaComponent } from "./input-textarea.component";
import { InputTextareaModule } from "primeng/inputtextarea";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

const form: FormGroup = new FormGroup({
    textarea: new FormControl("", []),
});

export default {
    component: InputTextareaComponent,
    title: "Components/InputTextarea",
    decorators: [
        moduleMetadata({
            imports: [ InputTextareaModule, ReactiveFormsModule ]
        })
    ]
} as Meta

const Template: Story = args => ({
    template:  `<form [formGroup]="form">
                <lens-input-textarea
                    formControlName="textarea"
                    name="textarea"
                    [id]="id"
                    [placeholder]="placeholder">
                </lens-input-textarea>
                </form>`,
    props: {
        ...args,
        form: form
    }
});

export const Default = Template.bind({});
Default.args = {
    id: "foo",
    placeholder: "test"
}