export function getCity(provinceId) {
  // console.log(provinceId);
  return fetch(
    "https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=" +
      provinceId
  )
    .then((response) => response.json())
    .catch((err) => {
      return null;
    });
}

export function getDistrict(cityId) {
  return fetch(
    "https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=" + cityId
  )
    .then((response) => response.json())
    .catch((err) => {
      return null;
    });
}

export function getSubdis(districtId) {
  return fetch(
    "https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=" +
      districtId
  )
    .then((response) => response.json())
    .catch((err) => {
      return null;
    });
}
