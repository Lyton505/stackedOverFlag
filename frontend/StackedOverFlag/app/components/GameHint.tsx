import { spacing } from "app/theme"
import {
    TextStyle,
    ViewStyle,
    Text,
    Image,
    View,
    ImageStyle
} from "react-native"

export const GameHint = () => {
    const hintImage = require("../../assets/images/gameplay-hint.png")
    return (<View style={$hintContainer}>
        <View style={$hintHeader}>
            <Image source={hintImage} style={$rewardImage} />
            <Text>Hint</Text>
        </View>
        <Text style={$hintText}>It is a country in South
            America with a lot of dogs and has a population of over
            10 million people
        </Text>
    </View>)
}

const $rewardImage: ImageStyle = {
    width: 40,
    height: 40,
}

const $hintHeader: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
}

const $hintContainer: ViewStyle = {
    alignItems: "center",
    marginVertical: spacing.md,
    backgroundColor: "rgba(215, 229, 22, 0.5)",
    width: "80%",
    padding: spacing.sm,
    borderRadius: 10,
    alignSelf: "center",
}

const $hintText: TextStyle = {
    textAlign: "center",
}