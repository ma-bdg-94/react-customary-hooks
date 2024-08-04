# React Customary Hooks

Hello React Community! 👋
I hereby present a modest gift for you!

These are some useful custom React hooks that will make your development journey easier and faster.

**Note:** This list will be extended in the next versions, I am open to any suggestions for optimizations. Feel free to contribute to this project. 😊

## Installation

Use the node.js package manager [npm](https://www.npmjs.com/) to install **`react-customary-hooks`**.

```bash
npm install react-customary-hooks --save
```

Alternatively, you can install it through [yarn](https://yarnpkg.com/).

```bash
yarn add react-customary-hooks
```

## **`useClassNames`** Hook:

The useClassNames hook provides a flexible way to manage class names and IDs for HTML elements. It allows you to conditionally apply class names or IDs and combine multiple class names into a single string.

> **Usage:**

```typescript
import { useState } from 'react';
import { useClassNames } from 'react-customary-hooks';

const ClassNamesExample = () => {
  const [isActive, setIsActive] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const { class: getClass, combine } = useClassNames();

  const handleToggleActive = () => setIsActive(!isActive);
  const handleToggleHighlight = () => setIsHighlighted(!isHighlighted);

  const dynamicClass = combine(
    'base-class',
    isActive && 'active-class',
    isHighlighted && 'highlighted-class'
  );

  const elementProps = getClass('dynamic-element', { id: isActive });

  return (
    <div>
      <button onClick={handleToggleActive}>
        Toggle Active ({isActive ? 'Active' : 'Inactive'})
      </button>
      <button onClick={handleToggleHighlight}>
        Toggle Highlight ({isHighlighted ? 'Highlighted' : 'Not Highlighted'})
      </button>
      <div {...elementProps} className={dynamicClass}>
        This element has dynamic class names and ID.
      </div>
    </div>
  );
};

export default ClassNamesExample;

```
> **API:**

* **`class(className: string, options: Options): { id?: string; className?: string }`**: Conditionally applies an ID or class name to an element based on the options.
* **`combine(...classNames: any[]): string`**: Combines multiple class names into a single string, filtering out falsy values.

> **Options:**

* **`id: boolean`**: If true, applies the class name as an ID; otherwise, applies it as a class name.

## **`useClipboard`** Hook:

This hook provides an easy-to-use interface for interacting with the clipboard in a React application. This hook allows you to copy, paste, and cut text to and from the clipboard, as well as manage the clipboard's content state. It offers a convenient way to handle clipboard operations, encapsulating the logic and state management needed for these tasks. It is used generally in applications that include text editors or for accessibility.

> **Usage:**

```typescript
import React, { useState } from 'react';
import { useClipboard } from 'react-customary-hooks';

const ClipboardExample = () => {
  const [inputText, setInputText] = useState('');
  const [pastedText, setPastedText] = useState('');
  const { 
    copyToClipboard, 
    pasteFromClipboard, 
    cutToClipboard, 
    getClipboardContent, 
    full 
  } = useClipboard();

  const handleCopy = () => {
    copyToClipboard(inputText);
  };

  const handlePaste = async () => {
    const text = await pasteFromClipboard();
    setPastedText(text);
  };

  const handleCut = () => {
    cutToClipboard(inputText);
    setInputText('');
  };

  const handleCheckClipboard = () => {
    const content = getClipboardContent();
    console.log('Current clipboard content:', content);
  };

  return (
    <div>
      <input 
        type="text" 
        value={inputText} 
        onChange={(e) => setInputText(e.target.value)} 
        placeholder="Enter text to copy or cut" 
      />
      <button onClick={handleCopy}>Copy to Clipboard</button>
      <button onClick={handlePaste}>Paste from Clipboard</button>
      <button onClick={handleCut}>Cut to Clipboard</button>
      <button onClick={handleCheckClipboard}>Check Clipboard Content</button>
      <div>
        <p>Clipboard Full: {full ? 'Yes' : 'No'}</p>
        <p>Pasted Text: {pastedText}</p>
      </div>
    </div>
  );
};

export default ClipboardExample;

```

> **API:**

* **`copyToClipboard(text: string): Promise<void>`**: Copies the provided text to the clipboard.
* **`pasteFromClipboard(): Promise<string>`**: Pastes text from the clipboard and returns it.
* **`cutToClipboard(text: string): Promise<void>`**: Cuts the provided text to the clipboard (copies and then clears the text).
* **`getClipboardContent(): string`**: Returns the current content of the clipboard.
* **`full: boolean`**: Indicates whether the clipboard has content.

## **`useGeo`** Hook:

This hook provides an interface to access the user's geographic location using the browser's Geolocation API. It manages the position, any errors, and the loading state, making it simple to integrate geolocation functionality into your React components.

> **Usage:**

```typescript
import { useGeo } from 'react-customary-hooks';

const GeoLocationExample = () => {
  const { position, error, loading } = useGeo();

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && (
        <p>Error {error.code}: {error.message}</p>
      )}
      {position && (
        <div>
          <p>Latitude: {position.latitude}</p>
          <p>Longitude: {position.longitude}</p>
        </div>
      )}
    </div>
  );
};

export default GeoLocationExample;

```

> **API:**

* **`position: { latitude: number, longitude: number } | null`**: The user's current geographic position.
* **`error: { code: number, message: string } | null`**: An error object containing the error code and message if there is an error retrieving the position.
* **`loading: boolean`**: A boolean indicating whether the geolocation request is in progress.


## **`useMediaQuery`** Hook:

This hook provides a way to detect and respond to CSS media query changes in a React component. It allows you to create responsive components by checking if a media query matches the current viewport size.

> **Usage:**

```typescript
import { useMediaQuery } from './useMediaQuery';

const MediaQueryExample = () => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const isMediumScreen = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isSmallScreen = useMediaQuery('(max-width: 767px)');

  return (
    <div>
      {isLargeScreen && <p>Large Screen</p>}
      {isMediumScreen && <p>Medium Screen</p>}
      {isSmallScreen && <p>Small Screen</p>}
    </div>
  );
};

export default MediaQueryExample;

```

> **API:**

* **`useMediaQuery(query: string): boolean`**: Takes a media query string and returns a boolean indicating whether the media query matches the current viewport size.
* 

## **`usePortal`** Hook:

This hook simplifies the process of creating and managing DOM elements for portals in React applications. It ensures that a specified DOM element is created and cleaned up as needed, making it easier to implement portals.

> **Usage:**

```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import usePortal from './usePortal';

const Modal = ({ children, id }) => {
  const portalRoot = usePortal(id);

  if (!portalRoot) return null;

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        {children}
      </div>
    </div>,
    portalRoot
  );
};

const PortalExample = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <button onClick={toggleModal}>
        {isModalOpen ? 'Close Modal' : 'Open Modal'}
      </button>
      {isModalOpen && <Modal id="modal-root">This is a modal!</Modal>}
    </div>
  );
};

export default PortalExample;

```

> **API:**

* **`usePortal(id: string): HTMLElement | null`**: Takes an `id` string and returns a reference to the DOM element where the portal will be rendered. If the element does not exist, it creates and appends a new one to the document body..


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
