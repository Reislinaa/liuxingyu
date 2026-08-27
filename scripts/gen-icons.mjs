import * as simpleIcons from 'simple-icons'
import { writeFileSync } from 'fs'
import { join } from 'path'

const APP_NAMES = [
  'wechat','qq','dingtalk','feishu','telegram','whatsapp','slack','discord','skype','line','signal','matrix','matrixorg',
  'notion','obsidian','evernote','onenote','googlekeep','logseq','anytype','appflowy','simplenote','joplin','standardnotes','simplenote',
  'visualstudiocode','sublimetext','jetbrains','intellijidea','webstorm','pycharm','goland','phpstorm','xcode','neovim','codecademy','hackclub',
  'gmail','protonmail','thunderbird','hey',
  'googlechrome','firefox','safari','brave','opera','vivaldi','torproject','duckduckgo',
  'microsoftword','microsoftexcel','microsoftpowerpoint','microsoftonenote','microsoftoutlook','microsoftedge','microsoftteams','microsoftoffice','microsoft',
  'googledocs','googlesheets','googleslides','google','googlemaps','googletranslate',
  'x','weibo','zhihu','reddit','facebook','instagram','linkedin','mastodon','threads','tumblr','medium','substack',
  'github','gitlab','bitbucket','jira','confluence','trello','asana','linear',
  'figma','sketch','adobephotoshop','adobeillustrator','adobexd','adobe','canva','framer','affinity','blender','inkscape','sketchup','dribbble','behance',
  'youtube','bilibili','tiktok','twitch','vimeo','dailymotion','netflix','spotify','applemusic','deezer','tidal','soundcloud',
  'openai','chatbot','anthropic','perplexity','huggingface','replicate',
  'apple','android','ios','macos','windows','windows11','linux','ubuntu','debian','archlinux','linuxmint',
  'iterm2','alacritty','tmux','powershell','gnuemacs',
  'alfred','raycast','todoist','ticktick','things','raindropio','notion',
  'airtable','coda','miro','mondaycom','n8n','zapier','ifttt',
  'cursor','codepen','replit','codeberg','sourcegraph','gitkraken','sourcetree',
  'zoom','googlemeet','webex','teamviewer','anydesk',
  'miro','lucid','drawio','excalidraw','whimsical',
  'jupyter','googlecolab','plotly','observable','wakkatime',
  'wikipedia','wikimedia','stackoverflow','mdnwebdocs','devto','hashnode','freecodecamp',
  'applepodcasts','pocket','instapaper','matter','readwise',
  'anchor','transistor','buzzsprout',
  'obsidian','roamresearch','capacities','heptabase',
  'nuance','dragon','otterdotai','descript',
  'hubspot','salesforce','zendesk','intercom','crisp','tawkto',
  'notion','craft','ulysses','bear','iawriter'
]

const icons = []
const seen = new Set()

for (const name of APP_NAMES) {
  if (seen.has(name)) continue
  seen.add(name)

  const variants = [
    'si' + name.charAt(0).toUpperCase() + name.slice(1),
    'si' + name.toUpperCase(),
    'si' + name
  ]

  let icon = null
  for (const v of variants) {
    if (simpleIcons[v]) {
      icon = simpleIcons[v]
      break
    }
  }

  if (icon) {
    icons.push({
      name: name,
      title: icon.title,
      hex: icon.hex,
      path: icon.path
    })
  }
}

const output = `// Auto-generated from simple-icons - ${icons.length} app icons
// Source: https://github.com/simple-icons/simple-icons
export const APP_ICONS = ${JSON.stringify(icons)}

export default APP_ICONS
`

const outPath = join(process.cwd(), 'src', 'data', 'app-icons.js')
writeFileSync(outPath, output, 'utf-8')
console.log(`Generated ${icons.length} icons -> ${outPath}`)
console.log('Titles:', icons.map(i => i.title).join(', '))

const foundNames = new Set(icons.map(i => i.name))
const missing = APP_NAMES.filter(n => !foundNames.has(n) && !(seen.has(n) && foundNames.has(n)))
console.log('\nMissing:', [...new Set(missing)].join(', '))
