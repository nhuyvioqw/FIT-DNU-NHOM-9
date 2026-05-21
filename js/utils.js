function calculateNights(checkin, checkout) {
  return (new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24);
}