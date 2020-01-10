import { isEmpty } from 'lodash'
import { validate } from 'validate.js'
import { MaskService } from 'react-native-masked-text'

const messages = {
    required: 'Campo Obrigatorio'
}

export const Rule = {
    required: (message) => ({
        presence: {
            allowEmpty: false,
            message: message || messages.required
        }
    })
}

validate.validators.custom = function (value, { message, validator }/*, key, attributes */) {
    if (message) {
        return validator(value) ? null : message
    } else {
        return validator(value)
    }
}
