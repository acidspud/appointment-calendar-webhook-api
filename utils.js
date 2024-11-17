
const combineDateAndTime = (date, time) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two-digit format
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two-digit format
    const hours = time.getHours();
    const minutes = String(time.getMinutes()).padStart(2, '0'); // Ensure two-digit format

    // Construct and return the combined date-time object
    return new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);
};

const toDisplayDate = (date) =>  {

    const formattedDate = date.toLocaleString('en-ZA', {
        timeZone: 'Africa/Johannesburg', // Specify South Africa time zone
        // timeZoneName: 'short' // Includes the GMT offset
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })

      //return formattedDate.replace(',', ' on')
      return formattedDate
}

module.exports = {
    combineDateAndTime,
    toDisplayDate
}