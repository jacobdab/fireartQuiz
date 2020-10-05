import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"

import Home from './pages/Home/Home'
import Game from "./pages/Game/Game"
import Result from "./pages/Result/Result"


const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <Home/>
                </Route>
                <Route exact path='/game'>
                    <Game/>
                </Route>
                <Route exact path='/results'>
                    <Result/>
                </Route>
            </Switch>
        </Router>)
}

export default App
