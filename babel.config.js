export default {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    "plugins": [
        ["import", {
            "libraryName": "view-design",
            "libraryDirectory": "src/components"
        }]
    ]
}