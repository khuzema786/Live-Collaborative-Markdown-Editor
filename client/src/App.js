import Home from "./screens/home";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { v4 as uuid } from "uuid";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Redirect to={`/documents/${uuid()}`} />
        </Route>
        <Route path="/documents/:id">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
