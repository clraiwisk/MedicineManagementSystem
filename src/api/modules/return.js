import fetch from "../../utils/fetch";

export const getList = data => {
  return fetch(`/medicine/order?page=${data.page}&pageSize=${data.pageSize}&name=${data.name}&code=${data.code}&status=${data.status}`,{
    method:'get',
    headers: {'Content-Type': 'application/JSON'}
    // body: JSON.stringify(data)
  })
}
export const getItem = id => {
  return fetch(`/medicine/order/detail/` + id,{
    method:'get',
    headers: {'Content-Type': 'application/JSON'}
    // body: JSON.stringify(data)
  })
}
export const update = data => {
  return fetch(`/medicine/order/${data.id}/${data.status}`,{
    method:'put',
    headers: {'Content-Type': 'application/JSON'}
    // body: JSON.stringify(data)
  })
}