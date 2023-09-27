# Notes from taking the React w/ Typescript, Typescript, and React.gg courses on ui.dev

## React Elements and Components

**[Elements](https://react.dev/reference/react/createElement)**: are just the templates, they have no state or props.

**[Components](https://react.dev/reference/react/Component#component)**: are the functions that hold props and state and render React Elements

### Defining Props

You can use interfaces, type aliases, or literal objects to define props

## Event Handlers

Using built in React event types for `onCLick` or `onKeyDown` events

```const App = () => {
  function handleOnChange(event: React.FormEvent<HTMLInputElement>):void {
    // ...
  }

  return <input type="text" onChange={handleOnChange}>
}
```

Alternatively,

```const App = () => {
  const handleOnChange:ChangeEventHandler<HTMLInputElement> = (event) => {
    // ...
  }

  return <input type="text" onChange={handleOnChange}>
}
```

If we have other properties that aren't represented on the basic React Event types.
We can "Type Widen" our React Event type to account for these

```interface FormFields {
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
