export type InputStyles = "outlined" | "filled";
export type MenuColors = "dark" | "light";
export type MenuModes = "static" | "overlay" | "horizontal" | "slim" | "none";
export type ProfileModes = "inline" | "top";

export interface ILayoutConfiguration {
	hideMenu?: boolean;
	menuMode?: MenuModes;
	menuColor?: MenuColors;
	profileMode?: ProfileModes;
	ripple?: boolean;
	inputStyle?: InputStyles;
	showSearch?: boolean;
	showNotifications?: boolean;
	showMessages?: boolean;
	showSettings?: boolean;
	showQuickActions?: boolean;
	showThemeCustomization?: boolean;
	showFooter?: boolean;
	showLanguagePicker?: boolean;
}
