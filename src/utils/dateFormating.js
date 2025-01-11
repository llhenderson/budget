export const endDateFormating = () => {
  const timestamp = Date.now(); // Get the current timestamp

  const date = new Date(timestamp); // Create a Date object from the timestamp

  const year = date.getFullYear(); // Get the year (YYYY)
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Get the month (MM) - add 1 because months are 0-indexed
  const day = ("0" + date.getDate()).slice(-2); // Get the day of the month (DD)

  const formattedDate = `${year}-${month}-${day}`; // Combine into YYYY-MM-DD format

  return formattedDate;
};

export const startDateFormating = (timeRange) => {
  const now = new Date(); // Get the current date and time

  let year = now.getFullYear();
  let month = ("0" + (now.getMonth() + 1)).slice(-2);
  let day = ("0" + now.getDate()).slice(-2);

  switch (timeRange) {
    case "day":
      // Already set to today's date
      break;
    case "week":
      const diff = now.getDay(); // Adjust for Sunday being 0
      const startOfWeek = new Date(now.setDate(now.getDate() - diff));
      year = startOfWeek.getFullYear();
      month = ("0" + (startOfWeek.getMonth() + 1)).slice(-2);
      day = ("0" + startOfWeek.getDate()).slice(-2);
      break;
    case "month":
      day = "01"; // Set to the first day of the month
      break;
    case "year":
      month = "01"; // Set to January
      day = "01"; // Set to the first day of the year
      break;
    default:
      throw new Error("Invalid timeRange provided");
  }

  return `${year}-${month}-${day}`;
};
