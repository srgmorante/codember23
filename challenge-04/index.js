const {files} = require('./file.js')
const moreThanOneTime = ({ name, letter} ) => {
  const times = name.split().filter(l => l === letter)
  return times?.length > 1
} 

const getAppereancesMap = name => name.split('').reduce((prev, current, index) => ({
  ...prev,
  [current]: {times: prev[current] ? Number(prev[current].times) + 1 : 1, order: prev[current] ? prev[current].order : index}
}), {})

const init = async () => {
  // const rawData = await fetch('./file.txt')
  // const text = await rawData.text()
  // const files = text.split('\n')

  console.log(files[32])

  const correctFiles = files.reduce((prev, current) => {
    const [fileName, unchecksum] = current.split('-')
    const checksums = unchecksum.split('')
    const appereances = getAppereancesMap(fileName)

    const onlyOneTime = Object.values(appereances).filter(({ times }) => {
      return times === 1
    })
    
    const checkArray = Object.keys(appereances).filter(key => {
      return checksums.includes(key) && appereances[key].times === 1
    })

    const sortedArr = checkArray.sort((keyA, keyB) => {
      return appereances[keyA].order - appereances[keyB].order;
    });

    const generatedChecksum = checkArray.join('')

    const allAreOneTime = Object.keys(appereances).length === checksums.length

    if (checkArray.length === checksums.length && generatedChecksum === unchecksum) {
      return [...prev, unchecksum]
    }
    return prev
  }, [])

  console.log(correctFiles[32])

}

init();
