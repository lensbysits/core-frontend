import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { action } from "@storybook/addon-actions";
import { LoadingSpinnerComponent } from "./loading-spinner.component";
import { ProgressSpinnerModule } from "primeng/progressspinner";

export default {
    component: LoadingSpinnerComponent,
    title: "Components/LoadingSpinner",
    decorators: [
        moduleMetadata({
            imports: [ ProgressSpinnerModule ]
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
    isLoading: true
}