import { Platform } from "react-native"
import {
  Roboto_300Light as robotoLight,
  Roboto_400Regular as robotoRegular,
  Roboto_500Medium as robotoMedium,
  Roboto_700Bold as robotoBold,
} from "@expo-google-fonts/roboto"

export const customFontsToLoad = {
  robotoLight,
  robotoRegular,
  robotoMedium,
  robotoBold,
}

const fonts = {
  roboto: {
    light: "robotoLight",
    normal: "robotoRegular",
    medium: "robotoMedium",
    bold: "robotoBold",
  },
  helveticaNeue: {
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    normal: "Courier",
  },
  sansSerif: {
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    normal: "monospace",
  },
}

export const typography = {
  fonts,
  primary: fonts.roboto,
  secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}
