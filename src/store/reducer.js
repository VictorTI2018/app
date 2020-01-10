export function useReducer(state, action) {
    function set(name, value) {
        return {
            ...state,
            [name]: value !== undefined ? value : action[name]
        }
    }
    return [set]
}