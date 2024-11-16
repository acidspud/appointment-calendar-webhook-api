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
    const { body } = req
    console.log(JSON.stringify(body, null, 2))

    const { date, time } = body.queryResult.parameters

    const eventStart = utils.combineDateAndTime(new Date(date), new Date(time))

    const eventEnd = new Date(eventStart)
    eventEnd.setHours(eventStart.getHours() + 1)

    let bookEvent;
    try {
        const calResult = await calendar.createCalendarEvent(eventStart, eventEnd, "DialogflowAppointment")
        bookEvent = `Booked for ${eventStart}`
    }
    catch (error){
        bookEvent = "Already booked, choose another date. here is some suggestions:"
    }
    const result = {
        "fulfillmentText": "Webservice Text response from webhook",
        "fulfillmentMessages": [{
            "text": {
                "text": [
                    bookEvent
                ]
            }
        }]
//        "outputContexts": contexts
    }
    res.json(result)
})

const port = 3000
app.listen(port, () => {
    console.log(`Webservice started and listening on port ${port}`)
})