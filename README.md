# randex

<a href="https://www.npmjs.com/package/randex">
    <img src="https://nodei.co/npm/randex.png?mini=true">
</a>

TypeScript library for random thing like string, username, email, name, etc.

## Usage

Installation:

```js
npm i randex
```

Functions:

- [random](#random)
- [randomFileName](#randomfilename)
- [randomUsername](#randomusername)
- [randomEmail](#randomemail)
- [randomName](#randomname)
- [randomFullName](#randomfullname)

## random

Basic function for construct random thing.

```ts
import { random } from "randex";

// 3 english chars
random({
  set: "english",
  length: 3,
});
// EFd

// 3 lower english chars
random({
  set: ["english", "lower"],
  length: 3,
});
// yhl

// min 1 and max 3 english chars
random({
  set: "english",
  length: [1, 3],
});
// eR

// 3 number chars
random({
  set: "number",
  length: 3,
});
// 643

// 3 chars from custom range
random({
  range: "abc123",
  length: 3,
});
// a21

// 3 english or number chars
random({
  set: ["english", "number"],
  length: 3,
});

// 4 chars: 2 english and 2 english or number
random(
  {
    set: "english",
    length: 2,
  },
  {
    set: ["english", "number"],
    length: 2,
  }
);
// Kb3b
```

Options:
| Name | Type| Description|
| ------------------------ | ---- |------------ |
|set|[RandexSet](#randexset) | Defined chars|
|range|`string`| Range or custom chars |
|length|[RandexLength](#randexlength) | Length of chars |

## randomFileName

Randoms file name.

```ts
import { randomFileName } from "randex";

randomFileName({
  extension: "txt",
});

// td1TX31eOB.txt
```

Equals to:

```ts
random([["english", "number"], "_.", [5, 10]]) +
  random(["english", "number"]) +
  "." +
  (extension
    ? extension
    : random([
        ["english", "l"],
        [2, 5],
      ]));
```

## randomUsername

Randoms username.

```ts
import { randomUsername } from "randex";

// default (min - 6, max - 10 chars)
randomUsername();
// icvv81d1j

// with length 5 chars
randomUsername({ length: 5 });
// okmle

// with 2 min and 5 max chars
randomName({ length: [2, 5] });
// lkhs

```

Equals to:

```ts
random(
  ["english", "l"],
  [
    [["english", "l"], "number"],
    [5, 10],
  ]
);
```

Options:
| Name | Type| Description|
| ------------------------ | ---- |------------ |
|length|[RandexLength](#randexlength) | Length of chars |


## randomEmail

Randoms username.

```ts
import { randomEmail } from "randex";


randomEmail();
// stv4ox27sevt@mqsyin.fil

```

Equals to:

```ts
random(["english", "l"], [[["english", "l"], "number"], 10], ["english", "l"]) +
  "@" +
  random(["english", "l"], [["english", "l"], "-", [0, 5]], ["english", "l"]) +
  "." +
  random([
    ["english", "l"],
    [2, 4],
  ]);
```


## randomName

Randoms a name of the person, city, place, restaurant, ect.

```ts
import { randomName } from "randex";

// default (min - 2, max - 10 chars)
randomName();
// Ijb

// name from french alphabet
randomName({ alphabet: "french" });
// Dbïœ

// with length 5 chars
randomName({ length: 5 });
// Okmpj

// with 2 min and 5 max chars
randomName({ length: [2, 5] });
// Wslg
```

Equals to:

```ts
random(
  ["english", "u"],
  [
    ["english", "l"],
    [1, 10],
  ]
);
```

Options:
| Name | Type| Description|
| ------------------------ | ---- |------------ |
|length|[RandexLength](#randexlength) | Length of chars |
|alphabet|[RandexAlphabet](#randexalphabet) | Defined alphabet |

## randomFullName

Randoms a full name of the person.

```ts
import { randomFullName } from "randex";

randomFullName();
// Eqaa Bfmotnq
```

Options:
| Name | Type| Description|
| ------------------------ | ---- |------------ |
|firstLength|[RandexLength](#randexlength) | First name length of chars |
|secondLength|[RandexLength](#randexlength) | Second name length of chars |
|alphabet|[RandexAlphabet](#randexalphabet) | Defined alphabet |

## Types

## RandexLength

Possible types:

`number`: strict length

`[number, number]`: an array of min and max length.

## RandexSet

Possible types:

`string`: an alphabet - [RandexAlphabet](#randexalphabet) or a set of chars - [RandexKit](#randexkit)

`[string, string]`: the first item is - [RandexAlphabet](#randexalphabet), the second item is - [RandexCase](#randexcase)

## RandexAlphabet

An alphabet of chars

`string` values: `english`, `french`, `spanish`, `russian`.

## RandexKit

A kit of chars

`string` values: `hex`, `symbol`, `number`, `binary`.

## RandexCase

A case of alphabet

`string` values: `upper`, `u`,`lower`, `l`.
