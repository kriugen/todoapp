import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import Amplify, { Auth, Hub } from "aws-amplify"
import { Authenticator } from "aws-amplify-react"
import awsmobile from "./aws-exports"

import { withStyles } from "@material-ui/core/styles"

import Log from "./Log"
import About from "./components/About"
import Header from "./components/Header"
import Todo from "./components/Todo"

Amplify.configure(awsmobile)

const styles = {
    padded: {
        padding: 8,
    },
}

const App = ({ classes }) => {
    const [user, setUser] = useState()

    const getUser = () => {
        Auth.currentAuthenticatedUser()
            .then(u => {
                setUser(u.username)
            })
            .catch(e => Log.error(e, "App getUser"))
    }

    function onHubCapsule(capsule) {
        switch (capsule.payload.event) {
            case "signIn":
                getUser()
                break
            case "signUp":
                break
            case "signOut":
                setUser()
                break
            default:
                return
        }
    }

    useEffect(() => {
        getUser()
        Hub.listen("auth", onHubCapsule)
        return () => Hub.remove("auth", onHubCapsule)
    }, [])

    return (
        <div className={classes.padded}>
            <Router>
                <Header user={user} signOut={() => Auth.signOut()} />
                <div className={classes.padded}>
                    <Route
                        exact
                        path="/"
                        component={user ? Todo : Authenticator}
                    />
                    <Route path="/about" component={About} />
                </div>
            </Router>
        </div>
    )
}

export default withStyles(styles)(App)
