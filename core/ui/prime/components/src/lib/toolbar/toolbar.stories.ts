import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { ToolbarModule } from "primeng/toolbar";
import { ButtonModule } from "../button";
import { ToolbarComponent } from "./toolbar.component";

export default {
    component: ToolbarComponent,
    title: "Components/Toolbar",
    decorators: [
        moduleMetadata({
            imports: [ ToolbarModule, ButtonModule ]
        })
    ]
} as Meta

const Template: Story = args => ({
    template: `<lens-toolbar>
                    <lens-button icon="pi-user-plus" label="Add new user"></lens-button>
               </lens-toolbar>`,
    props: {
        ...args
    }
});

export const Default = Template.bind({});