import { createProxyMiddleware } from "http-proxy-middleware";
import express from "express";
//import passport from "passport";
import path from "path";
import { createArticle, deleteArticle, getAllArticles, getArticleById, getArticleBySearchTerm, updateArticle, updateArticleStatus } from "./controllers/Article";
import { passwordReset, signIn, signOut, signUp } from "./controllers/User";
import { HealthCheck } from "./controllers/Observability";
import { loggedIn } from "./authentication/passport";
import { createComment, deleteComment, getAllComments, getCommentsByArticleId, updateCommentStatus } from "./controllers/Comment";
import { getVisits, updateVisits } from "./controllers/SiteVisits";


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
  //articles
  app.get("/v1/articles", getAllArticles)
  app.post("/v1/article", getArticleById)
  app.post("/v1/article/create", createArticle);
  app.post("/v1/article/delete", deleteArticle);
  app.post("/v1/article/status", updateArticleStatus);
  app.put("/v1/article", updateArticle);
  app.post("/v1/articles/search", getArticleBySearchTerm);
  //comments
  app.post("/v1/comment/add", createComment);
  app.get("/v1/comments", getAllComments);
  app.post("/v1/comments", getCommentsByArticleId);
  app.post("/v1/comment/status", updateCommentStatus)
  app.post("/v1/comment/delete", deleteComment)

  //site visits
  app.get("/v1/visits", getVisits)
  app.put("/v1/visits", updateVisits)




  //users
  app.get("/v1/sessions", loggedIn, async (req, res) => {
    try {
      const user = req.user;
      res.send({ user });
    } catch {
      req.logout();
      return res.status(500).send("Login failed");
    }
  });
  app.post("/v1/users", signUp);
  app.post("/v1/sessions", signIn);
  app.post("/v1/logout", signOut);
  app.post("/v1/password/reset", passwordReset);

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
    app.get("*", createProxyMiddleware({ target: "http://localhost:3000" }));
  }
};