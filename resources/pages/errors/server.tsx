interface ServerErrorPageProps {
  error: string
}

export const ServerErrorPage = ({ error }: ServerErrorPageProps) => {
  return (
    <>
      <div>500</div>
      <div>{error}</div>
    </>
  )
}
