import Comment from '#models/comment'
import { useEffect, useState } from 'preact/hooks'
import http from '../http.js'
import defaultAvatar from '../../images/default_avatar.webp'
import { Menu, MenuItem } from './menu.js'
import { Divider } from '#components/divider'
import Response from '#models/response'

interface CommentsProps {
  gameId: string
  userId?: string
}

interface CreateUpdateCommentProps {
  gameId?: string
  comment?: Comment
  refresh: () => void
  cancel?: () => void
}

interface CreateUpdateResponseProps {
  commentId?: string
  response?: Response
  refresh: () => void
  cancel?: () => void
}

interface CommentItemProps {
  comment: Comment
  userId?: string
  refresh: () => void
}

interface ResponseItemProps {
  response: Response
  userId?: string
  refresh: () => void
}

type Status = 'pending' | 'success' | 'error'

export const Comments = ({ gameId, userId }: CommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [status, setStatus] = useState<Status>()

  useEffect(() => {
    setStatus('pending')
    refreshComments()
  }, [])

  const refreshComments = () => {
    http
      .get<Comment[]>(`/api/games/${gameId}/comments`)
      .then((data) => {
        setComments(data)
        setStatus('success')
      })
      .catch(() => setStatus('error'))
  }

  if (status === 'pending') {
    return <div>Chargement...</div>
  }

  if (status === 'success' && !comments.length) {
    return (
      <>
        <h5>Aucun commentaires</h5>
        {userId && <CreateUpdateComment gameId={gameId} refresh={refreshComments} />}
      </>
    )
  }

  return (
    <div>
      <>
        {userId && <CreateUpdateComment gameId={gameId} refresh={refreshComments} />}
        <div class="mt-5 flex column gap-3">
          {comments.map((comment) => (
            <CommentItem comment={comment} userId={userId} refresh={refreshComments} />
          ))}
        </div>
      </>
    </div>
  )
}

export const CreateUpdateComment = ({
  gameId,
  comment,
  refresh,
  cancel,
}: CreateUpdateCommentProps) => {
  const [content, setContent] = useState('')
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (comment) {
      setContent(comment.content)
    }
  }, [])

  const handleCreate = () => {
    setPending(true)
    http
      .post(`/api/comments`, { content, gameId })
      .then(() => {
        setContent('')
        refresh()
      })
      .finally(() => setPending(false))
  }

  const handleUpdate = () => {
    setPending(true)
    http
      .put(`/api/comments/${comment.id}`, { content })
      .then(() => {
        setContent('')
        refresh()
      })
      .finally(() => setPending(false))
  }

  return (
    <div class="flex column items-end mt-5">
      <textarea
        class="form_control w-full"
        rows={3}
        placeholder="Ajoutez un commentaire"
        onInput={(event) => setContent((event.target as HTMLInputElement).value)}
        value={content}
      >
        {content}
      </textarea>
      <div class="flex items-center gap-3">
        {comment ? (
          <button class="button text-center flex items-center md mt-3" onClick={cancel}>
            Annuler
          </button>
        ) : (
          ''
        )}
        <button
          class="button text-center flex items-center primary md mt-3"
          onClick={comment ? handleUpdate : handleCreate}
          disabled={!content || pending}
        >
          {pending ? 'Chargement...' : comment ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </div>
    </div>
  )
}

