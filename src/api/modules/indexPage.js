import fetch from "../../utils/fetch";

export const getList = id => {
  return fetch(`/medicine/order/count/`+ id,{
    method:'get',
    headers: {'Content-Type': 'application/JSON'}
    // body: JSON.stringify(data)
  })
}

export const getCateList = () => {
  return fetch(`/medicine/category/list`,{
    method:'get',
    headers: {'Content-Type': 'application/JSON'}
    // body: JSON.stringify(data)
  })
}