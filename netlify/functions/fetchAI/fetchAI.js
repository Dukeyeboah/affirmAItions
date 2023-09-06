import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

const handler = async (event) => {
  try {
    const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt:event.body.prompt,
    max_tokens: event.body.tokens //defaults to 16
  })

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: response.data 
      }),
      
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }


 // const subject = event.queryStringParameters.name || 'World'

// const response = await openai.createCompletion({
    //         model: 'davinci:ft-scrimba-2023-03-30-23-10-03',
    //         prompt: event.body,
    //         presence_penalty: 0,
    //         frequency_penalty: 0.3,
    //         max_tokens: 100,
    //         temperature: 0,
    //         stop: ['\n', '->']
    // })