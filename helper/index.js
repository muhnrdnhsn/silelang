export function getAssetStatus(asset) {
  const openDate = new Date(asset.openAt).getTime();
  const closeDate = new Date(asset.closeAt).getTime();
  const today = new Date().getTime();

  const isPast = closeDate <= today;
  const isUpcomming = openDate >= today;

  return isPast ? "past" : isUpcomming ? "upcomming" : "ongoing";
}

export function formatCurrency(amount) {
  return amount.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });
}

export function formatDate(date) {
  return date.toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function convertCondition(condition) {
  if (condition >= 75) {
    return "Baik";
  } else if (condition >= 50) {
    return "Cukup";
  } else if (condition >= 25) {
    return "Kurang Baik";
  } else {
    return "Buruk";
  }
}

export function convertGender(gender){
    return gender === 'female' ? 'Perempuan' : 'Laki-Laki'
}
