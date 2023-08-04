import fetch from "../../utils/fetch";

//获取管理员列表数据
export const getList = data => {
  return fetch(`/medicine/platformAdmin?page=${data.page}&pageSize=${data.pageSize}&username=${data.name}&production=${data.production}`,{
    method:'get',
    headers: {'Content-Type': 'application/JSON'}
    // body: JSON.stringify(data)
  })
}

//新增管理员数据
export const add = data => {
  return fetch(`/medicine/platformAdmin`,{
    method:'post',
    headers: {'Content-Type': 'application/JSON'},
    body: JSON.stringify(data)
  })
}

//更新管理员数据
export const update = data => {
  return fetch(`/medicine/platformAdmin?avatar=${data.avatar}&id=${data.id}&nickname=${data.nickname}`,{
    method:'put',
    headers: {'Content-Type': 'application/JSON'}
    // body: JSON.stringify(data)
  })
}

//删除管理员数据
export const remove = id => {
  return fetch(`/medicine/platformAdmin?id=${id}`,{
    method:'delete',
    headers: {'Content-Type': 'application/JSON'}
    // body: JSON.stringify(data)
  })
}
//更新管理员密码
export const updatePwd = data => {
  return fetch(`/medicine/platformAdmin/pwd?newPwd=${data.newPwd}&id=${data.id}&oldPwd=${data.oldPwd}`,{
    method:'put',
    headers: {'Content-Type': 'application/JSON'}
    // body: JSON.stringify(data)
  })
}

//获取单个管理员的详细信息
export const getItem = id => {
  return fetch(`/medicine/platformAdmin/`+ id,{
    method:'get',
    headers: {'Content-Type': 'application/JSON'}
    // body: JSON.stringify(data)
  })
}

//上传图片
export const uploadImg = data => {
  return fetch(`/medicine/file/upload`,{
    method:'post',
    headers: {'Content-Type': 'application/JSON'},
    body: JSON.stringify(data)
  })
}