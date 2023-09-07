import {categoryArr,botReplyPrompt,botAffirmationPrompt} from './data'

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
    setupInputContainer.innerHTML = `<p> Processing...</p>`
      // `<img src="images/load.svg" class="loading" id="loading" alt="loading-symbol">`//not working in browser
      
    affirmBotText.innerText = `Thank you for picking a category, please allow my AI brain digests your choice...` 
    fetchBotReply(selectedCategory)
    fetchAffirmation(selectedCategory)
  }
  else {
    affirmBotText.innerText = `Please Select a category, so I can help you manifest your desires with the right affirmation`
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
      'Content-Type': 'text/plain'  // used this earlier - 'Content-Type': 'application/json'
    },
    body: requestBody
  })
  const data = await response.json()
  affirmBotText.innerText = data.reply.choices[0].text.trim()
  // affirmBotText.innerText = response.data.choices[0].text.trim()
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
  displayAffirmation()
}


function displayAffirmation() {
  setupInputContainer.innerHTML = `<button id="view-affirmation-btn" class="view-affirmation-btn">affirmAItion</button>`
  document.getElementById('view-affirmation-btn').addEventListener('click', () => {

    //document.getElementById("affirmation-form").style.display = 'none' //remove dropdown
    // document.getElementById("category").style.display = 'none'
    // Disable all form elements within the form

  let formElements = affirmationForm.elements;
  for (let i = 0; i < formElements.length; i++) {
    formElements[i].disabled = true;
  }
    // document.getElementById("category").disabled = true
    setupInputContainer.innerHTML = ""
    //setupInputContainer.style.display = 'none' //remove loading section
    document.getElementById('output-container').style.display = 'flex' //display affirmation mssg container
    affirmBotText.innerText = `Repeat this affirmation with joyful emotion and strong belief 
                              that it's already done, and watch it manifest in your life.`
  })

  document.getElementById('back-to-start-btn').addEventListener('click', () => {
  for (let i = 0; i < formElements.length; i++) {
    formElements[i].disabled = false;
  }
    // document.getElementById("category").disabled = false
  document.getElementById('output-container').style.display = 'none'
  // document.getElementById('setup-container').style.display = 'flex'
  affirmBotText.innerText = `Ready to go again? Select another category of your life you want to improve
  and I'll give you the perfect affirmation to manifest it!`
  generateSelectOptions() //re-generates select box
  document.getElementById("affirmation-form").style.display = 'flex' //displays select box
  })
}
