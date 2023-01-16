import { Meta, Story } from "@storybook/angular";
import { IconComponent } from "./icon.component";

export default {
    component: IconComponent,
    title: "Components/Icon"
} as Meta

const Template: Story = args => ({
    props: {
        ...args
    }
});

export const Default = Template.bind({});
Default.args = {
    icon: "search",
}

export const Spinner = Template.bind({});
Spinner.args = {
    icon: "spinner",
    spinIcon: true
}