import { AppLayout } from '#layouts/app.layout'
import Game from '#models/game'

interface ShowGamePageProps {
  game: Game
}

export const ShowGamePage = (props: ShowGamePageProps) => {
  const { game } = props
  return (
    <AppLayout title={game.name}>
      <div class="max-width-wrapper flex column mt-10 gap-5">
        <h1>{game.name}</h1>
      </div>
    </AppLayout>
  )
}
