const express = require('express')

const calendar =  require("./calendar")
const utils =  require("./utils")

const app = express()
app.use(express.json())

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
    console.log(req.body)


    //combineDateAndTime(date, time)
    const result = {
        "fulfillmentMessages": [{
            "text": {
                "text": [
                    "Webservice Text response from webhook"
                ]
            }
        }]
    }
    res.json(result)
})

const port = 3000
app.listen(port, () => {
    console.log(`Webservice started and listening on port ${port}`)
})