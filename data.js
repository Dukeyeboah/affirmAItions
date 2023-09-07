
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
       is exciting. Direct them to view affirmation below, and use it with confidence and joy.
       ###
      outline: "Finance & Wealth"
      message: Finance and Wealth is a splendid choice, I must say! 
      Everyone loves to be wealthy! See your affirmation below. Remeber to speak it with joyful emotion.
      ###
      outline: "Relationships & Love"
      message: I love it! No pun intented. What are we without love and wonderful relationships! 
      I hope you enjoy your affirmation, and speak it daily with conviction and belief.
      ###
      outline: ${outline}
      message:
      `,
    tokens: 60 // Pass maxTokens
}
    
}

  
export {categoryArr,botReplyPrompt}