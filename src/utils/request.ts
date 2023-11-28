const request = <T>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> => {
  return new Promise((resolve, reject) => {
    fetch(input, init)
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((data) => resolve(data))
            .catch((err) => reject(err))
        }
      })
      .catch((err) => reject(err))
  })
}

export default request
