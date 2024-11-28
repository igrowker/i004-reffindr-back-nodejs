import httpClient from './httpClient'

//authorization logic
interface RegisterData {
  roleId: string
  name: string
  lastName: string
  email: string
  password: string
}

export const registerUser = async (data: RegisterData) => {
  const { roleId, name, lastName, email, password } = data
  const response = await httpClient.post('/Auth/SignUp', {
    RoleId: roleId,
    Name: name,
    LastName: lastName,
    Email: email,
    Password: password,
  })

  return response
}

export const loginUser = async (email: string, password: string) => {
  const response = await httpClient.post('/Auth/Login', {
    Email: email,
    Password: password,
  })

  return response
}

//profile logic
export const getUserById = async (id: string) => {
  const response = await httpClient.get(`/users/user/${id}`)
  return response.data
}

export const updateUserById = async (
  id: string,
  userData: { name: string; surname: string; email: string; password: string }
) => {
  const response = await httpClient.patch(`/users/${id}`, userData)
  return response.data
}

export const deleteUserById = async (id: string) => {
  const response = await httpClient.delete(`/users/${id}`)
  return response.data
}
