import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { InputTextComponent } from "./input-text.component";
import { InputTextModule } from "primeng/inputtext";

export default {
    component: InputTextComponent,
    title: "Components/InputText",
    decorators: [
        moduleMetadata({
            imports: [ InputTextModule ]
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

export const WithIcon = Template.bind({});
WithIcon.args = {
    id: "foo",
    icon: "search"
}