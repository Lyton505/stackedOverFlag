import { spacing } from "app/theme"
import { View, Text, TextStyle, ViewStyle } from "react-native"

export const GameQuestion = ({ question }: { question: string }) => {
    return (<View style={$questionContainer}>
        <Text style={$questionText}>{question}</Text>
    </View>)
}

const $questionContainer: ViewStyle = {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacing.xl,
}

const $questionText: TextStyle = {
    fontSize: 24,
    fontWeight: "400",
    textAlign: "center",
    width: "80%",
    lineHeight: 30,
}