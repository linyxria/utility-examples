import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError() as any

  return (
    <div>
      <h2>Oops! ☹️</h2>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{error.statusText || error.message}</p>
    </div>
  )
}

export default ErrorPage
