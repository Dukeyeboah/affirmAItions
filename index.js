import {categoryArr,botReplyPrompt,botAffirmationPrompt,displayAffirmation} from './data'

const setupInputContainer = document.getElementById('setup-input-container')
const affirmBotText = document.getElementById('affirm-bot-text')
const affirmationForm = document.getElementById("affirmation-form");
let categoryArrHtml = ""

generateSelectOptions()

document.getElementById("affirmation-form").addEventListener("submit", (event) => {
  event.preventDefault()
  setupInputContainer.style.display = 'flex'
  const selectedCategory = document.getElementById("category").value
  if (selectedCategory !== "") {
    setupInputContainer.innerHTML = `<p> Processing...</p>` //`<img src="images/load.svg" class="loading" id="loading" alt="loading-symbol">`//not working in browser  
      
    affirmBotText.innerText = `Thank you for picking a category, please allow my AI brain digests your choice...` 
    fetchBotReply(selectedCategory)
    fetchAffirmation(selectedCategory)
  }
  else {
    affirmBotText.innerText = `Please Select a category, so I can help you 
                              manifest your desires with the right affirmation`
  }
})

function generateSelectOptions() {
    categoryArr.forEach(item => {
    categoryArrHtml += `<option value=${item.value}>${item.option}</option>`
})
document.getElementById('category').innerHTML =categoryArrHtml
}

async function fetchBotReply(outline) {
  const url = 'https://affirmaition.netlify.app/.netlify/functions/fetchAI'

  const requestBody = JSON.stringify(botReplyPrompt(outline)); 
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain'  // used earlier - 'Content-Type': 'application/json'
    },
    body: requestBody
  })
  const data = await response.json()
  affirmBotText.innerText = data.reply.choices[0].text.trim()
}

async function fetchAffirmation(outline) {
  const url = 'https://affirmaition.netlify.app/.netlify/functions/fetchAI'

  const requestBody = JSON.stringify(botAffirmationPrompt(outline));
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain'
    },
    body:requestBody
  })
  const data = await response.json()
  const affirmation = data.reply.choices[0].text.trim()
  document.getElementById('output-text').innerText = affirmation
  displayAffirmation(setupInputContainer,affirmBotText,affirmationForm)
}
