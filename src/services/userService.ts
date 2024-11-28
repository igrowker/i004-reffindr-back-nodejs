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
  try {
    const response = await httpClient.post('/Auth/SignUp', {
      RoleId: roleId,
      Name: name,
      LastName: lastName,
      Email: email,
      Password: password,
    })
    return response
  } catch (error) {
    throw new Error('Error registering user')
  }
}

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await httpClient.post('/Auth/Login', {
      Email: email,
      Password: password,
    })
    return response
  } catch (error) {
    throw new Error('Incorrect credentials')
  }
}

//profile logic
export const getUserById = async (id: string) => {
  try {
    const response = await httpClient.get(`/users/user/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data || 'Error fetching user')
  }
}

export const updateUserById = async (
  id: string,
  userData: { name: string; surname: string; email: string; password: string }
) => {
  try {
    const response = await httpClient.patch(`/users/${id}`, userData)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data || 'Error updating user')
  }
}

export const deleteUserById = async (id: string) => {
  try {
    const response = await httpClient.delete(`/users/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data || 'Error deleting user')
  }
}
