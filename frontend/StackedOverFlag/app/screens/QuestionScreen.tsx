import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import {
  Text,
} from "app/components"
import { isRTL } from "../i18n"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"


interface QuestionScreenProps extends AppStackScreenProps<"QuestionScreen"> { }

export const QuestionScreen: FC<QuestionScreenProps> = observer(function QuestionScreen(
) {

  const $containerInsets = useSafeAreaInsetsStyle(["bottom", "top", "left", "right"])

  return (
    <View style={[$container, $containerInsets]}>
      <Text>QuestionScreen</Text>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}
