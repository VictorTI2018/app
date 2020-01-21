export default class Reducer {

    constructor(state, action) {
        this.state = state,
        this.action = action
    }

    set(name, value) {
        return {
            ...this.state,
            [name]: value !== undefined ? value : this.action[`${name}`]
        }
    }
}