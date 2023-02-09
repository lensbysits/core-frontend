import { Component } from "@angular/core";
import {
	ILayoutConfiguration,
	LayoutConfigurationService
} from "@lens/app-abstract";

@Component({
	selector: "ui-footer",
	template: `
		<!-- ============================================================== -->
		<!-- footer -->
		<!-- ============================================================== -->
		<footer class="footer text-center">Bootstrap Layout.</footer>
		<!-- ============================================================== -->
		<!-- End footer -->
		<!-- ============================================================== -->
	`
})
export class AppFooterComponent {
	layoutConfiguration: ILayoutConfiguration = {};

	constructor(
		readonly layoutConfigurationService: LayoutConfigurationService
	) {}
}
