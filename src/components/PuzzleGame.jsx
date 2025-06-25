"use client"

import { useState, useEffect, useRef } from "react"

const PuzzleGame = ({ game, gameData, onGameComplete, onBackToChat }) => {
  const [gameState, setGameState] = useState(gameData)
  const [userInput, setUserInput] = useState("")
  const [showCelebration, setShowCelebration] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [difficulty, setDifficulty] = useState("easy")
  const [showAIHint, setShowAIHint] = useState(false)
  const [aiHintText, setAiHintText] = useState("")
  const [lastActivity, setLastActivity] = useState(Date.now())
  const [isLoading, setIsLoading] = useState(false)
  const activityTimer = useRef(null)

  // Auto-hint system
  useEffect(() => {
    const checkInactivity = () => {
      if (Date.now() - lastActivity > 15000 && !showAIHint && !showCelebration) {
        showAutoHint()
      }
    }

    activityTimer.current = setInterval(checkInactivity, 2000)
    return () => clearInterval(activityTimer.current)
  }, [lastActivity, showAIHint, showCelebration])

  const resetActivityTimer = () => {
    setLastActivity(Date.now())
    setShowAIHint(false)
  }

  const showAutoHint = () => {
    const hints = getGameHints()
    const randomHint = hints[Math.floor(Math.random() * hints.length)]
    setAiHintText(randomHint)
    setShowAIHint(true)
    setTimeout(() => setShowAIHint(false), 5000)
  }

  const getGameHints = () => {
    switch (game) {
      case "monster-math":
        return [
          "Try counting on your fingers! 🖐️",
          "Break the problem into smaller parts! 🧩",
          "Remember: addition means putting numbers together! ➕",
          "For subtraction, think about taking away! ➖",
        ]
      case "rainbow-draw":
        return [
          "Try making a rainbow pattern! 🌈",
          "Click different colors to paint! 🎨",
          "Make shapes or patterns! ⭐",
          "Let your creativity flow! ✨",
        ]
      case "space-quiz":
        return [
          "Think about what you know about space! 🚀",
          "The sun is at the center of our solar system! ☀️",
          "Earth is the planet we live on! 🌍",
          "Try your best guess! 🌟",
        ]
      case "animal-sounds":
        return [
          "Think about what animal makes that sound! 🐾",
          "Listen carefully to the sound! 👂",
          "What animals do you see on farms? 🚜",
          "What animals are pets? 🏠",
        ]
      case "dance-party":
        return [
          "Watch the dance moves carefully! 👀",
          "Copy the sequence step by step! 👣",
          "Start with the first move! 1️⃣",
          "Take your time, no rush! ⏰",
        ]
      default:
        return ["You're doing great! Keep trying! 💪", "I believe in you! 🌟"]
    }
  }

  const generateNewQuestion = () => {
    setIsLoading(true)
    setTimeout(() => {
      switch (game) {
        case "monster-math":
          const range = difficulty === "easy" ? 5 : difficulty === "medium" ? 10 : 20
          const num1 = Math.floor(Math.random() * range) + 1
          const num2 = Math.floor(Math.random() * range) + 1
          const operations = difficulty === "easy" ? ["+"] : difficulty === "medium" ? ["+", "-"] : ["+", "-", "×"]
          const operation = operations[Math.floor(Math.random() * operations.length)]

          let answer, question
          if (operation === "+") {
            answer = num1 + num2
            question = `${num1} + ${num2}`
          } else if (operation === "-") {
            const larger = Math.max(num1, num2)
            const smaller = Math.min(num1, num2)
            answer = larger - smaller
            question = `${larger} - ${smaller}`
          } else {
            answer = num1 * num2
            question = `${num1} × ${num2}`
          }

          setGameState((prev) => ({
            ...prev,
            question,
            answer,
          }))
          break

        case "space-quiz":
          const allQuestions = {
            easy: [
              { q: "What planet do we live on?", a: "EARTH", options: ["EARTH", "MARS", "MOON", "SUN"] },
              { q: "What gives us light during the day?", a: "SUN", options: ["SUN", "MOON", "STARS", "EARTH"] },
              { q: "How many moons does Earth have?", a: "ONE", options: ["ONE", "TWO", "THREE", "ZERO"] },
            ],
            medium: [
              { q: "What planet is closest to the sun?", a: "MERCURY", options: ["MERCURY", "VENUS", "EARTH", "MARS"] },
              { q: "What is the biggest planet?", a: "JUPITER", options: ["JUPITER", "SATURN", "EARTH", "MARS"] },
              {
                q: "What do we call a shooting star?",
                a: "METEOR",
                options: ["METEOR", "COMET", "ASTEROID", "PLANET"],
              },
            ],
            hard: [
              { q: "Which planet has the most moons?", a: "SATURN", options: ["SATURN", "JUPITER", "EARTH", "MARS"] },
              { q: "What is the hottest planet?", a: "VENUS", options: ["VENUS", "MERCURY", "MARS", "JUPITER"] },
              {
                q: "What galaxy do we live in?",
                a: "MILKY WAY",
                options: ["MILKY WAY", "ANDROMEDA", "SPIRAL", "COSMIC"],
              },
            ],
          }

          const questions = allQuestions[difficulty]
          const selectedQuestion = questions[Math.floor(Math.random() * questions.length)]
          setGameState((prev) => ({
            ...prev,
            question: selectedQuestion.q,
            answer: selectedQuestion.a,
            options: selectedQuestion.options.sort(() => Math.random() - 0.5),
          }))
          break

        case "animal-sounds":
          const allAnimals = {
            easy: [
              { name: "COW", sound: "MOO MOO! 🐄", emoji: "🐄", hint: "I give milk and live on farms!" },
              { name: "CAT", sound: "MEOW MEOW! 🐱", emoji: "🐱", hint: "I purr and love to chase mice!" },
              { name: "DOG", sound: "WOOF WOOF! 🐶", emoji: "🐶", hint: "I'm man's best friend!" },
            ],
            medium: [
              { name: "LION", sound: "ROAR ROAR! 🦁", emoji: "🦁", hint: "I'm the king of the jungle!" },
              { name: "DUCK", sound: "QUACK QUACK! 🦆", emoji: "🦆", hint: "I swim in ponds!" },
              { name: "PIG", sound: "OINK OINK! 🐷", emoji: "🐷", hint: "I roll in mud and love food!" },
            ],
            hard: [
              { name: "ELEPHANT", sound: "TRUMPET! 🐘", emoji: "🐘", hint: "I have a long trunk and big ears!" },
              { name: "WOLF", sound: "HOWL! 🐺", emoji: "🐺", hint: "I howl at the moon!" },
              { name: "HORSE", sound: "NEIGH! 🐴", emoji: "🐴", hint: "People ride on my back!" },
            ],
          }

          const animals = allAnimals[difficulty]
          const animal = animals[Math.floor(Math.random() * animals.length)]
          setGameState((prev) => ({
            ...prev,
            currentAnimal: animal,
          }))
          break
      }
      setIsLoading(false)
    }, 500)
  }

  const celebrate = (message) => {
    setShowCelebration(true)
    setTimeout(() => {
      onGameComplete(message)
    }, 3000)
  }

  const renderDifficultySelector = () => (
    <div className="mb-6 text-center">
      <p className="text-white text-lg mb-3">Choose your difficulty:</p>
      <div className="flex justify-center space-x-3">
        {["easy", "medium", "hard"].map((level) => (
          <button
            key={level}
            onClick={() => {
              setDifficulty(level)
              generateNewQuestion()
              resetActivityTimer()
            }}
            className={`px-6 py-3 rounded-2xl font-bold text-lg transition-all ${
              difficulty === level
                ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white scale-110"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            {level === "easy" && "🟢 Easy"}
            {level === "medium" && "🟡 Medium"}
            {level === "hard" && "🔴 Hard"}
          </button>
        ))}
      </div>
    </div>
  )

  const renderMonsterMath = () => {
    const feedMonster = () => {
      resetActivityTimer()
      const answer = Number.parseInt(userInput)
      if (answer === gameState.answer) {
        const newScore = gameState.score + (difficulty === "easy" ? 10 : difficulty === "medium" ? 15 : 20)
        const newHunger = Math.max(0, gameState.monsterHunger - 25)

        if (newHunger === 0) {
          celebrate(`🎉 AMAZING! You fed the monster and scored ${newScore} points! The monster is so happy! 👾✨`)
        } else {
          setGameState((prev) => ({
            ...prev,
            score: newScore,
            monsterHunger: newHunger,
          }))
          setUserInput("")
          generateNewQuestion()
        }
      } else {
        setGameState((prev) => ({ ...prev, monsterHunger: Math.min(100, prev.monsterHunger + 5) }))
        setUserInput("")
      }
    }

    if (isLoading) {
      return (
        <div className="text-center">
          <div className="text-6xl animate-spin mb-4">🤖</div>
          <p className="text-white text-xl">Buddy is preparing a new question...</p>
        </div>
      )
    }

    return (
      <div className="text-center space-y-6">
        {renderDifficultySelector()}

        <div className="bg-gradient-to-r from-green-400/20 to-lime-400/20 backdrop-blur-sm rounded-3xl p-8 border-2 border-green-400/30">
          <h3 className="text-3xl font-bold text-white mb-4">👾 Monster Math Battle! 👾</h3>
          <div className="text-8xl mb-4 animate-bounce">{gameState.monster}</div>
          <div className="bg-red-400 rounded-full h-6 mb-4 overflow-hidden mx-auto max-w-md">
            <div
              className="bg-green-400 h-full transition-all duration-500 rounded-full"
              style={{ width: `${100 - gameState.monsterHunger}%` }}
            ></div>
          </div>
          <p className="text-white text-lg mb-4">Monster Hunger: {gameState.monsterHunger}% 🍽️</p>
          <div className="text-6xl font-bold text-yellow-300 mb-4">{gameState.question} = ?</div>
          <p className="text-white/80 text-xl">Feed the hungry monster with the right answer!</p>
        </div>

        <div className="space-y-4">
          <input
            type="number"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value)
              resetActivityTimer()
            }}
            placeholder="Your answer..."
            className="w-full max-w-md mx-auto block px-6 py-4 rounded-2xl text-center text-2xl font-bold bg-white/90 text-gray-800"
          />
          <button
            onClick={feedMonster}
            className="bg-gradient-to-r from-green-400 to-lime-400 text-white px-8 py-4 rounded-2xl font-bold text-xl hover:scale-110 transition-transform shadow-lg"
          >
            Feed Monster! 🍽️
          </button>
        </div>

        <div className="text-white text-xl">Score: {gameState.score} 🏆</div>
      </div>
    )
  }

  const renderSpaceQuiz = () => {
    const selectAnswer = (answer) => {
      resetActivityTimer()
      if (answer === gameState.answer) {
        const newStars = gameState.stars + 1
        const newPosition = Math.min(100, gameState.rocketPosition + 25)

        if (newPosition >= 100) {
          celebrate(`🚀 INCREDIBLE! You reached the stars! You answered ${newStars} questions correctly! 🌟✨`)
        } else {
          setGameState((prev) => ({ ...prev, stars: newStars, rocketPosition: newPosition }))
          generateNewQuestion()
        }
      } else {
        // Wrong answer, try again
        setTimeout(() => {
          setAiHintText("That's not quite right! Try again! 🤔")
          setShowAIHint(true)
          setTimeout(() => setShowAIHint(false), 3000)
        }, 500)
      }
    }

    if (isLoading) {
      return (
        <div className="text-center">
          <div className="text-6xl animate-spin mb-4">🚀</div>
          <p className="text-white text-xl">Flying to a new question...</p>
        </div>
      )
    }

    return (
      <div className="text-center space-y-6">
        {renderDifficultySelector()}

        <div className="bg-gradient-to-r from-blue-400/20 to-indigo-400/20 backdrop-blur-sm rounded-3xl p-8 border-2 border-blue-400/30">
          <h3 className="text-3xl font-bold text-white mb-4">🚀 Space Explorer! 🚀</h3>

          <div className="relative bg-black/30 rounded-2xl p-4 mb-6 h-20">
            <div
              className="absolute bottom-2 text-4xl transition-all duration-1000"
              style={{ left: `${gameState.rocketPosition}%` }}
            >
              🚀
            </div>
            <div className="absolute top-2 right-4 text-2xl">🌟</div>
            <div className="absolute top-4 left-1/4 text-xl">🪐</div>
            <div className="absolute bottom-4 left-1/2 text-lg">⭐</div>
          </div>

          <div className="text-2xl font-bold text-white mb-6">{gameState.question}</div>

          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            {gameState.options.map((option, index) => (
              <button
                key={index}
                onClick={() => selectAnswer(option)}
                className="bg-gradient-to-r from-purple-400 to-blue-400 text-white px-6 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-lg"
              >
                {option}
              </button>
            ))}
          </div>

          <div className="mt-4 text-white text-xl">Stars Collected: {gameState.stars} ⭐</div>
        </div>
      </div>
    )
  }

  const renderAnimalSounds = () => {
    const guessAnimal = () => {
      resetActivityTimer()
      if (userInput.toUpperCase() === gameState.currentAnimal.name) {
        const newScore = gameState.score + (difficulty === "easy" ? 10 : difficulty === "medium" ? 15 : 20)
        const newStreak = gameState.streak + 1

        if (newStreak >= 3) {
          celebrate(`🎉 FANTASTIC! You got ${newStreak} in a row! You're an animal expert! 🐾✨`)
        } else {
          setGameState((prev) => ({
            ...prev,
            score: newScore,
            streak: newStreak,
          }))
          setUserInput("")
          generateNewQuestion()
        }
      } else {
        setGameState((prev) => ({ ...prev, streak: 0 }))
        setUserInput("")
        setAiHintText("Not quite! Try again! Here's a hint: " + gameState.currentAnimal.hint)
        setShowAIHint(true)
        setTimeout(() => setShowAIHint(false), 4000)
      }
    }

    if (isLoading) {
      return (
        <div className="text-center">
          <div className="text-6xl animate-bounce mb-4">🐾</div>
          <p className="text-white text-xl">Finding a new animal friend...</p>
        </div>
      )
    }

    return (
      <div className="text-center space-y-6">
        {renderDifficultySelector()}

        <div className="bg-gradient-to-r from-orange-400/20 to-yellow-400/20 backdrop-blur-sm rounded-3xl p-8 border-2 border-orange-400/30">
          <h3 className="text-3xl font-bold text-white mb-4">🐾 Animal Sound Detective! 🐾</h3>

          <div className="text-8xl mb-4 animate-pulse">🔊</div>
          <div className="text-4xl font-bold text-yellow-300 mb-4">{gameState.currentAnimal.sound}</div>
          <p className="text-white/80 text-xl mb-6">What animal makes this sound?</p>

          <input
            type="text"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value)
              resetActivityTimer()
            }}
            placeholder="Type the animal name..."
            className="w-full max-w-md mx-auto block px-6 py-4 rounded-2xl text-center text-xl font-bold bg-white/90 text-gray-800 mb-4"
          />

          <button
            onClick={guessAnimal}
            className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-8 py-4 rounded-2xl font-bold text-xl hover:scale-110 transition-transform shadow-lg mb-4"
          >
            Guess Animal! 🐾
          </button>

          <div className="text-white/80 text-lg">Hint: {gameState.currentAnimal.hint}</div>
          <div className="text-white text-xl mt-4">
            Score: {gameState.score} | Streak: {gameState.streak} 🏆
          </div>
        </div>
      </div>
    )
  }

  const renderGame = () => {
    switch (game) {
      case "monster-math":
        return renderMonsterMath()
      case "space-quiz":
        return renderSpaceQuiz()
      case "animal-sounds":
        return renderAnimalSounds()
      default:
        return (
          <div className="text-center">
            <div className="text-6xl mb-4">🎮</div>
            <p className="text-white text-2xl">Game not available yet!</p>
            <p className="text-white/80">But don't worry, more games coming soon!</p>
          </div>
        )
    }
  }

  if (showCelebration) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-9xl mb-6 animate-bounce">🎉</div>
          <div className="text-6xl mb-4 animate-pulse">✨🌟⭐🌟✨</div>
          <h2 className="text-4xl font-bold text-white mb-4 animate-bounce">CONGRATULATIONS!</h2>
          <p className="text-white/80 text-2xl animate-pulse">You're absolutely AMAZING!</p>
          <div className="text-6xl mt-4 animate-spin">🏆</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-4 overflow-y-auto relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBackToChat}
            className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/20 font-bold text-lg hover:scale-105"
          >
            ← Back to Buddy 🤖
          </button>
          <div className="text-white/80 text-lg font-semibold">Difficulty: {difficulty.toUpperCase()} 🎯</div>
        </div>

        {renderGame()}

        {/* AI Buddy Hint Popup */}
        {showAIHint && (
          <div className="fixed bottom-20 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-4 shadow-2xl border-4 border-white/30 animate-bounce z-50 max-w-sm">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <p className="text-white font-bold text-sm mb-1">Buddy says:</p>
                <p className="text-white text-sm">{aiHintText}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PuzzleGame