export const CommentItem = ({ comment, userId, refresh }: CommentItemProps) => {
  const [editMode, setEditMode] = useState(false)
  const [showResponses, setShowResponses] = useState(false)

  const handleDelete = () => {
    if (confirm('Voulez-vous vraiment supprimer le commentaire ?')) {
      http.delete(`/api/comments/${comment.id}`).then(refresh)
    }
  }

  return (
    <div class="comment__item flex column gap-3">
      <div class="flex items-center justify-between">
        <a href={`/account/${comment.user.username}`} class={`flex items-center gap-3 avatar`}>
          {comment.user.avatar ? (
            <img src={comment.user.avatar} alt={comment.user.username} class="avatar__image md" />
          ) : (
            <img src={defaultAvatar} alt={comment.user.username} class="avatar__image md" />
          )}
          <span>{comment.user.username}</span>
        </a>

        {!editMode && userId === comment.userId.toString() ? (
          <div>
            <Menu button={<i class="fa-solid fa-ellipsis-vertical comment__item__icon" />}>
              <>
                <div onClick={() => setEditMode(true)}>
                  <MenuItem text="Mettre à jour" icon="fa-solid fa-pen" />
                </div>
                <div onClick={handleDelete}>
                  <MenuItem text="Supprimer" icon="fa-solid fa-trash" iconcolor="red" />
                </div>
              </>
            </Menu>
          </div>
        ) : (
          ''
        )}
      </div>

      {editMode ? (
        <CreateUpdateComment
          comment={comment}
          refresh={() => {
            setEditMode(false)
            refresh()
          }}
          cancel={() => setEditMode(false)}
        />
      ) : (
        <div class="text-lg text-preline">{comment.content}</div>
      )}

      <div class="flex items-center mt-5">
        <span class="text-caption flex-1">
          Créer le : {new Date(comment.createdAt.toLocaleString()).toLocaleString()}
          {comment.createdAt !== comment.updatedAt ? ' (Modifié)' : ''}
        </span>
        {comment.responses?.length ? (
          <span
            class="ml-5 comment__item__response__btn"
            onClick={() => setShowResponses(!showResponses)}
          >
            Voir les réponses ({comment.responses?.length})
            <i class="fa-solid fa-chevron-down ml-2" />
          </span>
        ) : (
          <span
            class="comment__item__response__btn"
            onClick={() => setShowResponses(!showResponses)}
          >
            Répondre
            <i class="fa-solid fa-reply ml-2" />
          </span>
        )}
      </div>

      {showResponses ? (
        <div class="flex column mt-3 gap-3 comment__item__response">
          <>
            {comment.responses.map((response) => (
              <ResponseItem refresh={refresh} response={response} userId={userId} />
            ))}
          </>
          {userId && <CreateUpdateResponse commentId={comment.id.toString()} refresh={refresh} />}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export const ResponseItem = ({ response, userId, refresh }: ResponseItemProps) => {
  const [editMode, setEditMode] = useState(false)

  const handleDelete = () => {
    if (confirm('Voulez-vous vraiment supprimer la réponse ?')) {
      http.delete(`/api/responses/${response.id}`).then(refresh)
    }
  }

  return (
    <div class="response flex column gap-3">
      <div class="flex items-center justify-between">
        <a href={`/account/${response.user.username}`} class={`flex items-center gap-3 avatar`}>
          {response.user.avatar ? (
            <img src={response.user.avatar} alt={response.user.username} class="avatar__image md" />
          ) : (
            <img src={defaultAvatar} alt={response.user.username} class="avatar__image md" />
          )}
          <span>{response.user.username}</span>
        </a>

        {!editMode && userId === response.userId.toString() ? (
          <div>
            <Menu button={<i class="fa-solid fa-ellipsis-vertical comment__item__icon" />}>
              <>
                <div onClick={() => setEditMode(true)}>
                  <MenuItem text="Mettre à jour" icon="fa-solid fa-pen" />
                </div>
                <div onClick={handleDelete}>
                  <MenuItem text="Supprimer" icon="fa-solid fa-trash" iconcolor="red" />
                </div>
              </>
            </Menu>
          </div>
        ) : (
          ''
        )}
      </div>

      {editMode ? (
        <CreateUpdateResponse
          response={response}
          refresh={() => {
            setEditMode(false)
            refresh()
          }}
          cancel={() => setEditMode(false)}
        />
      ) : (
        <div class="text-lg text-preline">{response.content}</div>
      )}

      <div class="flex items-center">
        <span class="text-caption mt-5 flex-1">
          Créer le : {new Date(response.createdAt.toLocaleString()).toLocaleString()}
          {response.createdAt !== response.updatedAt ? ' (Modifié)' : ''}
        </span>
      </div>
    </div>
  )
}

export const CreateUpdateResponse = ({
  commentId,
  response,
  refresh,
  cancel,
}: CreateUpdateResponseProps) => {
  const [content, setContent] = useState('')
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (response) {
      setContent(response.content)
    }
  }, [])

  const handleCreate = () => {
    setPending(true)
    http
      .post(`/api/responses`, { content, commentId })
      .then(() => {
        setContent('')
        refresh()
      })
      .finally(() => setPending(false))
  }

  const handleUpdate = () => {
    setPending(true)
    http
      .put(`/api/responses/${response.id}`, { content })
      .then(() => {
        setContent('')
        refresh()
      })
      .finally(() => setPending(false))
  }

  return (
    <div class="flex column items-end mt-5">
      <textarea
        class="form_control w-full"
        rows={3}
        placeholder="Ajoutez une réponse"
        onInput={(event) => setContent((event.target as HTMLInputElement).value)}
        value={content}
      >
        {content}
      </textarea>
      <div class="flex items-center gap-3">
        {response ? (
          <button class="button text-center flex items-center md mt-3" onClick={cancel}>
            Annuler
          </button>
        ) : (
          ''
        )}
        <button
          class="button text-center flex items-center primary md mt-3"
          onClick={response ? handleUpdate : handleCreate}
          disabled={!content || pending}
        >
          {pending ? 'Chargement...' : response ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </div>
    </div>
  )
}
