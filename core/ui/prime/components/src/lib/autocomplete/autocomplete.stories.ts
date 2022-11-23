import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { AutoCompleteComponent } from "./autocomplete.component"
import { CalendarModule } from "primeng/calendar";
import { AutoCompleteModule } from "./autocomplete.module";

export default {
    component: AutoCompleteComponent,
    title: "Components/AutoComplete",
    decorators: [
        moduleMetadata({
            imports: [ AutoCompleteModule, BrowserAnimationsModule ]
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
    options: [
        { key: 1, value: "Item 1" },
        { key: 2, value: "Item 2" },
        { key: 3, value: "Item 3" },
        { key: 4, value: "Item 4" }
    ]
}