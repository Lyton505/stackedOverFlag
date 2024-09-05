import { spacing } from "app/theme"
import {
    TextInput,
    TextStyle,
    View,
    Text,
    ViewStyle
} from "react-native"

export const GameAnswerContainer = ({ onChangeText }: { onChangeText: (text: string) => void }) => {
    return (
        <View style={$answerContainer}>
            <Text style={$answerText}>Answer</Text>
            <TextInput
                onChangeText={onChangeText}
                placeholder="Enter your answer"
                placeholderTextColor="rgba(0, 0, 0, 0.3)"
                style={$answerInput}
            />
        </View>)
}

const $answerText: TextStyle = {
    fontSize: 20,
    fontWeight: "bold",

}

const $answerInput: TextStyle = {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    width: "80%",
    backgroundColor: 'rgba(217, 217, 217, 0.1)',
    borderRadius: 10,
    textAlign: "center",
    color: "black",
    fontSize: 20,
}

const $answerContainer: ViewStyle = {
    alignItems: "center",
    marginBottom: spacing.xl,
}