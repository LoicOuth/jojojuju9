import User from '#models/user'
import { Vite } from '#start/view'

interface AvatarProps {
  id?: string
  location?: 'left' | 'right'
  user: User
  size?: 'md' | 'lg'
}

export const Avatar = (props: AvatarProps) => {
  const { user, id, size = 'md', location = 'right' } = props

  return (
    <div
      id={id}
      class={`flex items-center gap-3 avatar ${size} ${location === 'left' ? 'avatar--reverse' : ''}`}
    >
      <span>{user.username}</span>
      {user.avatar ? (
        <img src={user.avatar} alt={user.username} class={`avatar__image ${size}`} />
      ) : (
        <Vite.Image
          src="resources/assets/images/default_avatar.webp"
          alt={user.username}
          class={`avatar__image ${size}`}
        />
      )}
    </div>
  )
}
