async function init () {
  const rawData = await fetch('https://codember.dev/data/message_01.txt')
  const data = await rawData.text()

  const animals = data.split(' ')
  const animalsMap = animals.reduce((acc, word) => {
    const key = word.toLowerCase().trim()
    const value = acc[key]

    return {
      ...acc,
      [key]: value ? value + 1 : 1
    }
  }
  , {})
  
  const result = Object.entries(animalsMap)
    .map(([key, value]) => `${key}${value}`)
    .join('')

  console.log(result)

  return result
}


init()