import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { Image, ImageStyle, TextInput, TextStyle, View, ViewStyle, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView, Keyboard, TouchableWithoutFeedback } from "react-native"
import { Button, Text } from "app/components"
import { isRTL } from "../i18n"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { tr } from "date-fns/locale"
import { GameHeader } from "app/components/GameHeader"
import { GameHint } from "app/components/GameHint"
import { GameQuestion } from "app/components/GameQuestion"
import { GameAnswerContainer } from "app/components/GameAnswerContainer"
import { GameButton } from "app/components/GameButton"
import { GameResponseResult } from "app/components/GameResponseResult"

interface QuestionScreenProps extends AppStackScreenProps<"QuestionScreen"> { }

export const QuestionScreen: FC<QuestionScreenProps> = observer(function QuestionScreen() {
  const $containerInsets = useSafeAreaInsetsStyle(["bottom", "top", "left", "right"])

  // toDo: get question & answer from backend
  // toDo: use better state management
  const [question, setQuestion] = useState<string>("Which country has the most dogs, cats, cows, and chickens? It is the largest by land mass in Africa.")
  const [viewHint, setViewHint] = useState<boolean>(true)

  const [userAnswer, setUserAnswer] = useState<string>("")

  const [answer, setAnswer] = useState<string>("Nigeria")
  const [answerSubmitted, setAnswerSubmitted] = useState<boolean>(false)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false)
  const [viewNextQuestion, setViewNextQuestion] = useState<boolean>(false)

  const handleViewHint = () => {
    console.log("view hint");
    setViewHint(!viewHint)
  }

  const handleSubmitGuess = () => {
    console.log("submit guess");

    if (userAnswer === answer) {
      setIsAnswerCorrect(true)
    } else {
      setIsAnswerCorrect(false)
    }

    setAnswerSubmitted(true)

  }

  const handleNextQuestion = () => {
    console.log("next question");
    setAnswerSubmitted(false)
  }

  return (
    <SafeAreaView style={[$container, $containerInsets]}>
      <KeyboardAwareScrollView
        contentContainerStyle={$scrollViewContent}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={20}
        enableOnAndroid={true}
      >

        <View style={$questionHeaderContainer}>
          <GameHeader />
          <GameQuestion question={question} />
        </View>

        {(!answerSubmitted) ? (
          <View style={$answerBodyContainer}>
            {viewHint && <GameHint />}
            <GameAnswerContainer onChangeText={setUserAnswer} />
            <View style={$submitButtonContainer}>
              <GameButton btnText="View Hint" onPress={handleViewHint} />
              <GameButton btnText="Submit Guess" onPress={handleSubmitGuess} />
            </View>
          </View >)
          : (
            <View style={$responseResultContainer}>
              <GameResponseResult isAnswerCorrect={isAnswerCorrect} answer={answer} />
              <GameButton btnText="Next Question" onPress={handleNextQuestion} />
            </View>)}

      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
})

const $answerBodyContainer: ViewStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
  justifyContent: "center",
  flex: 1,
}

const $responseResultContainer: ViewStyle = {
  alignItems: "center",
  paddingVertical: spacing.lg,
  display: "flex",
  flexDirection: "column",
  gap: 150,
  flex: 1,
}

const $submitButtonContainer: ViewStyle = {
  flexDirection: "column",
  gap: 10,
  alignItems: "center",
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $questionHeaderContainer: ViewStyle = {
  backgroundColor: "rgba(94, 180, 56, 0.4)",
  paddingVertical: spacing.lg,
}

const $scrollViewContent: ViewStyle = {
  flexGrow: 1,
}
