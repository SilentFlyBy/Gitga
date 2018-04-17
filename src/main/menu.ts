import { Menu } from "electron";

export default class GitgaMenu {
    private template: Electron.MenuItemConstructorOptions[] = [
        {
            label: "File",
            submenu: [
                {
                    label: "Open",
                    click: () => this.onOpenClick(),
                },
            ],
        },
        {
            label: "Edit",
            submenu: [
                {
                    role: "undo",
                },
                {
                    role: "redo",
                },
                {
                    type: "separator",
                },
                {
                    role: "cut",
                },
                {
                    role: "copy",
                },
                {
                    role: "paste",
                },
            ],
        },

        {
            label: "View",
            submenu: [
                {
                    role: "reload",
                },
                {
                    role: "toggledevtools",
                },
                {
                    type: "separator",
                },
                {
                    role: "resetzoom",
                },
                {
                    role: "zoomin",
                },
                {
                    role: "zoomout",
                },
                {
                    type: "separator",
                },
                {
                    role: "togglefullscreen",
                },
            ],
        },

        {
            role: "window",
            submenu: [
                {
                    role: "minimize",
                },
                {
                    role: "close",
                },
            ],
        },

        {
            role: "help",
            submenu: [
                {
                    label: "Learn More",
                },
            ],
        },
    ];

    private onOpenClick: () => void;

    constructor(onOpenClick: () => void) {
        this.onOpenClick = onOpenClick;
    }

    public buildMenu() {
        const menu = Menu.buildFromTemplate(this.template);
        Menu.setApplicationMenu(menu);
    }
}
