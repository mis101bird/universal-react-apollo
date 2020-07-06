import express from "express";
import React from "react";
import { initServer, createServerRender } from "../../../lib/";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpack from "webpack";

import HomeApp from "./App";
import typeDefs from "./gql/schema";
import resolvers from "./gql/resolvers";
import messageApi from "./gql/dataSources/messageApi";
import webpackConfig from "../webpack.config";

const MODULE_ID = 'MODULE_1'

const app = express();
const compiler = webpack(webpackConfig);

const initModuleServer = (app, apolloServerOptions) => {
  const {
    typeDefs,
    resolvers,
    dataSources,
    context
  } = apolloServerOptions;

  const moduleRender = createServerRender({
    typeDefs,
    resolvers,
    isModule: true,
  });

  app.get("/module/:userName", (req, res, next) => {
    return moduleRender({
      moduleId: MODULE_ID,
      appElement: () => <HomeApp />,
      req,
      dataSources: dataSources(),
      context: context({ req })
    }).then((markup) => {
      res.status(200);
      res.send(markup + '<script src="/module.js"></script>');
    });
  });
};

const routes = [
  {
    path: "/greeting/:userName",
    appElement: () => <HomeApp />,
    bodyBottomElement: ({ req }) => <script src='/home.js' />,
  },
];

const apolloOptions = {
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      messageApi,
    };
  },
  context: ({ req }) => {
    return {
      userName: req.params.userName,
    };
  },
};

app.use(webpackDevMiddleware(compiler));

initModuleServer(app, apolloOptions);

initServer(app, routes, apolloOptions);

// mount generic server side error handler
app.use(function(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  console.log("error: ", err);
  res.send("Oops... something went wrong");
});

app.listen(3000, () =>
  console.log("Now that your universal app is ready to serve user")
);
