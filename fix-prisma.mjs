import fs from 'fs'
import path from 'path'

function walk(dir) {
  let results = []
  const list = fs.readdirSync(dir)
  list.forEach((file) => {
    file = path.resolve(dir, file)
    const stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file))
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        results.push(file)
      }
    }
  })
  return results
}

const files = walk('./src')

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8')
  let changed = false
  
  if (content.includes("import { prisma } from '@/lib/prisma'")) {
    content = content.replace(/import \{ prisma \} from '@\/lib\/prisma'/g, "import prisma from '@/lib/prisma'")
    changed = true
  }

  // Also remove Header/Footer from campaigns pages
  if (file.includes('campaigns') && content.includes("import { Header }")) {
    content = content.replace(/import \{ Header \} from '@\/components\/temple\/Header'\n/g, "")
    content = content.replace(/import \{ Footer \} from '@\/components\/temple\/Footer'\n/g, "")
    content = content.replace(/<Header [^>]*>/g, "")
    content = content.replace(/<\/Header>/g, "")
    content = content.replace(/<Footer \/>/g, "")
    changed = true
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8')
    console.log('Fixed', file)
  }
})
