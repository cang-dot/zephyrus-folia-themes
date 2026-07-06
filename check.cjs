const fs = require('fs')
const path = require('path')
const dist = path.join(__dirname, 'dist')

const c = fs.readFileSync(path.join(dist, 'folia-fume.js'), 'utf8')
const idx = c.indexOf('function(m,k)')
const before = c.substring(Math.max(0, idx - 30), idx)
console.log('before:', JSON.stringify(before))
