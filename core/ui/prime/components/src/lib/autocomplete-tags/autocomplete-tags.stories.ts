import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { AutoCompleteTagsComponent } from "./autocomplete-tags.component"
import { AutoCompleteTagsModule } from "./autocomplete-tags.module";

export default {
    component: AutoCompleteTagsComponent,
    title: "Components/AutoCompleteTags",
    decorators: [
        moduleMetadata({
            imports: [ AutoCompleteTagsModule, BrowserAnimationsModule ]
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
    ],
    separator: ",",
    allowAddNewTag: true
}
