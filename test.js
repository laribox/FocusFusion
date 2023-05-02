const data = [
  { date: "2022-04-30", value: 10 },
  { date: "2022-05-01", value: 20 },
  { date: "2022-05-01", value: 30 },
  { date: "2022-05-02", value: 40 },
  { date: "2022-05-02", value: 50 },
];

const groupedData = data.reduce((acc, item) => {
  const date = item.date;
  if (!acc[date]) {
    acc[date] = [];
  }
  acc[date].push(item);
  return acc;
}, {});

console.log(groupedData);
