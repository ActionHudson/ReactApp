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
        modal: {
            title: "World of Warcraft",
            text: "Select a section to view:",
            options: [
                {
                    title: "Characters",
                    text: "View your characters to see their levels, class, " +
                        "faction, race, armor, and roles.",
                    link: "/wow/characters",
                    icon: "IconUsersGroup"
                },
                {
                    title: "Professions",
                    text: "View a breakdown of your professions and which " +
                        "characters learned them.",
                    link: "/wow/professions",
                    icon: "IconHammer"
                }
            ]
        }
    }
];
