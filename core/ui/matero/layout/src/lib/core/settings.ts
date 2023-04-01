export interface AppSettings {
  navPos: 'side' | 'top';
  theme: 'light' | 'dark' | 'auto';
  dir: 'ltr' | 'rtl';
  showHeader: boolean;
  headerPos: 'fixed' | 'static' | 'above';
  showUserPanel: boolean;
  sidenavOpened: boolean;
  sidenavCollapsed: boolean;
  language: string;
}

export const defaults: AppSettings = {
  navPos: 'side',
  theme: 'auto',
  dir: 'ltr',
  showHeader: true,
  headerPos: 'fixed',
  showUserPanel: true,
  sidenavOpened: true,
  sidenavCollapsed: false,
  language: 'en-US',
};

export interface LayoutSettings {
  searchbar: boolean;
  fullscreen: boolean;
  notification: boolean;
  notificationSidebar: boolean;
  translate: boolean;
  showUserPanel: boolean;
}

export const layoutDefaults: LayoutSettings = {
  searchbar: true,
  fullscreen: true,
  notification: true,
  notificationSidebar: true,
  translate: true,
  showUserPanel: true
};
