import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { InputDateComponent } from "./input-date.component";
import { InputDateModule } from "./input-date.module";

const form: FormGroup = new FormGroup({
    date: new FormControl("", []),
});

export default {
    component: InputDateComponent,
    title: "Components/InputDate",
    decorators: [
        moduleMetadata({
            imports: [ InputDateModule, BrowserAnimationsModule, ReactiveFormsModule ]
        })
    ]
} as Meta

const Template: Story = args => ({
    template:  `<form [formGroup]="form">
                <lens-input-date
                    formControlName="date"
                    name="date"
                    [id]="id"
                    [mode]="mode"
                    [placeholder]="placeholder">
                </lens-input-date>
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

export const DateTime = Template.bind({});
DateTime.args = {
    id: "foo",
    placeholder: "test",
    mode: "datetime"
}

export const Time = Template.bind({});
Time.args = {
    id: "foo",
    placeholder: "test",
    mode: "time"
}