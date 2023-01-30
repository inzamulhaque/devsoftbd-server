const blogURL = (title) => {
  const monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date().getDate();
  const month = monthName[new Date().getMonth()];
  const year = new Date().getFullYear();

  return `${title.split(" ").join("-")}-${date}-${month}-${year}`;
};

module.exports = blogURL;
