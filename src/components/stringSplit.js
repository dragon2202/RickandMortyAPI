function stringSplit(string) {
    const splitString = string.split("https://rickandmortyapi.com/api/location/")//split url to only return id
    return splitString[1]
}

export {stringSplit}