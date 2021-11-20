import {Component} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import MainPage from "./pages/MainPage";
import PostPage from "./pages/PostPage";

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route
                    exact
                    path="/"
                    component={MainPage}/>
                <Route
                    path="/:id"
                    component={PostPage}/>
            </BrowserRouter>
        )
    }
}

export default App;
