# randex

TypeScript library to random most common things like filename, username, email, name, full name, etc.

<a href="https://www.npmjs.com/package/randex">
    <img src="https://nodei.co/npm/randex.png?mini=true">
</a>

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

Deeps:

- [Customization](#customization)
- [Types](#types)

## random

Basic function to construct random things.

```ts
import { random } from "randex";

// 3 english chars
random({
  set: "english",
  length: 3,
});
// or short:
random(["english", 3]);
// EFd

// 3 lower english chars
random({
  set: ["english", "lower"],
  length: 3,
});
// or short:
random([["english", "lower"], 3]);
// yhl

// min 1 and max 3 english chars
random({
  set: "english",
  length: [1, 3],
});
// or short:
random(["english", [1, 3]]);
// eR

// 3 number chars
random({
  set: "number",
  length: 3,
});
// or short:
random(["number", 3]);
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
// or short:
random([["english", "number"], 3]);
// x4d

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
// or short:
random(["english", 2], [["english", "number"], 2]);
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

// default
randomFileName({
  extension: "txt",
});
// td1TX31eOB.txt

// defined extension
randomFileName({
  extension: "txt",
});
// or short:
randomFileName("txt");
// HkmOjqHC6.txt

// defined file name length and extension length
randomFileName({
  fileNameLength: [7, 10],
  extensionLength: 5,
});
// or short:
randomFileName([7, 10], 5);
// 1SJVkHSBjq.tejuw

// defined file name length and extension
randomFileName({
  fileNameLength: 8,
  extension: "xml",
});
// or short:
randomFileName(8, "xml");
// JyCsuN5kD.xml
```

Options:
| Name | Type| Description|
| ------------------------ | ---- |------------ |
|fileNameLength|[RandexLength](#randexlength) | Length of file name (not including extension). Default: [3,10] |
|extensionLength|[RandexLength](#randexlength) | Length of extension (not including file name) chars. Default: [2,5] |
|extension| `string`| File extension. |

## randomUsername

Randoms username.

```ts
import { randomUsername } from "randex";

// default
randomUsername();
// icvv81d1j

// with length 5 chars
randomUsername({ length: 5 });
// or short:
randomUsername(5);
// okmle

// with 2 min and 5 max chars
randomName({ length: [2, 5] });
// or short:
randomUsername([2, 5]);
// lkhs
```

Options:
| Name | Type| Description|
| ------------------------ | ---- |------------ |
|length|[RandexLength](#randexlength) | Length of chars. Default: [6,10] |

## randomEmail

Randoms an email.

```ts
import { randomEmail } from "randex";

// default
randomEmail();
// stv4ox27sevt@mqsyin.fil

// defined prefix length
randomEmail({
  prefixLength: 8,
});
// or shot:
randomEmail(8);
// epzn3hbz@vu.xsp

// defined prefix, low domain and hight domain length
randomEmail({
  prefixLength: 8,
  lowDomainLength: 4,
  hightDomainLength: 2,
});
// or shot:
randomEmail(8, 4, 2);
// 8p0bjoua@fcsa.gr

// defined domain
randomEmail({
  domain: "test.com",
});
// or shot:
randomEmail("test.com");
// efnmo1r5@test.com
```

Options:
| Name | Type| Description|
| ------------------------ | ---- |------------ |
|prefixLength|[RandexLength](#randexlength) | Length of email prefix (chars before `@`). Default: [6, 10] |
|hightDomainLength|[RandexLength](#randexlength) | Length of hight domain part (example: test.<b>com</b>). Default: [1,6] |
|lowDomainLength|[RandexLength](#randexlength) | Length of low domain part (example: <b>test</b>.com). Default: [4,2] |
|domain| `string`| Defined domain. |

## randomName

Randoms a name of the person, city, place, restaurant, ect.

```ts
import { randomName } from "randex";

// default
randomName();
// Ijb

// with length 5 chars
randomName({ length: 5 });
// or short:
randomName(5);
// Okmpj

// with 2 min and 5 max chars
randomName({ length: [2, 5] });
// or short:
randomName([2, 5]);
// Wslg

// name from french alphabet
randomName({ alphabet: "french" });
// or short:
randomName("french");
// Dbïœ

// name from french alphabet with length
randomName({ alphabet: "french", length: 10 });
// or short:
randomName("french", 10);
// Rsîrjhjôôw
```

Options:
| Name | Type| Description|
| ------------------------ | ---- |------------ |
|length|[RandexLength](#randexlength) | Length of chars. Default: [2,10] |
|alphabet|[RandexAlphabet](#randexalphabet) | Defined alphabet. Default: `english` |

## randomFullName

Randoms a full name of the person.

```ts
import { randomFullName } from "randex";

// default
randomFullName();
// Eqaa Bfmotnq
```

Options:
| Name | Type| Description|
| ------------------------ | ---- |------------ |
|firstLength|[RandexLength](#randexlength) | First name length of chars. Default: [2, 10] |
|secondLength|[RandexLength](#randexlength) | Second name length of chars. Default: [2,10] |
|alphabet|[RandexAlphabet](#randexalphabet) | Defined alphabet. Default: `english` |

## Customization

[random](#random) function is very flexible, there are many custom functions can be created.

There are examples how to create custom function for most common cases:

<b>randomFileName</b>

```ts
random([["english", "number"], "_.", [5, 10]]) +
  random(["english", "number"]) +
  "." +
  random([
    ["english", "l"],
    [2, 5],
  ]);
```

<b>randomUsername</b>

```ts
random(
  ["english", "l"],
  [
    [["english", "l"], "number"],
    [5, 10],
  ]
);
```

<b>randomEmail</b>

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

<b>randomName</b>

```ts
random(
  ["english", "u"],
  [
    ["english", "l"],
    [1, 10],
  ]
);
```

<b>randomFullName</b>

```ts
random(
  ["english", "u"],
  [
    ["english", "l"],
    [1, 10],
  ]
) +
  " " +
  random(
    ["english", "u"],
    [
      ["english", "l"],
      [1, 10],
    ]
  );
```

## Types

## RandexLength

Possible types:

`number`: strict length

`[number, number]`: an array of min and max length.

Example:

```ts
random({ set: "bit", length: 5 });
random({ set: "bit", length: [5, 10] });
// or short:
random(["bit", 5]);
random(["bit", [5, 10]]);
```

## RandexSet

Possible types:

`string`: an alphabet - [RandexAlphabet](#randexalphabet) or a set of chars - [RandexKit](#randexkit)

`[string, string]`: the first item is - [RandexAlphabet](#randexalphabet), the second item is - [RandexCase](#randexcase)

Example:

```ts
random({ set: "bit" });
random({ set: "spanish" });
random({ set: ["spanish", "lower"] });
// or short:
random("bit");
random("spanish");
random(["spanish", "l"]);
```

## RandexAlphabet

An alphabet of chars

`string` values: `english`, `french`, `spanish`, `russian`.

Example:

```ts
random({ set: "spanish" });
// or short:
random("spanish");
```

## RandexKit

A kit of chars

`string` values: `hex`, `symbol`, `number`, `binary`.

Example:

```ts
random({ set: "hex" });
// or short:
random("hex");
```

## RandexCase

A case of alphabet

`string` values: `upper`, `u`,`lower`, `l`.

Example:

```ts
random({ set: ["spanish", "lower"] });
// or short:
random(["spanish", "l"]);
```
