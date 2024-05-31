import { ContactProblem, ContactProblemEmailText } from '#types/contact'

interface ContactEmailTemplateProps {
  pseudo: string
  content: string
  email: string
  problem: ContactProblem
}

export const ContactEmailTemplate = (props: ContactEmailTemplateProps) => {
  const { content, email, pseudo, problem } = props

  return (
    <div>
      <h1>
        Emvoyé par {pseudo} ({email})
      </h1>
      <h3>{ContactProblemEmailText[problem]}</h3>

      <p>{content}</p>
    </div>
  )
}
