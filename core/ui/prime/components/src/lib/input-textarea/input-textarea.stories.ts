import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { InputTextareaComponent } from "./input-textarea.component";
import { InputTextareaModule } from "primeng/inputtextarea";

export default {
    component: InputTextareaComponent,
    title: "Components/InputTextarea",
    decorators: [
        moduleMetadata({
            imports: [ InputTextareaModule ]
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