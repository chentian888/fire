const { resolve } = require('path')
const fs = require('fs')
var formstream = require('formstream')
var form = formstream()
fs.stat(resolve(__dirname, './ice.jpeg'), function(err, stat) {
  console.log(stat)
  form
    .field('status', 'share picture')
    .field('access_token', 'your access token')
    .file('pic', resolve(__dirname, './ice.jpeg'), 'logo.png', stat.size)
  console.log(form)
//   filename、filelength、content-type
})
// form.file('file', resolve(__dirname, './ice.jpeg'), 'ice.jpeg')
// console.log(form.headers())
