export const Nav = [
    {
        icon: "IconHome",
        label: "Home",
        path: "/"
    },
    {
        icon: "IconNotebook",
        label: "Recipes",
        path: "/recipes"
    },
    { icon: "IconListSearch",
        label: "Reference",
        path: "/reference"
    },
    {
        icon: "IconSeedling",
        label: "Planting",
        path: "/plantingchart"
    },
    {
        icon: "IconTopologyComplex",
        label: "AetherEditor",
        path: "/aethereditor",
        role: "admin",
        visibleTo: ["admin"]

        // disabled: true
    },
    {
        icon: "IconListCheck",
        label: "Devs To Do",
        path: "/todo",
        role: "admin",
        visibleTo: ["admin"]
    },
    {
        icon: "IconSettings",
        label: "Settings",
        path: "/settings"
    },
    {
        icon: "Custom",
        customIcon: "WowIcon.svg",
        label: "WoW",
        path: "/wow"
    }
];
