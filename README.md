# react-page-builder - version 0.1
Enable developers to use D&D and configuration to build React page.

## 1. Usage
### 1.1. Install
```javascript
npm install react-page-builder
```

### 1.2. Import
```javascript
import ReactBuilder from "react-page-builder";
```

### 1.3. Use the component
```javascript
...
export default function App() {
  const codeSavedRef = React.useRef();

  const builderRef = React.useRef();
  const getBulder = () => builderRef.current;
  // ready event
  const onReady = () => {
    console.log("Builder is ready!");
  };
  // changed event
  const onChanged = () => {
    console.log("Design Changed!");
  };
  // get design code ( it can be set into designer via 'setDesignCode')
  const getDesignCode = () => {
    const builder = getBulder();
    builder.executeCommand("getDesignCode", {}, function (data) {
      codeSavedRef.current = data.data;
      alert(data.data);
    });
  };
  // set code to design
  const setDesignCode = () => {
    const builder = getBulder();
    if(codeSavedRef.current){
      builder.executeCommand(
        "setDesignCode",
        codeSavedRef.current,
        function (data) {
          console.log(data);
        }
      );
    }
  };  
  // get React code
  const getReactCode = () => {
    const builder = getBulder();
    builder.executeCommand("getReactCode", {}, function (data) {
      alert(data.data);
    });
  };
  // export to CodeSandbox
  const exportToCodeSandbox = () => {
    const builder = getBulder();
    builder.executeCommand("exportToCodeSandbox");
  };
  return (
    <div>
      <div style={{ width: "100%", height: "680px" }}>
        <ReactBuilder
          license="put your license code here"
          builderRef={builderRef}
          events={{ onChanged, onReady }}
        ></ReactBuilder>
      </div>
    </div>
  );
};
```
## 2. Demo
[Open the demo in CodeSandbox](https://codesandbox.io/s/summer-wave-4vvl0 "react-page-builder demo")
 
## 3. npm
[npm link](https://www.npmjs.com/package/react-page-builder "react-page-buildere NPM")
