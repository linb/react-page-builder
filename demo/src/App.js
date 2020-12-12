import React from "react";
import ReactBuilder from "react-page-builder";

export default function App() {
  const builderRef = React.useRef();
  const getBulder = () => builderRef.current;

  const onReady = () => {
    console.log("Builder is ready!");
  };
  const onChanged = () => {
    console.log("Design Changed!");
  };
  const getDesignCode = () => {
    const builder = getBulder();
    builder.executeCommand("getDesignCode", {}, function (data) {
      alert(data.data);
    });
  };
  const getReactCode = () => {
    const builder = getBulder();
    builder.executeCommand("getReactCode", {}, function (data) {
      alert(data.data);
    });
  };
  const exportToCodeSandbox = () => {
    const builder = getBulder();
    builder.executeCommand("exportToCodeSandbox");
  };
  const setDesignCode = () => {
    const builder = getBulder();
    builder.executeCommand(
      "setDesignCode",
      `
/*jshint esversion: 8 */
import { React, html } from "../web_modules/preact-htm/index.js";

const Module = props => {
    const [defaultState, setDefaultState] = React.useState({ });

    return html\`
        <\${React.Fragment}>
        </\${React.Fragment}>
    \`;
};

export default Module;
      `,
      function (data) {
        console.log(data);
      }
    );
  };
  return (
    <div>
      <p>
        <button onClick={setDesignCode}>Set Design code</button>
        {"  "}
        <button onClick={getDesignCode}>Get Design code</button>
        {"  "}
        <button onClick={getReactCode}>Get React code</button>
        {"  "}
        <button onClick={exportToCodeSandbox}>Export to CodeSandbox</button>
        {"  "}
      </p>
      <div style={{ width: "100%", height: "680px" }}>
        <ReactBuilder
          license="put your license code here"
          builderRef={builderRef}
          events={{ onChanged, onReady }}
        ></ReactBuilder>
      </div>
    </div>
  );
}
