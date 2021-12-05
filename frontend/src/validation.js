const isValidName = (name, habitList) => {
  let exists = habitList.filter((habit) => habit.name === name);
  return name && exists.length <= 1;
};

const isValidForm = (habit, habitList) => {
  return isValidName(habit.name, habitList) && habit.unit && habit.why;
};

module.exports = { isValidName, isValidForm };
