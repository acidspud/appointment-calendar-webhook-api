const express = require('express')
const app = express()

const calendar =  require("./calendar")

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/healthz', (req, res) => {
    res.send('Healthy!')
  })

app.get('/event', async (req, res) => {

    const eventStart = new Date()
    const eventEnd = new Date(eventStart)
    eventEnd.setHours(eventStart.getHours() + 1)

    const result = await calendar.createCalendarEvent(eventStart, eventEnd, "DialoogflowAppointment")
    // res.render("")
    res.send(result)
})

app.post('/webhook', async (req, res) => {
    console.log(req)

    const result = {
        "fulfillmentMessages": [{
            "text": {
                "text": [
                    "Webservice Text response from webhook"
                ]
            }
        }]
    }
    res.send(result)
})

app.listen(3000)