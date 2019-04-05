import React, { Fragment, useState } from "react"

import Context from "./Context"
import List from "./List"
import Errors from "./Errors"

export default () => {
    const [item, setItem] = useState()
    const [errors, setErrors] = useState()

    if (errors && errors.length > 0)
        return (
            <Fragment>
                <Errors errors={errors} />
            </Fragment>
        )

    return (
        <Context.Provider
            value={{
                item,
                setItem,
                errors,
                onError: error => setErrors(error.errors.map(e => e.message)),
            }}
        >
            <List />
        </Context.Provider>
    )
}
