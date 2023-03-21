const getQuestions = async () => {
  try {
    const url = 'http://localhost:5000/questions'
    const res = await fetch(url)
    if (res.ok) {
      const questions = await res.json()
      return questions
    } else {
      throw new Error('There is something wrong, cannot get your data!')
    }
  } catch (error) {
    console.log(error)
  }
}
export { getQuestions }
