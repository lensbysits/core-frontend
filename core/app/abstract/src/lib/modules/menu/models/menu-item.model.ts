export class MenuItem {
    label = '';
    url?: string;
    routerLink?: string[];
    command?: any;
    preventExact?: boolean;
    icon?: string;
    target?: string;
    class?: string;
    visible?: boolean;
    disabled?: boolean;
    badge?: string;
    badgeClass?: string;
    extralink?: boolean;
    items?: MenuItem[];
    claimfilter?: string[];
    rolefilter?: string[];
    envfilter?: string[];
    unauthorizedonly?: boolean;
}
