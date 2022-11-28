import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { PanelModule } from "primeng/panel";
import { PanelComponent } from "./panel.component";

export default {
    component: PanelComponent,
    title: "Components/Panel",
    decorators: [
        moduleMetadata({
            imports: [ PanelModule, BrowserAnimationsModule ]
        })
    ]
} as Meta

const Template: Story = args => ({
    template: `<lens-panel header="header" collapsed="collapsed">foo</lens-panel>`,
    props: {
        ...args
    }
});

export const Default = Template.bind({});
Default.args = {
    header: "Header",
    collapsed: true
}
