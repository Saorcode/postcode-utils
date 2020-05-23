interface ExplodedRoutingKeys {
  [key: string]: Array<string | number>
}

const explodedRoutingKeys: ExplodedRoutingKeys = {
  A: [41, 42, 45, 63, 67, 75, 81, 82, 83, 84, 85, 86, 91, 92, 94, 96, 98],
  C: [15],
  D: [1, 2, 3, 4, 5, 6, "6W", 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20,
      22, 24],
  E: [21, 25, 32, 34, 41, 45, 53, 91],
  F: [12, 23, 26, 28, 31, 35, 42, 45, 52, 56, 91, 92, 93, 94],
  H: [12, 14, 16, 18, 23, 53, 54, 62, 65, 71, 91],
  K: [32, 34, 36, 45, 56, 67, 78],
  N: [37, 39, 41, 91],
  P: [12, 14, 17, 24, 25, 31, 32, 36, 42, 47, 51, 56, 61, 67, 72, 75, 81, 85],
  R: [14, 21, 32, 35, 42, 45, 51, 56, 93, 95],
  T: [12, 23, 34, 45, 56],
  V: [14, 15, 23, 31, 35, 42, 92, 93, 94, 95],
  W: [12, 23, 34, 91],
  X: [35, 42, 91],
  Y: [14, 21, 25, 34, 45]
}

const routingKeyPrefixes = Object.keys(explodedRoutingKeys)

const routingKeys = {
  withPrefix(letter: string): Array<string> {
    if (letter === "D") {
      return explodedRoutingKeys["D"]
            .map(k => k.toString())
            .map(k => k.padStart(2, "0"))
            .map(k => "D" + k)
    }

    return [...explodedRoutingKeys[letter.toString()]
              .map(k => letter + k)]
  },
  all() : Array<string> {
    let result: Array<string> = []

    for (let prefix of routingKeyPrefixes) {
      result = [...result, ...this.withPrefix(prefix)]
    }

    return result
  }
}

const knownRoutingKeys = routingKeys.all()

class Postcode {
  routingKey: string
  identifier: string

  constructor(routingKey: string, identifier: string) {
    this.routingKey = routingKey
    this.identifier = identifier
  }

  get routingKeyIsKnown() : boolean {
    return knownRoutingKeys.includes(this.routingKey)
  }

  toString() {
    return `${this.routingKey} ${this.identifier}`
  }
}

const regexes = {
  letter: /[A-Z]/,
  number: /[1-9]/,
  alphanumeric: /[A-Z0-9]/,
  whitespace: /[\s]/g
}

function parsePostcode(input: string) : Postcode {
  // strip any whitespace from the string
  input = input.replace(regexes.whitespace, "")

  // postcodes are exactly 7 characters long, so we'll 
  if (input.length > 7) {
    throw new Error("Must contain no more than 7 non-whitespace characters")
  }

  if (input.length < 7) {
    throw new Error("Must contain at least 7 non-whitespace characters")
  }

  if (!input[0].match(regexes.letter)) {
    throw new Error("Index 0 must be an uppercase letter.")
  }

  if (!input[1].match(regexes.number)) {
    throw new Error("Index 1 must be a number.")
  }

  if (!input[2].match(regexes.number)) {
    throw new Error("Index 2 must be a number.")
  }

  for (let i = 3; i < 7; i++) {
    if (!input[i].match(regexes.alphanumeric)) {
      throw new Error(`Index ${i} must be an uppercase letter or number.`)
    }
  }

  return new Postcode(input.slice(0,3), input.slice(3))

}

console.log(parsePostcode("Y3  5H   D9 9").toString())