import env from '#start/env'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import fs from 'node:fs'
import { parse } from 'csv-parse'
import jsdom from 'jsdom'
import Link from '#models/link'
import { cuid } from '@adonisjs/core/helpers'
import stringHelpers from '@adonisjs/core/helpers/string'
import Software from '#models/software'
import Kind from '#models/kind'

export default class extends BaseSeeder {
  async run() {
    const oldProjectPath = env.get('OLD_PROJECT_PATH')
    const slash = oldProjectPath.includes('\\') ? '\\' : '/'
    const softwareCsv = fs
      .createReadStream(`${oldProjectPath}${slash}data${slash}csv${slash}softwares.csv`)
      .pipe(
        parse({
          delimiter: ';',
          columns: ['name', 'image'],
          relaxColumnCount: true,
        })
      )

    const imgDir = './public/uploads/softwares'

    if (!fs.existsSync(imgDir)) {
      fs.mkdirSync(imgDir, { recursive: true })
    }

    for await (const record of softwareCsv) {
      const softwareContent = fs.readFileSync(
        `${oldProjectPath}${slash}data${slash}${record.image}.php`,
        {
          encoding: 'utf8',
        }
      )

      const { JSDOM } = jsdom
      const { document } = new JSDOM(softwareContent).window
      const blocks = document.querySelectorAll('.block')

      let software = new Software()
      software.name = record.name
      software.slug = stringHelpers.slug(software.name)
      software.version = ''
      const imageName = `${cuid()}.jpg`
      fs.copyFileSync(
        `${oldProjectPath}${slash}assets${slash}img${slash}softwares${slash}${record.image}.jpg`,
        `${imgDir}/${imageName}`
      )
      software.picture = `/uploads/softwares/${imageName}`

      let kinds: string[] = []
      let links: Link[] = []

      if (blocks.length >= 3) {
        const infos = blocks[0].querySelectorAll('p')

        if (infos.length >= 2) {
          infos[0].firstChild?.remove()
          software.developer = infos[0].innerHTML.trim()

          infos[1].firstChild?.remove()
          kinds = infos[1].innerHTML.split(',').map((el) => el.trim())
        }

        software.description = blocks[1].querySelector('p')?.innerHTML.trim() || ''
        blocks[1].querySelector('h3')?.remove()
        blocks[1].querySelector('p')?.remove()

        blocks[1].querySelectorAll('h3').forEach((el) => {
          el.classList.add('underline')
          el.insertAdjacentHTML('afterend', '<br />')
          el.insertAdjacentHTML('beforebegin', '<br />')
        })
        software.content = blocks[1].innerHTML.trim()

        const table = blocks[2].querySelector('table')
        if (table) {
          const headers: string[] = []

          table
            .querySelectorAll('th')
            .forEach((th) => headers.push(th.textContent?.trim() || `Nom`))

          table.querySelectorAll('tr').forEach((tr, index) => {
            if (index === 0) return // Skip header row

            const tds = tr.querySelectorAll('td')

            if (tds.length > 1) {
              const link = new Link()

              tds.forEach((td) => {
                const linkElement = td.querySelector('a')
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
                } else if (linkElement) {
                  link.url = linkElement.getAttribute('href') || 'no link'
                } else {
                  link.name = td.innerHTML
                }
              })
              links.push(link)
            }
          })
        }
      } else {
      }

      software = await software.save()

      if (kinds?.length) {
        for (let index = 0; index < kinds?.length; index++) {
          const kind =
            (await Kind.findBy('name', kinds[index])) || (await Kind.create({ name: kinds[index] }))

          await software.related('kinds').save(kind)
        }
      }

      if (links?.length) {
        await Link.createMany(links.map((link) => ({ ...link, softwareId: software.id })))
      }
    }
  }
}
