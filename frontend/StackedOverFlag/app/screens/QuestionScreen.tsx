import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { View, ViewStyle, SafeAreaView } from "react-native"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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
  const [question, setQuestion] = useState<string>("Getting question...")
  const [viewHint, setViewHint] = useState<boolean>(true)

  const [userAnswer, setUserAnswer] = useState<string>("")

  const [answer, setAnswer] = useState<string>("Nigeria")
  const [answerSubmitted, setAnswerSubmitted] = useState<boolean>(false)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false)
  const [viewNextQuestion, setViewNextQuestion] = useState<boolean>(false)


  // test api
  const testApi = async () => {
    console.log("testing api");
    await fetch('http://localhost:3000/api/question').then(res => res.json()).then(data => {
      console.log("api test response", data)
      return data
    })
  }


  // get question from backend
  const getQuestion = async () => {
    console.log("getting question");
    await fetch('http://localhost:3000/api/question').then(res => res.json()).then(data => {
      console.log("api question response", data)
      setQuestion(data.question)
      return data
    }).catch(err => {
      console.log("error getting question", err)
    })
  }


  // get answer from backend
  const getAnswer = async () => {
    console.log("getting answer");
    await fetch('http://localhost:3000/api/answer').then(res => res.json()).then(data => {
      console.log("api answer response", data)
      return data
    })
  }

  // submit answer to backend
  const submitAnswer = async (answer: string) => {
    console.log("submitting answer");
    await fetch('http://localhost:3000/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ answer })
    }).then(res => res.json()).then(data => {
      console.log("api test response", data)
      return data
    })
  }

  // reset game
  const resetGame = async () => {
    console.log("resetting game");
    await fetch('http://localhost:3000/api/reset').then(res => res.json()).then(data => {
      console.log("api reset response", data)
      return data
    })
  }


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

  useEffect(() => {
    console.log("Starting game");
    getQuestion();
  }, [])



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
