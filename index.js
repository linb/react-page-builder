import React from "react";

const getRand = (a) => (a || "") + parseInt(10e8 * Math.random(), 10).toString(36);

class Builder {
  constructor(builderRef, iframeRef, events = {}) {
    const ns = this;
    ns.events = events;
    ns.iframeRef = iframeRef;
    if (builderRef) builderRef.current = ns;

    ns.receiveMessage = (e) => {
      const data = e.data;
      // callback
      if (data.type === "callback") {
        const callback = ns.callbackPool[data.id];
        if (callback) {
          callback(data);
          delete ns.callbackPool[data.id];
        }
      }
      // event
      else if (data.event && ns.events[data.event])
        ns.events[data.event](data.event, data);
    };
  }

  executeCommand(cmd, data, callback) {
    const ifr = this.iframeRef && this.iframeRef.current;
    if (ifr && ifr.contentWindow) {
      const id = getRand();
      if (callback) this.callbackPool[id] = callback;
      ifr.contentWindow.postMessage(
        {
          id,
          cmd,
          data
        },
        "*"
      );
    }
  }

  init() {
    this.callbackPool = {};
    window.addEventListener("message", this.receiveMessage, false);
  }
  destroy() {
    this.callbackPool = {};
    window.removeEventListener("message", this.receiveMessage, false);
  }
}

const builderUrl = "https://crossui.com/ReactBuilder/embed.html";

const ReactBuilder = ({ license, features, builderRef, events, ...props }) => {
  const iframeRef = React.useRef(null);
  const refBulder = React.useRef(new Builder(builderRef, iframeRef, events), [
    builderRef,
    iframeRef,
    events
  ]);

  React.useEffect(() => {
    refBulder.current.init();
    return () => {
      refBulder.current.destroy();
    };
  }, []);

  const url = `${builderUrl}#license=${license || ""}&features=${
    features || ""
  }`;

  return (
    <iframe
      frameBorder="0"
      width="100%"
      height="100%"
      src={url}
      ref={iframeRef}
      style={{
        minWidth: "1024px",
        minHeight: "100%",
        height: "100%",
        width: "100%",
        border: "0px"
      }}
      {...props}
    ></iframe>
  );
};

export default ReactBuilder;
