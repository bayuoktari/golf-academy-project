export default function formatDate(data) {
  const newDate = new Date(data);
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const date = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  console.log(date, month, year);

  return `${date} ${months[month]} ${year}`;
}
