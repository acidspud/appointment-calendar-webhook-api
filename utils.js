
const combineDateAndTime = (date, time) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two-digit format
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two-digit format
    const hours = time.getHours();
    const minutes = String(time.getMinutes()).padStart(2, '0'); // Ensure two-digit format

    // Construct and return the combined date-time object
    return new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);
};

module.exports = {
    combineDateAndTime
}