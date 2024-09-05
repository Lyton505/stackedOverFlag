import { View, Text, Image, ViewStyle, TextStyle, ImageStyle } from "react-native"
import React, { FC, useState } from "react"
import { spacing } from "../theme"

export const GameHeader = () => {

    const tokenImage = require("../../assets/images/gameplay-tokens.png")
    const heartImage = require("../../assets/images/gameplay-heart.png")
    const hintsRemainingImage = require("../../assets/images/gameplay-hints.png")

    return (
        <View style={$gameInfoContainer}>
            <View style={$gameInfoItem}>
                <Image source={tokenImage} style={$rewardImage} />
                <Text style={$gameInfoText}>1</Text>
            </View>
            <View style={$gameInfoItem}>
                <Image source={heartImage} style={$rewardImage} />
                <Text style={$gameInfoText}>2</Text>
            </View>
            <View style={$gameInfoItem}>
                <Image source={hintsRemainingImage} style={$rewardImage} />
                <Text style={$gameInfoText}>3</Text>
            </View>
        </View>
    )
}

const $gameInfoContainer: ViewStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
}

const $gameInfoItem: ViewStyle = {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
}

const $gameInfoText: TextStyle = {
    fontSize: 20,
    fontWeight: "bold",
}

const $rewardImage: ImageStyle = {
    width: 40,
    height: 40,
}