const fs = require('fs')
const zlib = require('zlib')
const isArchive = fileName => /.gz/.test(fileName)
const logsDirectory = 'logs'

const files = fs.readdirSync(logsDirectory).filter(isArchive)

console.log(`Ready to extract ${files.length} files`)

files.forEach(file => {
  const fileNameIn = `${logsDirectory}/${file}`
  const fileNameOut = fileNameIn.replace('.gz', '')
  const inStream = fs.createReadStream(fileNameIn)
  const outStream = fs.createWriteStream(fileNameOut)
  inStream.pipe(zlib.Gunzip()).pipe(outStream)
  outStream.on('close', () => {
    fs.unlink(fileNameIn, () => {
      console.log(`Removed ${fileNameIn}`)
    })
  })
})

console.log('done')
