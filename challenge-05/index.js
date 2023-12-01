const { entries } = require('./file.js')


const init = async () => {
  const result = entries.reduce((prev, current) => {
    const [id, username, email, age, city] = current.split(',')

    const validId = id && (/^[a-z0-9]+$/i).test(id)

    const validUsername = username && (/^[a-z0-9]+$/i).test(username)

    const validEmail = email && (/^[a-z0-9]+@[a-z0-9]+\.[a-z]+$/i).test(email)

    const validAge = age ? typeof Number(age) === 'number': true

    const validCity = city ? typeof city === 'string' : true

    const isValidEntry = validId && validUsername && validEmail && validAge && validCity

    if (!isValidEntry) {
      return prev += username[0]
    }

    return prev
  }, '') 

  console.log(result)

  return result
}

init();
