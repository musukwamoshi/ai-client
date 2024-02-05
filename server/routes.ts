import { createProxyMiddleware } from "http-proxy-middleware";
import express from "express";
//import passport from "passport";
import path from "path";
import { HealthCheck } from "./controllers/Observability";
import { loggedIn } from "./authentication/passport";
import { chatCompletion } from "./controllers/Model";



export const attachRoutes = (app: express.Application): void => {
  const isCompiled = __dirname.indexOf("/dist/") > 0;

  if (isCompiled) {
    app.use(
      "/",
      express.static(path.join(__dirname, "../client"), {
        fallthrough: true
      }) as any
    );
  }


  app.post("/v1/completions", chatCompletion);

  //Utility routes
  app.post("/v1/health/check", HealthCheck);
  /**
   * SPA API
  */

  //Everything else handled by SPA
  if (isCompiled) {
    // @ts-ignore
    app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname, "../client/index.html"))
    );
  } else {
    // use dev server
    app.get("*", createProxyMiddleware({ target: "localhost:3000" }));
  }
};