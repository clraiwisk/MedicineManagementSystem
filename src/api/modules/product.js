import fetch from "../../utils/fetch";

export const getList = data => {
  return fetch(`/medicine/product?page=${data.page}&pageSize=${data.pageSize}&name=${data.name}&production=${data.production}`,{
    method:'get',
    headers: {'Content-Type': 'application/JSON'}
    // body: JSON.stringify(data)
  })
}

export const add = data => {
  return fetch(`/medicine/product`,{
    method:'post',
    headers: {'Content-Type': 'application/JSON'},
    body: JSON.stringify(data)
  })
}
export const update = data => {
  return fetch(`/medicine/product`,{
    method:'put',
    headers: {'Content-Type': 'application/JSON'},
    body: JSON.stringify(data)
  })
}
export const getItem = id => {
  return fetch(`/medicine/product/`+ id,{
    method:'get',
    headers: {'Content-Type': 'application/JSON'}
    // body: JSON.stringify(data)
  })
}
export const remove = id => {
  return fetch(`/medicine/product/` + id,{
    method:'delete',
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