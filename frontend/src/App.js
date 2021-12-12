import {Component} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import FeedPage from "./pages/FeedPage";
import PostPage from "./pages/PostPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route
                    exact
                    path="/"
                    component={FeedPage}/>
                <Route
                    path="/login"
                    component={LoginPage}/>
                <Route
                    path="/logout"
                    component={LogoutPage}/>
                <Route
                    path="/posts/:id"
                    component={PostPage}/>
            </BrowserRouter>
        )
    }
}

export default App;
