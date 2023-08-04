import fetch from "../../utils/fetch";

export const login = data => {
  return fetch(`/medicine/platformAdmin/login?username=${data.name}&password=${data.password}&vercode=${data.vercode}`,{
    method:'get',
    headers: {'Content-Type': 'application/JSON'}
    // body: JSON.stringify(data)
  })
}