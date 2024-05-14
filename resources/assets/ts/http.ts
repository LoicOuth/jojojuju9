const fetchGet = async <T>(url: string): Promise<T> => {
  const response = await fetch(url)

  return response.json() as Promise<T>
}

const fetchPost = async (url: string, body: Object) => {
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
}

const fetchPut = async (url: string, body: Object) => {
  await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
}

const fetchDelete = async (url: string) => {
  await fetch(url, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
}

export default {
  get: fetchGet,
  post: fetchPost,
  put: fetchPut,
  delete: fetchDelete,
}
