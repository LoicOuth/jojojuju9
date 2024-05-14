import Comment from '#models/comment'
import { useEffect, useState } from 'preact/hooks'
import http from '../http.js'
import defaultAvatar from '../../images/default_avatar.webp'
import { Menu, MenuItem } from './menu.js'

interface CommentsProps {
  gameId: string
  userId?: string
}

interface CreateUpdateCommentProps {
  gameId?: string
  comment?: Comment
  refresh: () => void
  cancel?: () => void
  response?: boolean
}

interface CommentItemProps {
  comment: Comment
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
  response = false,
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

      <span class="text-caption mt-5">
        Créer le : {new Date(comment.createdAt.toLocaleString()).toLocaleString()}
        {comment.createdAt !== comment.updatedAt ? ' (Modifié)' : ''}
      </span>
    </div>
  )
}
