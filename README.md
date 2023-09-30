# Notes from taking the React w/ Typescript, Typescript, and React.gg courses on ui.dev

# React w/ typscript

## React Elements and Components

**[Elements](https://react.dev/reference/react/createElement)**: are just the templates, they have no state or props.

**[Components](https://react.dev/reference/react/Component#component)**: are the functions that hold props and state and render React Elements

### Defining Props

You can use interfaces, type aliases, or literal objects to define props

// Easiest way to declare a Function Component; return type is inferred.

```
const App = ({ message }: AppProps) => <div>{message}</div>;
```

Type widening with built in HTML prop types

```
import { ComponentPropsWithoutRef } from "react";

// Option 1
type ButtonProps = {
  variant?: "primary" | "success" | "warning" | "danger";
} & ComponentPropsWithoutRef<"button">;

// Option 2
interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "success" | "warning" | "danger";
}

const Button: React.FC<ButtonProps> = ({
  variant,
  className = "",
  ...props
}) => {
  return (
    <button {...props} className={`${className} ${variant}`} />
  );
};

//or
const Button = ({variant, className, children, ...props}: ButtonProps) => {
    return (
        <button {...props} className={`${className} ${variant}`} />
    );
}

```

## Event Handlers

Using built in React event types for `onCLick` or `onKeyDown` events

```
const App = () => {
  function handleOnChange(event: React.FormEvent<HTMLInputElement>):void {
    // ...
  }

  return <input type="text" onChange={handleOnChange}>
}
```

Alternatively,

```
const App = () => {
  const handleOnChange:ChangeEventHandler<HTMLInputElement> = (event) => {
    // ...
  }

  return <input type="text" onChange={handleOnChange}>
}
```

If we have other properties that aren't represented on the basic React Event types.
We can "Type Widen" our React Event type to account for these

```
interface FormFields {
  email: HTMLInputElement;
  message: HTMLTextAreaElement;
}
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const target = event.target as typeof event.target & FormFields;

  const formValues = {
    email: target.email.value,
    message: target.message.value,
  };

  // Do whatever with the form values.
}
```

## Refs

```
const Form = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const onClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }
  return <input type="text" ref={inputRef} onClick={onClick}>
}
```

If our useRef value isn't an HTML element, we can define that

```
const App = () => {
  const stringRef = useRef("Hello there!");
  const maybeNumberRef = useRef<number | null>(null);
  // ...
};
```

If we need to forward refs, it's a bit tricky but done like so:

```
import { forwardRef } from "react";
const Input = forwardRef<HTMLInputElement, { disabled?: boolean }>(
  ({ disabled }, ref) => {
    return <input ref={ref} disabled={disabled} />;
  },
);
```

# Typescript

## inferring types

typescript automatically infers types when directly used inside functions

But typescitpt cannot infer when we define an external function

```
let fruitNames = ["Apple", "Banana"];

const nameLength = fruitNames.map((name) => {
  return name.length;
});

nameLength; // const nameLength: number[]
```

```
function alternateUppercase(name, index) {
  // (parameter) name: any
  // (parameter) index: any
  if (index % 2 === 0) {
    return name.toUpperCase();
  }
  return name;
}

fruitNames.map(alternatedFruitNames);
```

## defining types to variables

If we actually do intend to use the value whether it is undefined or not, we can use a non-null assertion to tell TypeScript that we don't care if our variable is used before being assigned. It looks like an exclamation point before the colon:

```
let floralArrangement!: string;
```

## typing functions return values

```
const headsOrTails = (): boolean => {
  return Math.random() > 0.5;
};
```

ex with async promise

```
async function getFruitList(): Promise<string[]> {
  const response = await fetch("https://example.com/fruit");
  const fruitList: string[] = await response.json();
  return fruitList;
}
```

typing callbacks within functions

```
function mapNumberToNumber(
  list: number[],
  callback: (item: number) => number,
) {
  // (parameter) callback: (item: number) => number
  // Implementation goes here
}
```

## insted of using any, we prefer unknown and a type narrowing / type check

```
const unknownNumber: unknown = 27;

let theAnswer: number = 0;
if (typeof unknownNumber === "number") {
  theAnswer = 15 + unknownNumber;
}
```

### Creating indexable types and interfaces

```
interface Fruit {
  name: string;
  color: string;
  sweetness: number;
  stars: number;
}

interface FruitCache {
  [id: string]: Fruit
}

const fruitCache: FruitCache = {};

async function fetchFruitOrUseCache(id: string) {
  if (fruitCache[id]) {
    return fruitCache[id];
  }
  const response = await fetch(`https://example.com/fruit/${id}`);
  const fruit: Fruit = await response.json();
  fruitCache[id] = fruit;
  return fruit;
}
```

## Enums and Tuples

Enums

```
enum Seasons {
  winter,
  spring,
  summer,
  autumn,
}

function seasonsGreetings(season: Seasons) {
  if ((season = Seasons.winter)) return "⛄️";
  // ...
}

const greeting = seasonsGreetings(Seasons.winter);
```

Tuples

```
[number, number]
```

Literal types. Similar to an enum but this says it can only be one of these four strings

```
type Seasons = "spring" | "summer" | "autumn" | "winter";
```

Using `keyof`
![using keyof](<CleanShot 2023-09-30 at 11.45.51@2x.png>)
