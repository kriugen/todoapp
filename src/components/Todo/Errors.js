import React from "react"

export default ({ errors }) => {
    if (!errors || errors.length === 0) return null
    return (
        <ul style={{ color: "red" }}>
            {errors.map((error, index) => (
                <li key={index}>{error}</li>
            ))}
        </ul>
    )
}
