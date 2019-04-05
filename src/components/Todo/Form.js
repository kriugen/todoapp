import React, { useContext, useState, useEffect } from "react"
import { graphqlOperation } from "aws-amplify"
import { Connect } from "aws-amplify-react"

import TextField from "@material-ui/core/TextField"

import IconButton from "@material-ui/core/IconButton"
import CheckIcon from "@material-ui/icons/Check"
import CloseIcon from "@material-ui/icons/Close"

import Log from "../../Log"
import Context from "./Context"
import { createTodo, updateTodo } from "../../graphql/mutations"

import ListItem from "@material-ui/core/ListItem"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"

import FormValidator, { required } from "./FormValidator"

const Empty = { name: "" }

export default ({ item, done = () => {} }) => {
    let validator = new FormValidator([
        {
            name: "name",
            validate: required,
        },
    ])

    const { onError } = useContext(Context)
    let type = item ? "Update" : "Add"

    const [form, setValues] = useState({ ...Empty })
    let validation = validator.valid(form)

    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        if (!item) return
        setValues({
            name: item.name || "",
        })
    }, [item])

    if (submitted) {
        validation = validator.validate(form)
    }

    return (
        <Connect mutation={graphqlOperation(item ? updateTodo : createTodo)}>
            {({ mutation }) => {
                const onSubmit = () => {
                    setSubmitted(true)
                    validation = validator.validate(form)
                    if (!validator.isValid) return

                    const input = {
                        name: form.name || undefined,
                    }

                    if (item) input.id = item.id

                    Log.info(input, "Todo " + type)
                    mutation({ input })
                        .then(() => {
                            setValues({ ...Empty })
                            setSubmitted(false)
                            done()
                        })
                        .catch(error => {
                            Log.error(error, "Todo " + type)
                            onError(error)
                        })
                }

                const onChange = e => {
                    setValues({ ...form, [e.target.id]: e.target.value })
                }

                return (
                    <ListItem>
                        <TextField
                            autoFocus
                            style={{ width: "75%" }}
                            id="name"
                            margin="normal"
                            value={form.name}
                            error={validation.name.error}
                            helperText={validation.name.message}
                            onChange={e => onChange(e)}
                            onKeyPress={e => {
                                if (e.key === "Enter") {
                                    onSubmit()
                                }
                            }}
                        />
                        <ListItemSecondaryAction>
                            <IconButton onClick={onSubmit}>
                                <CheckIcon color="primary" />
                            </IconButton>
                            <IconButton onClick={() => done()}>
                                <CloseIcon color="secondary" />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            }}
        </Connect>
    )
}
