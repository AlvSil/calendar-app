let nextReminderId = 0

export const addReminderToDate = (text, date) => ({
  id: nextReminderId++,
  type: 'ADD_REMINDER',
  text,
  date
})
