const init = async () => {
  const rawData = await fetch('https://codember.dev/data/encryption_policies.txt')
  const text = await rawData.text()
  const passwords = text.split('\n')

  const invalidPasswords = passwords.reduce((prev, current) =>{
    const [policy, password] = current.split(': ')
    const [pattern, keyLetter] = policy.split(' ')
    const [minString, maxString] = pattern.split('-')

    const min = Number(minString)
    const max = Number(maxString.trim())
    
    const countLetters = (_word, letter) => _word.split('').filter(l => letter === l).length
    const count = countLetters(password, keyLetter)
    const isInvalid = count >= min && count <= max
  
    return !isInvalid ? [...prev, password] : prev
    
  }, [])

  const result = invalidPasswords[41]
  
  console.log(result)
  return result
}

init()