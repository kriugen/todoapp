const Valid = { error: false, message: "" }

class FormValidator {
    constructor(rules) {
        this.rules = rules
        this.isValid = true
    }

    validate(form) {
        let validation = {}
        this.isValid = true
        this.rules.forEach(({ name, validate }) => {
            let message = validate(name, form[name])

            if (message) {
                validation[name] = { error: true, message }
                this.isValid = false
            } else {
                validation[name] = { ...Valid }
            }
        })

        return validation
    }

    valid(form) {
        let validation = {}
        for (let key in form) {
            validation[key] = { ...Valid }
        }
        return validation
    }
}

export const required = function(name, value) {
    return value ? "" : name + " is required"
}

export default FormValidator
