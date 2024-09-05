import { spacing } from "app/theme"
import { View, ViewStyle, Text, TextStyle, Image, ImageStyle } from "react-native"

export const GameResponseResult = ({ isAnswerCorrect, answer }: { isAnswerCorrect: boolean, answer: string }) => {

    const correctImage = require("../../assets/images/gameplay-correct.png")
    const incorrectImage = require("../../assets/images/gameplay-wrong.png")

    if (isAnswerCorrect === true) {
        return (
            <View style={$responseResultContainer}>
                <Image style={$responseImage} source={correctImage} />
                <View style={$responseTextContainer}>
                    <Text style={$responseText}>+1 point!</Text>
                    <Text style={$responseText2}>{answer} is correct</Text>
                </View>
            </View>
        )
    } else {
        return (
            <View style={$responseResultContainer}>
                <Image style={$responseImage} source={incorrectImage} />
                <View style={$responseTextContainer}>
                    <Text style={$responseText}>Incorrect</Text>
                    <Text style={$responseText2}>{answer} is the correct answer</Text>
                </View>
            </View>
        )
    }
}

const $responseTextContainer: ViewStyle = {
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
}

const $responseResultContainer: ViewStyle = {
    alignItems: "center",
}

const $responseImage: ImageStyle = {
    width: 100,
    height: 100,
}

const $responseText: TextStyle = {
    fontSize: 20,
    fontWeight: "bold",
}

const $responseText2: TextStyle = {
    fontSize: 25,
    color: "gray",
}