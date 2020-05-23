# postcode-utils

A collection of utilities for dealing with postcodes formatted for the Republic
of Ireland.

## Installation

    npm install @saorcode/postcode-utils --save

## Usage

### Validating and parsing a postcode

```typescript
import { parsePostcode } from "@saorcode/postcode-utils"

let postcode = parsePostcode("Y35 KD93")
let { routingKey, identifier} = postcode

console.log(`Routing key: ${routingKey}`)
console.log(`Identifier: ${identifier}`)
console.log(`Matches known routing key? ${postcode.routingKeyIsKnown}`)
```

## License

Licensed under the MIT license. See `LICENSE.md` for terms.