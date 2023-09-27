# Notes from taking the React w/ Typescript, Typescript, and React.gg courses on ui.dev

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
