import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { InputEmailComponent } from "./input-email.component";
import { InputTextModule } from "primeng/inputtext";

export default {
    component: InputEmailComponent,
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