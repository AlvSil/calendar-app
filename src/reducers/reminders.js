const reminders = (state = [], action) => {
    console.log('TRIGGERED ACTION', action)
    switch (action.type) {
      case 'ADD_REMINDER':
        return [
          ...state,
          {
            text: action.text,
            date: action.date
          }
        ]
      default:
        return state
    }
  }
  
  export default reminders