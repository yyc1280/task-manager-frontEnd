import React, { useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { connect } from "react-redux"
import { loadUser } from "../actions/index"
import Header from "./Header"
import Home from "./Home"
import SignUp from "./SignUp"
import TaskList from "./TaskList"
import Login from "./Login"
import CreateTask from "./CreateTask"

const App = props => {
  useEffect(() => {
    props.loadUser()
  }, [props])
  return (
    <div className="h-100 bg-dark">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signUp" exact component={SignUp} />
          <Route path="/tasks" exact component={TaskList} />
          <Route path="/login" exact component={Login} />
          <Route path="/create" exact component={CreateTask} />
        </Switch>
      </Router>
    </div>
  )
}

export default connect(null, { loadUser })(App)
