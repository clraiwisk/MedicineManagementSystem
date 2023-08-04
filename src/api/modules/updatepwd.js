import fetch from "../../utils/fetch";

export const getUser = id => {
  return fetch(`/medicine/platformAdmin/`+ id,{
    method:'get',
    headers: {'Content-Type': 'application/JSON'}
    // body: JSON.stringify(data)
  })
}
export const update = data => {
  return fetch(`/medicine/platformAdmin/pwd?id=${data.id}&newPwd=${data.newPwd}&oldPwd=${data.oldPwd}`,{
    method:'put',
    headers: {'Content-Type': 'application/JSON'}
    // body: JSON.stringify(data)
  })
}