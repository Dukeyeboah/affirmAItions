
// import { Configuration, OpenAIApi } from 'openai'
import {categoryArr} from './data'

const setupInputContainer = document.getElementById('setup-input-container')
const affirmBotText = document.getElementById('affirm-bot-text')

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY
// })

// const openai = new OpenAIApi(configuration)

let categoryArrHtml = ""

function generateSelectOptions() {
    categoryArr.forEach(item => {
    categoryArrHtml += `<option value=${item.value}>${item.option}</option>`
})
document.getElementById('category').innerHTML =categoryArrHtml
}
generateSelectOptions()

document.getElementById("affirmation-form").addEventListener("submit", (event) => {
  event.preventDefault()
  setupInputContainer.style.display = 'flex'
  const selectedCategory = document.getElementById("category").value
  if (selectedCategory !== "") {
    setupInputContainer.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`
    affirmBotText.innerText = `Thank you for choosing a category, please wait a second while my AI brain digests your choice...` 
    fetchBotReply(selectedCategory)
    // fetchAffirmation(selectedCategory)
  }
  else {
    affirmBotText.innerText = `Please Select a category, so I can help you manifest your desires with the right affirmation`
  }
})


async function fetchBotReply(outline) {
  const url = 'https://affirmaition.netlify.app/.netlify/functions/fetchAI'

  const requestBody = JSON.stringify({
    prompt: `Generate a short message to enthusiastically say the chosen outline 
       is exciting and that you need a few seconds to think about it.
       ###
      outline: "Finance & Wealth"
      message: Lovely choice, I must say! Everyone loves to be wealthy! One second while I create your affirmation.
      ###
      outline: "Relationships & Love"
      message: I love It! No pun intented. What are we without love and wonderful relationships!
      ###
      outline: ${outline}
      message:
      `,
    tokens: 60 // Pass maxTokens
  });
    
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // 'content-type': 'text/plain',
    },
    body: requestBody
    
    // {
    //   prompt:`Generate a short message to enthusiastically say the chosen outline 
    //    is exciting and that you need a few seconds to think about it.
    //    ###
    //   outline: "Finance & Wealth"
    //   message: Lovely choice, I must say! Everyone loves to be wealthy! One second while I create your affirmation.
    //   ###
    //   outline: "Relationships & Love"
    //   message: I love It! No pun intented. What are we without love and wonderful relationships!
    //   ###
    //   outline: ${outline}
    //   message:
    //   `,
    // tokens: 60}
  })
  const data = await response.json()
  console.log(data.reply)
  
  setupInputContainer.innerText = data.reply
  affirmBotText.innerText = data.reply.choices[0].text.trim()
  
  // affirmBotText.innerText = response.data.choices[0].text.trim()

  // affirmBotText.innerText = response.data.choices[0].text.trim()
//   console.log(data)
//  conversationStr += ` ${response.data.choices[0].text} \n`
// renderTypewriterText(response.data.choices[0].text)
}

// async function fetchAffirmation(outline) {
//   const url = 'https://affirmaition.netlify.app/.netlify/functions/fetchAI'

//   const response = await fetch(url, {
//     method: 'POST',
//     headers: {
//       'content-type': 'text/plain',
//     },
//     body: {prompt:`Generate a clear, concise, enthusiastic, emotional and powerful 
//     affirmation in the present tense based on an outline
//     ###
//     outline: "Finance & Wealth"
//     affirmation: "I am infinitely wealthy without limit. Avalanches of money flow in me in abundance"
//     ###
//     outline: "Self-confidence & Empowerment"
//     affirmation: "I am One with the infinite Source of all Creation, called God. 
//     The limitless power that creates universes flows through me always. Nothing is impossible for me to achieve."
//     ###
//     outline: ${outline}
//     affirmation:
//     `,
//     max_tokens:120}
//   })
//   const data = await response.json()
//   const affirmation = data.reply.choices[0].text.trim()
//   document.getElementById('output-text').innerText = affirmation
//   // fetchTitle(affirmation)
// }



// async function fetchBotReply(outline) {
//   const response = await openai.createCompletion({
//     'model': 'text-davinci-003',
//     'prompt':
//       `Generate a short message to enthusiastically say the chosen outline 
//        is exciting and that you need a few seconds to think about it.
//        ###
//       outline: "Finance & Wealth"
//       message: Lovely choice, I must say! Everyone loves to be wealthy! One second while I create your affirmation.
//       ###
//       outline: "Relationships & Love"
//       message: I love It! No pun intented. What are we without love and wonderful relationships!
//       ###
//       outline: ${outline}
//       message:
//       `,
//     max_tokens: 60 //defaults to 16
//   })
//   affirmBotText.innerText = response.data.choices[0].text.trim()
// }

// async function fetchAffirmation(outline) {
//   const response = await openai.createCompletion({
//     model: 'text-davinci-003',
//     prompt: `Generate a clear, concise, enthusiastic, emotional and powerful 
//     affirmation in the present tense based on an outline
//     ###
//     outline: "Finance & Wealth"
//     affirmation: "I am infinitely wealthy without limit. Avalanches of money flow in me in abundance"
//     ###
//     outline: "Self-confidence & Empowerment"
//     affirmation: "I am One with the infinite Source of all Creation, called God. 
//     The limitless power that creates universes flows through me always. Nothing is impossible for me to achieve."
//     ###
//     outline: ${outline}
//     affirmation:
//     `
//     ,
//     max_tokens: 120
//   })
//   const affirmation = response.data.choices[0].text.trim()
//   document.getElementById('output-text').innerText = affirmation
//   fetchTitle(affirmation)
// }

// async function fetchTitle(affirmation) {
//   const response = await openai.createCompletion({
//     model: 'text-davinci-003',
//     prompt: `Generate a clear, terse, catchy, striking and impactful title for this affirmation: ${affirmation}`,
//     max_tokens: 25,
//     temperature: 0.7
//   })
//   const title = response.data.choices[0].text.trim()
//   document.getElementById('output-title').innerText = title

//   setupInputContainer.innerHTML = `<button id="view-affirmation-btn" class="view-affirmation-btn">View affirmAItion</button>`
//   document.getElementById('view-affirmation-btn').addEventListener('click', () => {
//     document.getElementById("affirmation-form").style.display = 'none'
//     setupInputContainer.style.display = 'none'
//     document.getElementById('output-container').style.display = 'flex'
//     // affirmBotText.innerText = `Repeat this with elevated emotion belief that it's already done, and watch it manifest in your life.`
//   })

//   document.getElementById('back-to-start-btn').addEventListener('click', () => {
//   document.getElementById('output-container').style.display = 'none'
//   document.getElementById('setup-container').style.display = 'flex'
//   affirmBotText.innerText = `Ready to go again? Select another category of your life you want to improve
//   and I'll give you the perfect affirmation to manifest it!`
//   generateSelectOptions()
//   document.getElementById("affirmation-form").style.display = 'flex'
//   })
// }
