import filters from "../data/filters";

export default function validateFilters(selectedFilters) {
  for (let filter in selectedFilters) {
    const keys = filters[filter].map((i) => i.key);
    if (!selectedFilters[filter].every((f) => keys.includes(f))) {
      return false;
    }
  }
  return true;
}
