const reminders = (state = [], action) => {
    switch (action.type) {
      case 'ADD_REMINDER':
        return [
          ...state,
          {
            id: action.id,
            text: action.text,
            date: action.date,
            color: action.color
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
            date: action.date,
            color: action.color
          } : reminder
        )
      default:
        return state
    }
  }
  
  export default reminders