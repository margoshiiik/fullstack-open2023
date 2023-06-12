const notificationReducer = (state = [], action) => {
    console.log('action')
    console.log(action)    
    switch (action.type) {
        case 'SHOW':
            return state.concat(`you ${action.event} '${action.data}'`)
        case 'HIDE':
            return []
        default:
            return state
    }
}

export const showNotification = (data, event) => {
    return {
        type: 'SHOW',
        data,
        event
    }
}

export const hideNotification = (data) => {
    return {
        type: 'HIDE',
        data
    }
}

export default notificationReducer