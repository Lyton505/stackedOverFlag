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
  const [continueGame, setContinueGame] = useState<boolean>(true)
  const [gameReset, setGameReset] = useState<boolean>(false)
  const [questionHint, setQuestionHint] = useState<string>("")
  const [hints, setHints] = useState<number>(3)
  const [lives, setLives] = useState<number>(3)
  const [score, setScore] = useState<number>(0)
  const [accuracy, setAccuracy] = useState<number>(-17)
  // test api
  const testApi = async () => {
    await fetch('http://localhost:3000/api/question').then(res => res.json()).then(data => {
      return data
    })
  }


  // get question from backend
  const getQuestion = async () => {
    await fetch('http://10.10.10.1:3000/api/question').then(res => res.json()).then(data => {
      setQuestion(data.question)
      return data
    }).catch(err => {
      console.log("error getting question", err)
    })
  }

  // submit answer to backend
  const submitAnswer = async (answer: string) => {
    try {
      const response = await fetch('http://10.10.10.1:3000/api/response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answer })
      })


      const data = await response.json()
      setAnswer(data.answer)
      setScore(data.score)
      setLives(data.lives)
      setHints(data.hints)

      return data
    } catch (err) {
      return null
    }
  }

  const startGame = async () => {
    await fetch('http://10.10.10.1:3000/api/start').then(res => res.json()).then(data => {

      setScore(data.score)
      setLives(data.lives)
      setHints(data.hints)
      setIsGameOver(data.isGameOver)

      return data
    }).catch(err => {
      console.log("error starting game", err);
    })
  }

  // reset game - called by Play Again button
  const resetGame = async () => {
    console.log("resetting game");
    const response = await fetch('http://10.10.10.1:3000/api/reset')

    setLives(3)
    setHints(3)
    setScore(0)
    setQuestion("Getting question...")
    setViewHint(false)
    setIsGameOver(false)
    setContinueGame(true)
    setGameReset(!gameReset)
    return response

  }

  const getStats = async () => {
    const response = await fetch('http://10.10.10.1:3000/api/stats')
    const data = await response.json()
    console.log("data", data)
    setAccuracy(data.accuracy)
    setScore(data.score)
    setLives(data.lives)
    setHints(data.hints)
    return data
  }


  const handleViewHint = async () => {


    if (viewHint) {
      return;
    }

    try {
      const response = await fetch('http://10.10.10.1:3000/api/hint')

      const data = await response.json()
      setQuestionHint(data.questionHint)
      if (hints > 0) { setHints(hints - 1) }
    } catch (err) {
      setQuestionHint("Error getting hint")
      console.log("error getting hint", err)
    }


    setViewHint(!viewHint)
  }

  const handleSubmitGuess = async () => {
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

    if (viewHint) {
      setViewHint(false)
    }

  }

  const handleNextQuestion = () => {
    setAnswerSubmitted(false)
    getQuestion()
    getStats()
    if (isGameOver) {
      setContinueGame(false)
    }
  }

  useEffect(() => {
    getQuestion();
    startGame();
  }, [continueGame, gameReset])


  const gameFlow = () => {



    if (!answerSubmitted) {
      return (
        <View style={$answerBodyContainer}>
          {viewHint && <GameHint questionHint={questionHint} />}
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


  const questionHeader = (
    <View style={$questionHeaderContainer}>
      <GameHeader score={score} lives={lives} hints={hints} />
      <GameQuestion question={question} />
    </View>
  )


  return (
    <SafeAreaView style={[$container, $containerInsets]}>
      <KeyboardAwareScrollView
        contentContainerStyle={$scrollViewContent}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={20}
        enableOnAndroid={true}
      >

        {continueGame ? (
          <>
            {questionHeader}
            {gameFlow()}
          </>
        ) : (
          <GameOver score={score} lives={lives} hints={hints} accuracy={accuracy} replay={resetGame} />
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
