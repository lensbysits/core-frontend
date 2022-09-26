import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { action } from "@storybook/addon-actions";
import { ButtonComponent } from "./button.component";
import { ButtonModule } from "primeng/button";

export default {
    component: ButtonComponent,
    title: "Components/Button",
    decorators: [
        moduleMetadata({
            imports: [ ButtonModule ]
        })
    ]
} as Meta

const Template: Story = args => ({
    props: {
        ...args,
        clicked: action("clicked")
    }
});

export const Default = Template.bind({});
Default.args = {
    label: "Secondary",
    type: "secondary"
}