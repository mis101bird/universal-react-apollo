import React from "react";

const Module = ({
  moduleId,
  rehydrationStateKey,
  content,
  initialState,
  inlineStateNonce
}) => {
  return (
    <>
      <div id={moduleId} dangerouslySetInnerHTML={{ __html: content }} />
      <script
        nonce={inlineStateNonce}
        dangerouslySetInnerHTML={{
          __html: `window.${rehydrationStateKey}=${JSON.stringify(
            initialState
          ).replace(/</g, "\\u003c")}`
        }}
      />
    </>
  );
};

export default Module;
