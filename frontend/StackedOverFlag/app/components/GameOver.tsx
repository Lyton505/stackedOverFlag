import { View, Text, TextStyle, ViewStyle } from "react-native"
import { GameButton } from "./GameButton"

export const GameOver = ({ score, lives, hints, accuracy, replay }: { score: number, lives: number, hints: number, accuracy: number, replay: () => void }) => {


    return (
        <View style={$gameOverContainer}>
            <Text style={$gameOverText}>Game Over</Text>

            <View style={$gameStatsContainer}>
                <Text>Score: {score}</Text>
                <Text>Lives: {lives}</Text>
                <Text>Hints remaining: {hints}</Text>
                <Text>Accuracy: {accuracy}%</Text>
            </View>



            <GameButton
                btnText="Play Again"
                onPress={replay}
            />
        </View>
    )
}

const $gameOverContainer: ViewStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 20,
    flex: 1,
    padding: 20,
    margin: 10,
}

const $gameOverText: TextStyle = {
    fontSize: 24,
    fontWeight: "bold",
}

const $gameStatsContainer: ViewStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 20,
    // color is off white
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
}