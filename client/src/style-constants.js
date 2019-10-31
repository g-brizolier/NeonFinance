export const themeConstants = {
    // Background
    bgColorLight: "F3F7FF",
    bgColorDark: "#282B52",
    bgColorDarkDim: "#25284c",
    bgColorDarker: "#251F4C",
    //gradients
    lightBlue: "#1CC4FF",
    violet: "#7C1CFF",
    violetLight: "#D491FF",
    darkBlue: "#1E76FF",
    greenLight: "#29E090",
    greenDark: "#28B477",
    // Fonts
    greyDark: "#7F8FA4",
    greyDarker: "#354052",
    greyLight: "#90A8CB",
    orangeDark: "#ff6100",
    orangeLight: "#ff9900"
    
}

export const themeGradients = {
    gradient1: {
        start: themeConstants.lightBlue,
        stop: themeConstants.violet
    },
    gradient1_alt: {
        start: themeConstants.lightBlue,
        stop: themeConstants.darkBlue
    },
    gradient2: {
        start: themeConstants.violetLight,
        stop: themeConstants.violet
    },
    gradient3: {
        start: themeConstants.greenLight,
        stop: themeConstants.greenDark
    },
    gradient_halloween: {
        start: themeConstants.orangeLight,
        stop: themeConstants.orangeDark
    }
}

export const themeFonts = {
    main: "Lato" 
}