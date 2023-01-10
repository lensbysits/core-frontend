import { ILayoutConfiguration } from "./layout-configuration.interface";

export function CreateLayout(args: ILayoutConfiguration = {
    menuMode: "static",
    menuColor: "light",
    profileMode: "top",
    inputStyle: "filled",
    ripple: true,
    showSearch: false,
    showNotifications: false,
    showMessages: false,
    showSettings: false,
    showFooter: false,
    showLanguagePicker:false}
): ILayoutConfiguration {
    return {
        menuMode: args.menuMode,
        menuColor: args.menuColor,
        profileMode: args.profileMode,
        inputStyle: args.inputStyle,
        ripple: args.ripple,
        showSearch: args.showSearch,
        showNotifications: args.showNotifications,
        showMessages: args.showMessages,
        showSettings: args.showSettings,
        showFooter: args.showFooter,
        showLanguagePicker: args.showLanguagePicker
    };
}

export const StaticLightTopLayoutConfiguration: ILayoutConfiguration = {
    menuMode: "static",
    menuColor: "light",
    profileMode: "top",
    inputStyle: "filled",
    ripple: true,
    showSearch: false,
    showNotifications: false,
    showMessages: false,
    showSettings: false,
    showFooter: false
}

export const StaticDarkTopLayoutConfiguration: ILayoutConfiguration = {
    menuMode: "static",
    menuColor: "dark",
    profileMode: "top",
    inputStyle: "filled",
    ripple: true,
    showSearch: false,
    showNotifications: false,
    showMessages: false,
    showSettings: false,
    showFooter: false
}