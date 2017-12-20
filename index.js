require('dotenv').config()
const axios = require('axios')
const url = `https://papertrailapp.com/api/v1/events/search.json?system_id=portalen&q=verify-signin-jwt AND "JWT ok"&limit=2500`

axios.defaults.headers.common['X-Papertrail-Token'] = process.env.API_TOKEN

function filterData (events) {
  const users = events
  .map(line => line.message)
  .map(line => line.split('-'))
  .map(line => line[line.length - 1].trim())
  return users
}

async function getData () {
  try {
    const { data } = await axios(url)
    console.log(`Analyzing ${data.events.length} events`)
    console.log(`From ${data.events[0].display_received_at}`)
    console.log(`To ${data.events[data.events.length - 1].display_received_at}`)
    const uniques = new Set(filterData(data.events))
    console.log(`Unique users: ${uniques.size}`)
  } catch (error) {
    console.error(error.message)
  }
}

getData()
