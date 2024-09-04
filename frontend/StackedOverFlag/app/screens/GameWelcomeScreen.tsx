import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Text, Button } from "app/components"
import { Image } from "react-native"
import { AppStackScreenProps } from "../navigators"
import { colors } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"

interface GameWelcomeScreenProps extends AppStackScreenProps<"GameWelcome"> { }

export const GameWelcomeScreen: FC<GameWelcomeScreenProps> = observer(function GameWelcomeScreen({ navigation }) {
  const $containerInsets = useSafeAreaInsetsStyle(["top", "bottom", "left", "right"])

  const gameLogo = require("../../assets/images/game-logo.png")

  return (
    <View style={[$container, $containerInsets]}>
      <View style={$imageContainer}>
        <Image source={gameLogo} style={$gameLogo} />
        <Text style={$title}>Stacked Over Flag</Text>
      </View>
      <View >
        <Text style={$instructionsTitle}>Game Instructions</Text>
        <Text style={$instructions}>For each question, you are supposed to type the name of the country where that phenomenon is found. A correct answer earns a token, two consecutive incorrect answers cost a heart, and you get 1 hint and 1 heart for every 3 correct answers. If you run out of hearts you lose. </Text>
      </View>
      <View style={$buttonContainer}>
        <Button style={$button}
          text="Sign in with Google"
          onPress={() => {
            console.log("Sign in with Google");
          }}
        />
        <Button style={$button}
          text="Play as Guest"
          onPress={() => {
            console.log("Play as Guest");
            // Use the navigation prop from the component props
            navigation.navigate("QuestionScreen");
          }}
        />
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $imageContainer: ViewStyle = {
  position: "relative",
  width: "100%",
  aspectRatio: 16 / 9,
}


const $title: TextStyle = {
  position: "absolute",
  top: 10,
  left: 0,
  right: 0,
  fontSize: 24,
  zIndex: 1,
  fontWeight: "bold",
  textAlign: "center",
  color: colors.text,
}

const $gameLogo: ImageStyle = {
  width: "100%",
  height: "100%",
  resizeMode: "cover",
}

const $instructionsTitle: TextStyle = {
  fontSize: 23,
  fontWeight: "bold",
  textAlign: "center",
  color: colors.text,
  marginTop: 20,
  marginBottom: 10,
}

const $instructions: TextStyle = {
  marginTop: 20,
  fontSize: 16,
  textAlign: "center",
  color: colors.text,
  marginHorizontal: 20,
  lineHeight: 30,
}

const $buttonContainer: ViewStyle = {
  marginTop: 20,
  flexDirection: "column",
  gap: 10,
  width: "90%",
  alignSelf: "center",
}

const $button: ViewStyle = {
  width: "100%",
}
