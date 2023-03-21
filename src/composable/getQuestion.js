const getQuestion = async (questId) => {
  try {
    const questions = []
    const res = await fetch(`http://localhost:5000/questions/${questId}`)
    if (res.ok) {
      const question = await res.json()
      questions.push(question)
      return questions
    } else {
      throw new Error('There is something wrong, cannot get your data!')
    }
  } catch (error) {
    console.log(error)
  }
}

export { getQuestion }
