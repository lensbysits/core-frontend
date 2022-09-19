export type InputStyles = "outlined" | "filled";
export type MenuColors = "dark" | "light";
export type MenuModes = "static" | "overlay" | "horizontal" | "slim" | "none";
export type ProfileModes = "inline" | "top";

export interface ILayoutConfiguration {
    menuMode?: MenuModes;
    menuColor?: MenuColors;
    profileMode?: ProfileModes;
    ripple?: boolean;
    inputStyle?: InputStyles;
    showSearch?: boolean;
    showNotifications?: boolean;
    showMessages?: boolean;
    showSettings?: boolean;
    showFooter?: boolean;
}
