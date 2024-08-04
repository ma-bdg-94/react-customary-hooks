# React Useful Hooks

Hello React Community! 👋
I hereby present a modest gift for you!

These are some useful custom React hooks that will make your development journey easier and faster.

**Note:** This list will be extended in the next versions, I am open to any suggestions for optimizations. Feel free to contribute to this project. 😊

## Installation

Use the node.js package manager [npm](https://www.npmjs.com/) to install **`react-useful-hooks`**.

```bash
npm install react-useful-hooks --save
```

Alternatively, you can install it through [yarn](https://yarnpkg.com/).

```bash
yarn add react-useful-hooks
```

## **`useClassNames`** Hook:

In most cases, attributing class names and ids to HTML and JSX elements is not a big issue. Things may be more complicated in the cases of using CSS preprocessors (ie. SASS) and using multiple styling resources as well as the urge of the need of the conditional rendering and styling. The hook presents two functions: **`combine()`** and **`class()`**.

* The **`class()`** function: It simply a function that takes the class name as parameter and may or may not transform it into `id` depending on the developer need:


```scss
/* Style **/
.comp {
  .t1 {
    color: #f00;
  }

  .t2 {
    color: #0f0;
  }

  .t3 { 
    color: #0f0;  /* with the use of the class() function, 
The browser will read it as  #t3 */
  }

  .t4 {
    color: #ff0;
  }
}
```
```typescript
/* Component **/
import styles from 'path/to/styles.scss';
import { useClassNames } from 'react-useful-hooks';

const ComponentWithStyle = ({ someRandomProp }) => {
  const { class: getClass } = useClassNames(); // extracted class function as getClass() 
  return (
    <div className={styles.comp}>
      <p className={styles.t1}>Text1</p> 
      {/* This is the standard use */}
      <p className={getClass(styles.t2)}>Text2</p> 
      {/* This is more dynamical and equivalent to <p className={styles.t2}>Text2</p> */}
      <p className={getClass(styles.t3, { id: true })}>Text3</p> 
      {/* This is equivalent to <p id={styles.t3}>Text3</p> */}
      <p className={getClass(styles.t4, { id: !!someRandomProp })}>Text4</p> 
      {/* In this case it will allocate an id only if someRandomProp has truthy value */}
    </div>
  )
}

export default ComponentWithStyle;
```

* The **`combine()`** function: takes multiple class names as parameters and apply the style defined in all of them. In this case, standard rules of CSS priorities will be applied and the **last** style to be defined is the most prioritized.

```scss
/* Style **/
.component {
  .textColor {
    color: #f00;
  }

  .textSize {
    font-size: 2rem;
  }
}
```

```typescript
/* Component **/
import styles from 'path/to/styles.scss';
import { useClassNames } from 'react-useful-hooks';

const ComponentWithStyle = (props) => {
  const { combine } = useClassNames(); 
  return (
    <div>
      <p className={combine(styles.textColor, styles.textSize)}>Text1</p> 
      {/* Text will be red with 2rem size */} 
    </div>
  )
}

export default ComponentWithStyle;
```

* The conditional styling and rendering: This hook is very helpful as it will facilitate conditional styling:

```typescript
import { Fragment, useState } from 'react';
import styles from 'path/to/styles.scss';
import { useClassNames } from 'react-useful-hooks';

const ComponentWithStyle = ({ items, highlightedIndex }) => {
  const [isActive, setIsActive] = useState(false);
  const { combine } = useClassNames();

  const handleClick = () => setIsActive(!isActive);

  const buttonClass = combine(
    'btn',
    isActive && 'btn-active', // conditional styling
    'btn-primary'
  );
  return (
    <Fragment>
       <button className={buttonClass} onClick={handleClick}>
         Toggle
      </button> 
      <ul>
        {items.map((item, index) => {
          const itemClass = combine(
            'list-item',
            index === highlightedIndex && 'highlighted'
          );

          return (
            <li key={item.id} className={itemClass}> {/*Dynamically Applying Styles in a List Component*/}
              {item.name}
            </li>
          );
        })}
      </ul>
    </Fragment>
  )
}

export default ComponentWithStyle;
```


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)