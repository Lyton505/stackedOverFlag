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
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry"
import { GameOver } from "app/components/GameOver"

interface QuestionScreenProps extends AppStackScreenProps<"QuestionScreen"> { }

export const QuestionScreen: FC<QuestionScreenProps> = observer(function QuestionScreen() {
  const $containerInsets = useSafeAreaInsetsStyle(["bottom", "top", "left", "right"])

  // toDo: get question & answer from backend
  // toDo: use better state management
  const [question, setQuestion] = useState<string>("Getting question...")
  const [viewHint, setViewHint] = useState<boolean>(false)

  const [userAnswer, setUserAnswer] = useState<string>("")

  const [answer, setAnswer] = useState<string>("")
  const [answerSubmitted, setAnswerSubmitted] = useState<boolean>(false)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false)
  const [viewNextQuestion, setViewNextQuestion] = useState<boolean>(false)
  const [isGameOver, setIsGameOver] = useState<boolean>(false)

  const [hints, setHints] = useState<number>(3)
  const [lives, setLives] = useState<number>(3)
  const [score, setScore] = useState<number>(0)

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
    await fetch('http://10.10.10.1:3000/api/question').then(res => res.json()).then(data => {
      console.log("api question response", data)
      setQuestion(data.question)
      return data
    }).catch(err => {
      console.log("error getting question", err)
    })
  }

  // submit answer to backend
  const submitAnswer = async (answer: string) => {
    console.log("submitting answer");
    try {
      const response = await fetch('http://10.10.10.1:3000/api/response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answer })
      })


      const data = await response.json()
      console.log("api submit response", data)
      setAnswer(data.answer)
      setScore(data.score)
      setLives(data.lives)
      setHints(data.hints)

      return data
    } catch (err) {
      console.log("error submitting answer", err)
      return null
    }
  }

  // reset game
  const resetGame = async () => {
    console.log("resetting game");
    await fetch('http://10.10.10.1:3000/api/reset').then(res => res.json()).then(data => {
      console.log("api reset response", data)
      return data
    })
  }


  const handleViewHint = () => {
    console.log("view hint");
    setViewHint(!viewHint)
  }

  const handleSubmitGuess = async () => {
    console.log("submit guess");
    const response = await submitAnswer(userAnswer)

    if (response && response.message === "Correct") {
      setIsAnswerCorrect(true)
    } else {
      setIsAnswerCorrect(false)
    }

    if (response && response.isGameOver) {
      setIsGameOver(true)
    }

    setAnswerSubmitted(true)

  }

  const handleNextQuestion = () => {
    console.log("next question");
    setAnswerSubmitted(false)
    getQuestion()
  }

  useEffect(() => {
    console.log("Starting game");
    getQuestion();
  }, [])


  const gameFlow = () => {
    if (!answerSubmitted) {
      return (
        <View style={$answerBodyContainer}>
          {viewHint && <GameHint />}
          <GameAnswerContainer onChangeText={setUserAnswer} />
          <View style={$submitButtonContainer}>
            <GameButton btnText="View Hint" onPress={handleViewHint} />
            <GameButton btnText="Submit Guess" onPress={handleSubmitGuess} />
          </View>
        </View >
      )
    } else {
      return (
        <View style={$responseResultContainer}>
          <GameResponseResult isAnswerCorrect={isAnswerCorrect} answer={answer} />
          <GameButton btnText="Next Question" onPress={handleNextQuestion} />
        </View>)
    }
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
          <GameHeader score={score} lives={lives} hints={hints} />
          <GameQuestion question={question} />
        </View>


        {isGameOver ? (
          <GameOver />
        ) : (
          gameFlow()
        )}

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
