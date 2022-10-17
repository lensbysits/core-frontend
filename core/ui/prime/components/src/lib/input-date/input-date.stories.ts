import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { InputDateComponent } from "./input-date.component";
import { CalendarModule } from "primeng/calendar";

export default {
    component: InputDateComponent,
    title: "Components/InputDate",
    decorators: [
        moduleMetadata({
            imports: [ CalendarModule, BrowserAnimationsModule ]
        })
    ]
} as Meta

const Template: Story = args => ({
    props: {
        ...args
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