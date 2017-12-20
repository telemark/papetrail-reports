const fs = require('fs')
const zlib = require('zlib')
const isArchive = fileName => /.gz/.test(fileName)
const logsDirectory = 'archive'

const files = fs.readdirSync(logsDirectory).filter(isArchive)
const jobs = files.length
let done = 0

function areWeDoneYet () {
  done++
  if (done === jobs) {
    console.log('finished')
  }
}

console.log(`Ready to extract ${jobs} files`)
console.log(`${jobs > 0 ? 'starting...' : 'done ;-)'}`)

files.forEach(file => {
  const fileNameIn = `${logsDirectory}/${file}`
  const fileNameOut = fileNameIn.replace('.gz', '')
  const inStream = fs.createReadStream(fileNameIn)
  const outStream = fs.createWriteStream(fileNameOut)
  inStream.pipe(zlib.Gunzip()).pipe(outStream)
  outStream.on('close', () => {
    console.log(`Extracted ${fileNameOut}`)
    fs.unlink(fileNameIn, () => {
      console.log(`Removed ${fileNameIn}`)
      areWeDoneYet()
    })
  })
})
