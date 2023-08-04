import fetch from "../../utils/fetch";

export const getList = data => {
  return fetch(`/medicine/product/list?dscp=${data.dscp}&name=${data.name}`,{
    method:'get',
    headers: {'Content-Type': 'application/JSON'}
    // body: JSON.stringify(data)
  })
}
export const getCarousel = () => {
  return fetch(`/medicine/carousel`,{
    method:'get',
    headers: {'Content-Type': 'application/JSON'}
    // body: JSON.stringify(data)
  })
}
export const getCategory = () => {
  return fetch(`/medicine/category/list`,{
    method:'get',
    headers: {'Content-Type': 'application/JSON'}
    // body: JSON.stringify(data)
  })
}
export const updateCarousel = (data) => {
  return fetch(`/medicine/carousel`,{
    method:'put',
    headers: {'Content-Type': 'application/JSON'},
    body: JSON.stringify(data)
  })
}
export const getRecommend = () => {
  return fetch(`/medicine/recommend`,{
    method:'get',
    headers: {'Content-Type': 'application/JSON'}
    // body: JSON.stringify(data)
  })
}
export const updateRecommend = (data) => {
  return fetch(`/medicine/recommend`,{
    method:'put',
    headers: {'Content-Type': 'application/JSON'},
    body: JSON.stringify(data)
  })
}