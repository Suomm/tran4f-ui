module.exports = {
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                appId: "com.github.tran4f",
                win: {
                    icon: "./public/favicon.ico",
                    target: [{
                        target: "nsis",
                        arch: [
                            "x64",
                        ]
                    }]
                },
                nsis: {
                    oneClick: false,
                    allowElevation: true,
                    allowToChangeInstallationDirectory: true,
                    installerIcon: "./public/favicon.ico",
                    uninstallerIcon: "./public/favicon.ico",
                    installerHeaderIcon: "./public/favicon.ico",
                    createDesktopShortcut: true,
                    createStartMenuShortcut: true,
                    shortcutName: "favicon",
                }
            }
        }
    }
}