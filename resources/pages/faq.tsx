import { Card } from '#components/card'
import { AppLayout } from '#layouts/app.layout'
import Question from '#models/question'

interface FaqProps {
  questions: Question[]
}

export const FaqPage = (props: FaqProps) => {
  const { questions } = props

  return (
    <AppLayout title="Foire aux questions">
      <>
        <h1 class="text-center underline my-10">Foire aux questions</h1>

        <div class="max-width-wrapper flex column gap-5">
          <>
            {questions.map((question) => (
              <Card title={question.question}>
                <div class="mt-5">{question.content}</div>
              </Card>
            ))}
          </>
        </div>
      </>
    </AppLayout>
  )
}
