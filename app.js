const express = require('express')

const app = express()

let zipSet = new Set()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT')
  next()
})

app.listen(3000)

app.get('/insert/:data', (req, res) => {
  const data = parseInt(req.params.data)
  if (zipSet.has(data)) {
    res.status(200).send(`zip code ${data} already existed,`)
  } else {
    zipSet.add(data)
    res.status(200).send(`zip code ${data} inserted.`)
  }
})

app.get('/has/:data', (req, res) => {
  const data = req.params.data
  res.status(200).send(zipSet.has(parseInt(data)))
})

app.get('/delete/:data', (req, res) => {
  const data = parseInt(req.params.data)
  if (zipSet.has(data)) {
    zipSet.delete(data)
    res.status(200).send(`zip code ${data} deleted.`)
  } else {
    res.status(200).send(`${data} does not exist`)
  }
})

app.get('/display', (req, res) => {
  res.status(200).send(displayAll())
})

const displayAll = () => {
  // parse all elements from set to array
  const currentZips = [...zipSet]
  let strings = []

  // check if next element is increase by 1, if it is then we put it together
  for (let start = 0; start < currentZips.length; start++) {
    let end = start
    while (
      end < currentZips.length &&
      currentZips[end] + 1 === currentZips[end + 1]
    ) {
      end++
    }
    if (end !== start) {
      strings.push(`${currentZips[start]}-${currentZips[end]}`)
      start = end
    } else {
      strings.push(`${currentZips[start]}`)
    }
  }

  return strings.join(', ')
}
