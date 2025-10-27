 export const timeSlots = [];

  for (let h = 0; h < 24; h++) {
    const hour = h.toString().padStart(2, "0");
    timeSlots.push({ label: `${hour}:00`, value: `${hour}:00` });
  }
export const daysOfWeek = [
  { id: 'mon', label: 'Monday', value: 'Monday' },
  { id: 'tue', label: 'Tuesday', value: 'Tuesday' },
  { id: 'wed', label: 'Wednesday', value: 'Wednesday' },
  { id: 'thu', label: 'Thursday', value: 'Thursday' },
  { id: 'fri', label: 'Friday', value: 'Friday' },
  { id: 'sat', label: 'Saturday', value: 'Saturday' },
  { id: 'sun', label: 'Sunday', value: 'Sunday' },
];

export  const availableDayList = [
    { label: "Available Immediately", value: "Available Immediately" },
    { label: "Available in Week", value: "Available in Week" },
    { label: "Available in 2 week", value: "Available in 2 week" },
    { label: "Available in 1 month", value: "Available in 1 month" },
    { label: "Currently Booked", value: "Currently Booked" },
  ];

  export const services =  [
    { id: 'home', label: 'Home Renovation', value: 'Home Renovation' },
    { id: 'new', label: 'New Construction', value: 'New Construction' },
    { id: 'commercial', label: 'Commercial Build', value: 'Commercial Build' },
    { id: 'landscaping', label: 'Landscaping', value: 'Landscaping' },
    { id: 'others', label: 'Others', value: 'Others' },
  ]