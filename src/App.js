// MODULE IMPORTS
import React from "react";
import { Switch, Route } from "react-router-dom";
// COMPONENT IMPORTS
import { About } from "./components/pages/About";
import { Work } from "./components/pages/Work";
import { Resume } from "./components/pages/Resume";
import { WorkPage } from "./components/pages/WorkPage";
import { Blog } from "./components/pages/Blog";
import { BlogPage } from "./components/pages/BlogPage";
// STYLE IMPORTS
import "./_app.scss";

function App() {
  return (
    <div className="App template_page">
      <Switch>
        <Route exact path="/" children={[<About />, <Work/>]} />
        <Route exact path="/projects/:id" children={<WorkPage />} />
        <Route exact path="/blog/:id" children={<BlogPage />} />
        <Route exact path="/cv" children={<Resume />} />
        <Route exact path="/blog" children={<Blog />} />
      </Switch>
    </div>
  );
}

export default App;