const reminders = (state = [], action) => {
    console.log('TRIGGERED ACTION', action)
    switch (action.type) {
      case 'ADD_REMINDER':
        return [
          ...state,
          {
            id: action.id,
            text: action.text,
            date: action.date
          }
        ]
      case 'DELETE_REMINDER':
        return state.filter(reminder => {
            return reminder.id !== action.reminderId
        })
      case 'UPDATE_REMINDER':
        return state.map(reminder =>
          reminder.id === action.reminderId ? {
            ...reminder,
            text: action.text,
            date: action.date
          } : reminder
        )
      default:
        return state
    }
  }
  
  export default reminders