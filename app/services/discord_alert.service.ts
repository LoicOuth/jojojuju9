import Comment from '#models/comment'
import Response from '#models/response'
import User from '#models/user'
import env from '#start/env'
import logger from '@adonisjs/core/services/logger'
import router from '@adonisjs/core/services/router'
import { DateTime } from 'luxon'

interface DiscordMessageBody {
  content: string
}

export class DiscordAlertService {
  private discordWebhokChannel: string
  private appUrl: string

  constructor() {
    this.discordWebhokChannel = env.get('DISCORD_WEBHOOK_CHANNEL')
    this.appUrl = env.get('APP_URL')
  }

  private async sendMessage(body: DiscordMessageBody) {
    try {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      await fetch(this.discordWebhokChannel, {
        method: 'POST',
        body: JSON.stringify(body),
        headers,
      })
    } catch (error) {
      logger.error({ error }, 'Error during send discord message')
    }
  }

  private buildMessage(
    isGame: boolean,
    typeSlug: string,
    typeTitle: string,
    createdAt: DateTime,
    content: string,
    user: User
  ) {
    const type = isGame ? 'jeu' : 'logiciel'
    const url = router
      .builder()
      .params({ slug: typeSlug })
      .prefixUrl(this.appUrl)
      .make(`${isGame ? 'games' : 'softwares'}.show`)

    return `>>> Un nouveau commentaire a été posté sur le ${type} **${typeTitle}**. Voici les détails du commentaire :
- Auteur du commentaire : ${user.username}
- Date et heure ${createdAt.toFormat('dd/LL/yyyy HH:mm', { locale: 'fr' })}
- Contenu du commentaire : ${content}

Nous vous invitons à examiner ce commentaire et à prendre les mesures nécessaires si besoin.
Pour consulter le commentaire, cliquez ici : ${url}#comments`
  }

  async alertOnNewComment(comment: Comment) {
    await comment.load('user')
    if (comment.gameId) {
      await comment.load('game')
    } else if (comment.softwareId) {
      await comment.load('software')
    }

    const isGame = !!comment.gameId
    const typeTitle = isGame ? comment.game.name : comment.software.name
    const typeSlug = isGame ? comment.game.slug : comment.software.slug

    const content = this.buildMessage(
      isGame,
      typeSlug,
      typeTitle,
      comment.createdAt,
      comment.content,
      comment.user
    )

    await this.sendMessage({ content })
  }

  async alertOnNewResponse(response: Response) {
    await response.load((loader) => {
      loader
        .load('comment', (commentQuery) => {
          commentQuery.preload('game').preload('software')
        })
        .load('user')
    })

    const isGame = !!response.comment.gameId
    const typeTitle = isGame ? response.comment.game.name : response.comment.software.name
    const typeSlug = isGame ? response.comment.game.slug : response.comment.software.slug

    const content = this.buildMessage(
      isGame,
      typeSlug,
      typeTitle,
      response.createdAt,
      response.content,
      response.user
    )

    await this.sendMessage({ content })
  }
}
