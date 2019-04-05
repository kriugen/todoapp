import React from "react"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import HomeIcon from "@material-ui/icons/Home"
import HelpIcon from "@material-ui/icons/Help"

import { withRouter } from "react-router-dom"

const styles = {
    root: {
        flex: 1,
    },
    text: {
        flex: 1,
        color: "white",
        textAlign: "right",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
}

const Header = ({ history, classes, user, signOut }) => {
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        onClick={() => history.push("/")}
                        className={classes.menuButton}
                        color="inherit"
                    >
                        <HomeIcon />
                    </IconButton>
                    <Typography className={classes.text}>{user}</Typography>
                    <IconButton
                        onClick={() => history.push("/about")}
                        color="inherit"
                    >
                        <HelpIcon />
                    </IconButton>
                    {user ? (
                        <Button color="inherit" onClick={signOut}>
                            Logout
                        </Button>
                    ) : (
                        <Button
                            color="inherit"
                            onClick={() => history.push("/")}
                        >
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default withRouter(withStyles(styles)(Header))
