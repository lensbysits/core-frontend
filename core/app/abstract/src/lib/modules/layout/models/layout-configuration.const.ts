import { ILayoutConfiguration } from "./layout-configuration.interface";

export function CreateLayout(
	args: ILayoutConfiguration = {
		hideMenu: false,
		menuMode: "static",
		menuColor: "light",
		profileMode: "top",
		inputStyle: "filled",
		ripple: true,
		showSearch: false,
		showNotifications: false,
		showMessages: false,
		showSettings: false,
		showQuickActions: false,
		showFooter: false,
		showLanguagePicker: false
	}
): ILayoutConfiguration {
	return {
		hideMenu: args.hideMenu,
		menuMode: args.menuMode,
		menuColor: args.menuColor,
		profileMode: args.profileMode,
		inputStyle: args.inputStyle,
		ripple: args.ripple,
		showSearch: args.showSearch,
		showNotifications: args.showNotifications,
		showMessages: args.showMessages,
		showSettings: args.showSettings,
		showQuickActions: args.showQuickActions,
		showFooter: args.showFooter,
		showLanguagePicker: args.showLanguagePicker
	};
}

export const StaticLightTopLayoutConfiguration: ILayoutConfiguration = {
	hideMenu: false,
	menuMode: "static",
	menuColor: "light",
	profileMode: "top",
	inputStyle: "filled",
	ripple: true,
	showSearch: false,
	showNotifications: false,
	showMessages: false,
	showSettings: false,
	showQuickActions: false,
	showFooter: false
};

export const StaticDarkTopLayoutConfiguration: ILayoutConfiguration = {
	hideMenu: false,
	menuMode: "static",
	menuColor: "dark",
	profileMode: "top",
	inputStyle: "filled",
	ripple: true,
	showSearch: false,
	showNotifications: false,
	showMessages: false,
	showSettings: false,
	showQuickActions: false,
	showFooter: false
};
