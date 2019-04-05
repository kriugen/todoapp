import React from "react"
import { graphqlOperation } from "aws-amplify"
import { Connect } from "aws-amplify-react"

import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"

import Log from "../../../Log"

import { deleteTodo } from "../../../graphql/mutations"

export default ({ id, done }) => (
    <Connect mutation={graphqlOperation(deleteTodo)}>
        {({ mutation }) => {
            const onDelete = e => {
                Log.info(id, "Todo Delete")
                mutation({ input: { id } })
                    .then(item => done(item))
                    .catch(error => Log.error(error))
            }

            return (
                <IconButton onClick={onDelete}>
                    <DeleteIcon />
                </IconButton>
            )
        }}
    </Connect>
)
