const formatMonthDay = (dateString) => {
  if (!dateString) return '';
  const [, month, day] = dateString.split('-');
  return `${month}.${day}`;
};

export function formatEventPeriod(eventType, startDate, endDate) {
  if (!startDate) return '';

  if (eventType === 'onsite') {
    const [, month, day] = startDate.split('-');
    return `${Number(month)}월 ${Number(day)}일`;
  }

  return `${formatMonthDay(startDate)} - ${formatMonthDay(endDate || startDate)}`;
}
