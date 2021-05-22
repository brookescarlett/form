export function formatAmex(string: string) {
  let returnStr = "";

  for (let i = 0; i < string.length; i++) {
    if (i === 4 || i === 10) {
      returnStr += " ";
    }

    returnStr += string[i];
  }

  return returnStr;
}

export function formatVisa(string: string) {
  let returnStr = "";

  for (let i = 0; i < string.length; i++) {
    if (i === 4 || i === 8 || i === 12) {
      returnStr += " ";
    }

    returnStr += string[i];
  }

  return returnStr;
}
