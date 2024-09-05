import { Button } from "app/components/Button"
import { TextStyle, ViewStyle } from "react-native"

export const GameButton = ({ btnText, onPress }: {
    btnText: string,
    onPress: () => void;
}) => {
    return <Button style={$gameButton} onPress={onPress}>{btnText}</Button>
}

const $gameButton: ViewStyle = {
    width: "80%",
    backgroundColor: "rgba(94, 180, 56, 0.4)",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
}
