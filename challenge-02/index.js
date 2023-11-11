const symbolsMap = {
  "#": (value) => value + 1,
  "@": (value) => value - 1,
  "*": (value) => value * value,
  "&": () => {}
}

async function init () {
  const rawData = await fetch('https://codember.dev/data/message_02.txt')
  const code = await rawData.text()
  const symbols = code.split('')

  const result = symbols.reduce((acc, symbol) => {
    const { finalString, value: accValue } = acc
    const value = symbolsMap[symbol](Number(accValue))

    if (value === undefined) {
      return { finalString: `${finalString}${accValue}`, value: Number(accValue) }
    }

    return { finalString, value }
  }, { finalString: '', value: 0 })

  console.log(result)

  return result.finalString
}


init()