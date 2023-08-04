import fetch from "../../utils/fetch";

export const getList = data => {
  return fetch(`/medicine/category?page=${data.page}&pageSize=${data.pageSize}&name=${data.name}`,{
    method:'get',
    headers: {'Content-Type': 'application/JSON'}
    // body: JSON.stringify(data)
  })
}
export const add = data => {
  return fetch(`/medicine/category`,{
    method:'post',
    headers: {'Content-Type': 'application/JSON'},
    body: JSON.stringify(data)
  })
}
export const update = data => {
  return fetch(`/medicine/category`,{
    method:'put',
    headers: {'Content-Type': 'application/JSON'},
    body: JSON.stringify(data)
  })
}
export const getItem = id => {
  return fetch(`/medicine/category/`+ id,{
    method:'get',
    headers: {'Content-Type': 'application/JSON'}
    // body: JSON.stringify(data)
  })
}
export const remove = id => {
  return fetch(`/medicine/category/` + id,{
    method:'delete',
    headers: {'Content-Type': 'application/JSON'}
    // body: JSON.stringify(data)
  })
}