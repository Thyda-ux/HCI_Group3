"use client"

const games = [
  {
    id: "monster-math",
    title: "Monster Math Battle 👾",
    description: "Feed hungry monsters by solving math!",
    icon: "👾",
    color: "from-green-400 to-lime-400",
    working: true,
  },
  {
    id: "space-quiz",
    title: "Space Explorer 🚀",
    description: "Answer questions to fly through space!",
    icon: "🚀",
    color: "from-blue-400 to-indigo-400",
    working: true,
  },
  {
    id: "animal-sounds",
    title: "Animal Sound Detective 🐾",
    description: "Guess animals by their sounds!",
    icon: "🦁",
    color: "from-orange-400 to-yellow-400",
    working: true,
  },
  {
    id: "coming-soon-1",
    title: "Rainbow Artist 🌈",
    description: "Coming soon! Draw magical rainbows!",
    icon: "🎨",
    color: "from-pink-400 to-purple-400",
    working: false,
  },
  {
    id: "coming-soon-2",
    title: "Dance Party 💃",
    description: "Coming soon! Copy dance moves!",
    icon: "💃",
    color: "from-red-400 to-pink-400",
    working: false,
  },
  {
    id: "coming-soon-3",
    title: "Treasure Hunt 🏴‍☠️",
    description: "Coming soon! Find hidden treasures!",
    icon: "💎",
    color: "from-amber-400 to-orange-400",
    working: false,
  },
]

const GameMenu = ({ onSelectGame }) => {
  const generateGameData = (gameId) => {
    switch (gameId) {
      case "monster-math":
        const monsters = ["👾", "👹", "🤖", "👻", "🐲"]
        const selectedMonster = monsters[Math.floor(Math.random() * monsters.length)]
        return {
          monster: selectedMonster,
          question: "2 + 2", // Will be updated based on difficulty
          answer: 4,
          monsterHunger: 100,
          score: 0,
          level: 1,
        }

      case "space-quiz":
        return {
          question: "What planet do we live on?", // Will be updated based on difficulty
          answer: "EARTH",
          options: ["EARTH", "MARS", "MOON", "SUN"],
          rocketPosition: 0,
          stars: 0,
          planets: ["🪐", "🌍", "🔴", "🟡", "🔵"],
        }

      case "animal-sounds":
        return {
          currentAnimal: {
            name: "COW",
            sound: "MOO MOO! 🐄",
            emoji: "🐄",
            hint: "I give milk and live on farms!",
          },
          score: 0,
          streak: 0,
        }

      default:
        return {}
    }
  }

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-white mb-2 animate-bounce">🎮 SUPER FUN GAMES! 🎮</h2>
        <p className="text-white/80 text-xl">Choose your adventure and let's have a blast!</p>
        <div className="text-6xl animate-pulse mt-2">🌟✨🎉✨🌟</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {games.map((game, index) => (
          <button
            key={game.id}
            onClick={() => {
              if (game.working) {
                onSelectGame(game.id, generateGameData(game.id))
              }
            }}
            disabled={!game.working}
            className={`group relative overflow-hidden rounded-3xl p-6 transition-all duration-500 ${
              game.working
                ? "hover:scale-110 hover:shadow-2xl hover:rotate-2 cursor-pointer"
                : "opacity-60 cursor-not-allowed"
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-90 group-hover:opacity-100 transition-opacity`}
            ></div>
            <div className="relative z-10 text-center">
              <div
                className={`text-5xl mb-4 transition-all duration-300 ${
                  game.working ? "group-hover:animate-spin group-hover:scale-125" : ""
                }`}
              >
                {game.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-200">{game.title}</h3>
              <p className="text-white/90 text-sm leading-relaxed">{game.description}</p>
              {game.working && (
                <div className="mt-3 text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  🎯🎪🎊
                </div>
              )}
              {!game.working && <div className="mt-3 text-xl">⏳ Coming Soon!</div>}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
            {game.working && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-lg animate-bounce">
                ⭐
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-10 text-center">
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-6 max-w-4xl mx-auto border-2 border-white/20">
          <p className="text-white text-2xl font-bold mb-4">🤖 Buddy's New Super Powers! 🤖</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-white/90">
            <div className="flex flex-col items-center space-y-2 p-3 bg-white/10 rounded-2xl">
              <span className="text-3xl">⏰</span>
              <span className="font-semibold">Auto Hints</span>
              <span className="text-sm">Pops up after 15 seconds!</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-3 bg-white/10 rounded-2xl">
              <span className="text-3xl">🎯</span>
              <span className="font-semibold">3 Difficulty Levels</span>
              <span className="text-sm">Easy, Medium, Hard!</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-3 bg-white/10 rounded-2xl">
              <span className="text-3xl">🔄</span>
              <span className="font-semibold">New Questions</span>
              <span className="text-sm">Never get stuck!</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-3 bg-white/10 rounded-2xl">
              <span className="text-3xl">🎉</span>
              <span className="font-semibold">Smart Help</span>
              <span className="text-sm">Perfect guidance!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameMenu
