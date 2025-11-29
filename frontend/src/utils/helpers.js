// src/utils/helpers.js

export const formatDateTR = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  return new Date(dateString).toLocaleDateString("tr-TR", options);
};

export const formatTime = (timeSlot) => {
  // örnek: "14:00-15:00" → "14:00"
  return timeSlot?.split("-")[0] || timeSlot;
};
