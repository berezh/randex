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

- [`random` function](#random-function)
- [randomFileName](#randomfilename)
- [randomUsername](#randomfilename)
- [randomEmail](#randomfilename)
- [randomName](#randomfilename)
- [randomFullName](#randomfilename)


## `random` function

Basic function for construct random thing.

```ts
import { random } from 'randex';

random(
    {
        set: "alphabet",
        length: 2,
    },
    {
        set: ["alphabet", "number"],
        length: 2,
    }
);

// gTo3
```

Options:
| Name                     |  Type| Description|
| ------------------------ | ---- |------------ |
|set| `hex`, `symbol`, `alphabet`, `alphabetLower`, `alphabetUpper`, `number`, `binary` | Set of predefined chars|
|range|`string`| Range or custom chars |
|length|`number`, `[number, number]` | Length or min and max length of chars are needed to be generated |



## randomFileName

Randoms file name.

```ts
import { randomFileName } from 'randex';

randomFileName(
    {
        extension: 'txt'
    },
);

// FSCOuNN.txt
```

Equals to: 
```ts
random([["alphabet", "number"], "_.", [5, 10]]) + random(["alphabet", "number"]) + "." + (extension ? extension : random(["alphabetLower", [2, 5]]));
```

## randomUsername

Randoms username.

```ts
import { randomUsername } from 'randex';


randomUsername();

// icvv81d1j
```

Equals to: 
```ts
random("alphabetLower", [
    ["alphabetLower", "number"],
    [5, 10],
  ]);
```

## randomEmail

Randoms username.

```ts
import { randomEmail } from 'randex';


randomEmail();

// dwrq4wu54nzj@dhvy.dtk
```

Equals to: 
```ts
random("alphabetLower", [["alphabetLower", "number"], 10], "alphabetLower") +
    "@" +
    random("alphabetLower", ["alphabetLower", "-", [0, 5]], "alphabetLower") +
    "." +
    random(["alphabetLower", [2, 4]]);
```

## randomName

Randoms a name of the person, city, place, restaurant, ect.

```ts
import { randomName } from 'randex';


randomName();

// Txotsaw
```

Equals to: 
```ts
random("alphabetUpper", ["alphabetLower", [1, 10]]);
```

## randomFullName

Randoms a full name of the person.

```ts
import { randomFullName } from 'randex';


randomFullName();

// Eqaa Bfmotnq
```

Equals to: 
```ts
random("alphabetUpper", ["alphabetLower", [1, 10]]) + " " + random("alphabetUpper", ["alphabetLower", [1, 10]]);
```

