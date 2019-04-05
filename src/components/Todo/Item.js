import React from "react"
import { withRouter } from "react-router-dom"

import { withStyles } from "@material-ui/core/styles"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"

import Delete from "./Buttons/Delete"
import Form from "./Form"

const styles = {
    hover: {
        "&:hover": { backgroundColor: "#FAFAFA" },
    },
}

const Item = ({
    classes,
    children: item,
    history,
    onItemSelected,
    selectedItem,
}) => {
    const form = selectedItem && selectedItem.id === item.id
    return form ? (
        <Form item={item} done={() => onItemSelected()} />
    ) : (
        <ListItem className={classes.hover}>
            <ListItemText
                primary={item.name}
                onClick={() => onItemSelected(item)}
            />
            <ListItemSecondaryAction>
                <Delete id={item.id} />
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default withRouter(withStyles(styles)(Item))
