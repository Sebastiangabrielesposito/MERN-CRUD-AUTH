import dotenv from 'dotenv'

dotenv.config()

const obj = {
    PORT :  process.env.PORT,
    URL_MONGO : process.env.URL_MONGO
}

export default obj