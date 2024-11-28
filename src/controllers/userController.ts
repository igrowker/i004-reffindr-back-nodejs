import { Request, Response } from 'express'

import * as userService from '../services/userService'
import { BaseResponse } from '../shared/utils/baseResponse'

export const handleRegister = async (req: Request, res: Response) => {
  const { roleId, name, lastName, email, password } = req.body

  try {
    const response = await userService.registerUser({ roleId, name, lastName, email, password })
    return res.status(201).json(
      new BaseResponse({
        data: response.data,
        errors: [],
        hasErrors: false,
        statusCode: 201,
      })
    )
  } catch (error) {
    return res.status(400).json(
      new BaseResponse({
        errors: ['Error al registrar el usuario.'],
        hasErrors: true,
        statusCode: 400,
      })
    )
  }
}

export const handleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const response = await userService.loginUser(email, password)
    return res.status(response.status).json(
      new BaseResponse({
        data: response.data,
        errors: [],
        hasErrors: false,
        statusCode: response.status,
      })
    )
  } catch (error) {
    return res.status(401).json(
      new BaseResponse({
        errors: ['Credenciales incorrectas.'],
        hasErrors: true,
        statusCode: 401,
      })
    )
  }
}

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const user = await userService.getUserById(id)
    res.status(200).json(user)
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error fetching user' })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const userData = req.body

  try {
    const updatedUser = await userService.updateUserById(id, userData)
    res.status(200).json(updatedUser)
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error updating user' })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const result = await userService.deleteUserById(id)
    res.status(200).json(result)
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error deleting user' })
  }
}
