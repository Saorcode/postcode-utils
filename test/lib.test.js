const utils = require("../lib")

test("parses valid postcode with space between routing key, identifier", () => {
  let input = "T12 P3J8"

  let postcode = utils.parsePostcode(input)

  expect(postcode.routingKey).toBe("T12")
  expect(postcode.identifier).toBe("P3J8")
})

test("parses correctly formed postcodes", () => {
  let inputs = {
    "X63P9O3": ["X63", "P9O3"],
    "T99KD73": ["T99", "KD73"],
    "A000000": ["A00", "0000"],
    "B121212": ["B12", "1212"],
    "Z92AAAA": ["Z92", "AAAA"]
  }

  for (let [input, exploded] of Object.entries(inputs)) {
    let [routingKey, identifier] = exploded
    let postcode = utils.parsePostcode(input)
    
    expect(postcode.routingKey).toBe(routingKey)
    expect(postcode.identifier).toBe(identifier)
  }
})

test("throws error when only three characters present", () => {
  let input = "T12"

  try {
    let postcode = utils.parsePostcode(input)
    expect(true).toBe(false)
  } catch (e) {
    expect(e).toBeInstanceOf(utils.ParseError)
    expect(e.position).toBe(2)
  }
})

test("throws error when only six characters present", () => {
    let input = "T12LK3"
  
    try {
      let postcode = utils.parsePostcode(input)
      expect(true).toBe(false)
    } catch (e) {
      expect(e).toBeInstanceOf(utils.ParseError)
      expect(e.position).toBe(5)
    }
})

test("throws error when more than seven characters present", () => {
  let input = "T12LK3PQ"

  try {
    let postcode = utils.parsePostcode(input)
    expect(true).toBe(false)
  } catch (e) {
    expect(e).toBeInstanceOf(utils.ParseError)
    expect(e.position).toBe(7)
  }
})

test("throws error when first character is not a letter", () => {
  let input = "8JKO3P5"

  try {
    let postcode = utils.parsePostcode(input)
    expect(true).toBe(false)
  } catch (e) {
    expect(e).toBeInstanceOf(utils.ParseError)
    expect(e.position).toBe(0)
  }
})

test("throws error when second character is not a number", () => {
  let input = "TT2PX45"

  try {
    let postcode = utils.parsePostcode(input)
    expect(true).toBe(false)
  } catch (e) {
    expect(e).toBeInstanceOf(utils.ParseError)
    expect(e.position).toBe(1)
  }
})

test("throws error when third character is not a number", () => {
  let input = "T3YPX45"

  try {
    let postcode = utils.parsePostcode(input)
    expect(true).toBe(false)
  } catch (e) {
    expect(e).toBeInstanceOf(utils.ParseError)
    expect(e.position).toBe(2)
  }
})

test("throws error when any characters 3-6 is not a number", () => {
  let inputs = {
    "T12@@@@": 3,
    "T125@@@": 4,
    "T1232@@": 5,
    "T29023@": 6,
    "T43;F56": 3,
    "P438=09": 4,
    "O83LD>3": 5
  }

  for (let [input, expectedPos] of Object.entries(inputs)) {
    try {
      let postcode = utils.parsePostcode(input)
      expect(true).toBe(false)
    } catch (e) {
      expect(e).toBeInstanceOf(utils.ParseError)
      expect(e.position).toBe(expectedPos)
    }
  }
})