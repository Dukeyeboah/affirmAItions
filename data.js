
const categoryArr = [
  { value: "", option: "Choose a category" },
  { value: "Housing & Home", option: "Housing & Home"},
  { value: "Finance & Wealth", option: "Finance & Wealth" },
  { value: "Health & Well-being", option: "Health & Well-being" },
  { value: "Travel & Adventure", option: "Travel & Adventure"},
  { value: "Relationships & Love", option: "Relationships & Love" },
  { value: "Creativity & Expression", option: "Creativity & Expression" },
  { value: "Career & Employment", option: "Career & Employment" },
  { value: "Education & Knowledge", option: "Education & Knowledge" },
  { value: "Spirituality & Inner Peace", option: "Spirituality & Inner Peace"},
  { value: "Personal Growth & Development", option: "Personal Growth & Development" },
  { value: "Self-confidence & Empowerment", option: "Self-confidence & Empowerment"},      
]

function botReplyPrompt(outline) {
    return {
    prompt_given: `Generate a short message to enthusiastically say the chosen outline 
       is exciting. Direct them to view affirmation below.
       ###
      outline: "Finance & Wealth"
      message: Finance and Wealth is a splendid choice, I must say! 
      Everyone loves to be wealthy! Please access your generated affirmation below.
      ###
      outline: "Relationships & Love"
      message: I love it! No pun intented. What are we without love and wonderful relationships! 
      I hope you enjoy your affirmation.
      ###
      outline: ${outline}
      message:
      `, 
    tokens: 60 // Pass maxTokens
}   
}

function botAffirmationPrompt(outline){
    return {
    prompt_given: `Generate a clear, concise, enthusiastic, emotional and powerful 
    affirmation in the present tense based on an outline
    ###
    outline: "Finance & Wealth"
    affirmation: "I am infinitely wealthy without limit. Avalanches of money flow in me in abundance"
    ###
    outline: "Self-confidence & Empowerment"
    affirmation: "I am One with the infinite Source of all Creation, called God. 
    The limitless power that creates universes flows through me always. Nothing is impossible for me to achieve."
    ###
    outline: ${outline}
    affirmation:
    `,
    tokens: 120 // Pass maxTokens
  }   
}

function displayAffirmation(setupInputContainer,affirmBotText,affirmationForm) {
  let formElements = affirmationForm.elements;
  setupInputContainer.innerHTML = `<button id="view-affirmation-btn" class="view-affirmation-btn">affirmAItion</button>`
  document.getElementById('view-affirmation-btn').addEventListener('click', () => {
  // Disable all form elements within the form
  for (let i = 0; i < formElements.length; i++) {
    formElements[i].disabled = true;
  }
    setupInputContainer.innerHTML = ""
    document.getElementById('output-container').style.display = 'flex' //display affirmation mssg container
    affirmBotText.innerText = `Repeat this affirmation with elevated joyful emotion in your body, 
                              and strong belief that it's already done, and watch it manifest in your life.`
  })

  document.getElementById('back-to-start-btn').addEventListener('click', () => {
  for (let i = 0; i < formElements.length; i++) {
    formElements[i].disabled = false;
  }
  document.getElementById('output-container').style.display = 'none'
  affirmBotText.innerText = `Ready to go again? Select another category of your life you want to improve
  and I'll give you the perfect affirmation to manifest it!`
  generateSelectOptions() //re-generates select box
  document.getElementById("affirmation-form").style.display = 'flex' //displays select box
  })
}

  
export {categoryArr,botReplyPrompt,botAffirmationPrompt,displayAffirmation}