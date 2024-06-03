import env from '#start/env'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import fs from 'node:fs'
import { parse } from 'csv-parse'
import { parse as HtmlParse } from 'node-html-parser'
import Game from '#models/game'
import Link from '#models/link'
import { cuid } from '@adonisjs/core/helpers'
import stringHelpers from '@adonisjs/core/helpers/string'
import Kind from '#models/kind'

export default class extends BaseSeeder {
  async run() {
    const oldProjectPath = env.get('OLD_PROJECT_PATH')
    const gameCsv = fs.createReadStream(`${oldProjectPath}\\data\\csv\\games.csv`).pipe(
      parse({
        delimiter: ';',
        columns: ['name', 'image', 'version', 'dlc', 'multiplayer'],
        relaxColumnCount: true,
      })
    )

    for await (const record of gameCsv) {
      const gameContent = fs.readFileSync(`${oldProjectPath}\\data\\${record.image}.php`, {
        encoding: 'utf8',
      })

      const root = HtmlParse(gameContent, {})
      const blocks = root.querySelectorAll('.block')

      let game = new Game()
      game.name = record.name
      game.slug = stringHelpers.slug(game.name)
      game.withDlc = record.dlc === 'x'
      game.multiplayer = record.multiplayer === 'x'
      game.version =
        record.version.split('Version')[1]?.trim() || record.version.split('Version')[0].trim()
      const imageName = `${cuid()}.jpg`
      fs.copyFileSync(
        `${oldProjectPath}\\assets\\img\\games\\${record.image}.jpg`,
        `./public/uploads/games/${imageName}`
      )
      game.picture = `/uploads/games/${imageName}`

      let kinds: string[] = []
      let links: Link[] = []

      if (blocks.length >= 4) {
        const infos = blocks[0].querySelectorAll('p')

        if (infos.length === 3) {
          infos[0].firstChild?.remove()
          game.developer = infos[0].innerText.trim()

          infos[1].firstChild?.remove()
          kinds = infos[1].innerText.split(',').map((el) => el.trim())

          infos[2].firstChild?.remove()
          game.mode = infos[2].innerText.trim()
        }

        const config = blocks[1].querySelectorAll('p')
        if (config.length >= 5) {
          config[0].firstChild?.remove()
          game.os = config[0].innerText.trim()

          config[1].firstChild?.remove()
          game.cpu = config[1].innerText.trim()

          config[2].firstChild?.remove()
          game.memory = config[2].innerText.trim()

          config[3].firstChild?.remove()
          game.gpu = config[3].innerText.trim()

          config[4].firstChild?.remove()
          game.storage = config[4].innerText.trim()
        }

        game.description = blocks[2].querySelector('p')?.innerText.trim() || ''
        blocks[2].querySelector('h3')?.remove()
        blocks[2].querySelector('p')?.remove()

        blocks[2].querySelectorAll('h3').forEach((el) => {
          el.classList.add('underline')
          el.insertAdjacentHTML('afterend', '<br />')
          el.insertAdjacentHTML('beforebegin', '<br />')
        })
        game.content = blocks[2].innerHTML.trim()

        const table = blocks[3].querySelector('table')
        if (table) {
          const headers: string[] = []

          table.querySelectorAll('th').forEach((th) => headers.push(th.textContent.trim() || `Nom`))

          table.querySelectorAll('tr').forEach((tr, index) => {
            if (index === 0) return // Skip header row

            const tds = tr.querySelectorAll('td')

            if (tds.length > 1) {
              const link = new Link()

              tds.forEach((td) => {
                const linkElement = td.querySelector('a')
                const iconElement = td.querySelector('i')
                const imgElements = td.querySelectorAll('img')

                if (imgElements.length) {
                  imgElements.forEach((img) => {
                    if (
                      img.getAttribute('alt')?.includes('Winrar') ||
                      img.getAttribute('src')?.includes('Winrar')
                    ) {
                      link.requiredWinrar = true
                    } else if (
                      img.getAttribute('alt')?.includes('uTorrent') ||
                      img.getAttribute('src')?.includes('uTorrent')
                    ) {
                      link.requiredUtorrent = true
                    } else if (
                      img.getAttribute('alt')?.includes('Daemon tools') ||
                      img.getAttribute('src')?.includes('Daemon tools')
                    ) {
                      link.requiredDaemon = true
                    }
                  })
                } else if (iconElement) {
                  if (iconElement.classList.contains('fa-check')) {
                    link.multiplayer = true
                  } else if (iconElement.classList.contains('fa-times')) {
                    link.multiplayer = false
                  } else if (iconElement.classList.contains('fa-exclamation-triangle')) {
                    link.name = iconElement.innerText
                  }
                } else if (linkElement) {
                  link.url = linkElement.getAttribute('href') || 'no link'
                } else {
                  link.name = td.innerText
                }
              })
              links.push(link)
            }
          })
        }
      } else {
      }

      game = await game.save()

      if (kinds?.length) {
        for (let index = 0; index < kinds?.length; index++) {
          const kind =
            (await Kind.findBy('name', kinds[index])) || (await Kind.create({ name: kinds[index] }))

          await game.related('kinds').save(kind)
        }
      }

      if (links?.length) {
        await Link.createMany(links.map((link) => ({ ...link, gameId: game.id })))
      }
    }
  }
}
