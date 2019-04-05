import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"

const styles = {
    center: {
        textAlign: "center",
    },
}

const T = ({ children: text }) => (
    <Typography variant="body1">{text}</Typography>
)

const About = ({ classes }) => (
    <div>
        <Typography className={classes.center} variant="h5">
            Todo Application
        </Typography>
        <Typography className={classes.center} variant="subtitle2">
            ver 1.0
        </Typography>
        <Typography className={classes.center} variant="subtitle1">
            Serverless SPA
        </Typography>
        <Typography variant="h6">Technologies</Typography>

        <ul>
            <li>
                <T>Amazon Web Services</T>
                <ul>
                    <li>
                        <T>Authentication</T>
                    </li>
                    <li>
                        <T>GraphQL API</T>
                    </li>
                    <li>
                        <T>Hosting</T>
                    </li>
                </ul>
            </li>
            <li>
                <T>Interface</T>
                <ul>
                    <li>
                        <T>react.js</T>
                    </li>
                    <li>
                        <T>material-ui</T>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
)

export default withStyles(styles)(About)
