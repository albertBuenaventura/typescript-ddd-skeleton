import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})
