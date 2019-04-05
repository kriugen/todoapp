import React, { Fragment, useState } from "react"

import { graphqlOperation } from "aws-amplify"
import { Connect } from "aws-amplify-react"

import List from "@material-ui/core/List"
import AddIcon from "@material-ui/icons/Add"
import Fab from "@material-ui/core/Fab"
import LinearProgress from "@material-ui/core/LinearProgress"

import Log from "../../Log"
import { listTodos } from "../../graphql/queries"

import Form from "./Form"
import Item from "./Item"

const onAll = `subscription OnAll {
  onCreateTodo {
    id
    name
  },
  onDeleteTodo {
    id
    name
  },
  onUpdateTodo {
    id
    name
  }
}`

const handleMsg = (prev, query) => {
    let current = Object.assign({}, prev)
    if (query.onCreateTodo) {
        let item = query.onCreateTodo
        Log.info(item, "onCreateTodo")

        current.listTodos.items.push(item)
    } else if (query.onDeleteTodo) {
        let item = query.onDeleteTodo
        Log.info(item, "onDeleteTodo")

        let index = current.listTodos.items.findIndex(x => x.id === item.id)

        current.listTodos.items.splice(index, 1)
    } else if (query.onUpdateTodo) {
        let item = query.onUpdateTodo
        Log.info(item, "onUpdateTodo")

        let index = current.listTodos.items.findIndex(x => x.id === item.id)
        current.listTodos.items[index] = item
    } else {
        Log.error(query, "Unknown operation on todo list")
        return prev
    }

    return current
}

const ComponentName = "Todo List"
export default () => {
    const [showAddForm, setShowAddForm] = useState(false)
    const [selectedItem, setSelectedItem] = useState()

    return (
        <Connect
            query={graphqlOperation(listTodos)}
            subscription={graphqlOperation(onAll)}
            onSubscriptionMsg={(prev, query) => {
                return handleMsg(prev, query)
            }}
        >
            {({ data: { listTodos }, loading, error }) => {
                if (loading) return <LinearProgress />

                if (error) {
                    Log.error(error, ComponentName)
                    return "Error"
                }

                Log.info(
                    "loaded " + listTodos.items.length + " todos",
                    ComponentName
                )
                return (
                    <Fragment>
                        <List>
                            {listTodos.items.map(item => (
                                <Item
                                    key={item.id}
                                    selectedItem={selectedItem}
                                    onItemSelected={id => {
                                        setShowAddForm()
                                        setSelectedItem(id)
                                    }}
                                >
                                    {item}
                                </Item>
                            ))}
                            {showAddForm && (
                                <Form done={() => setShowAddForm(false)} />
                            )}
                        </List>
                        {!showAddForm && (
                            <Fab
                                color="primary"
                                style={{ float: "right" }}
                                onClick={() => {
                                    setSelectedItem()
                                    setShowAddForm(true)
                                }}
                            >
                                <AddIcon />
                            </Fab>
                        )}
                    </Fragment>
                )
            }}
        </Connect>
    )
}
