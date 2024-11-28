import { Request, Response } from 'express'

import * as userService from '../services/userService'
import { BaseResponse } from '../shared/utils/baseResponse'

export const handleRegister = async (req: Request, res: Response) => {
  const { roleId, name, lastName, email, password } = req.body

  const response = await userService.registerUser({ roleId, name, lastName, email, password })

  return res.status(201).json(
    new BaseResponse({
      data: response.data,
      errors: [],
      hasErrors: false,
      statusCode: 201,
    })
  )
}

export const handleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const response = await userService.loginUser(email, password)

  return res.status(response.status).json(
    new BaseResponse({
      data: response.data,
      errors: [],
      hasErrors: false,
      statusCode: response.status,
    })
  )
}

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params

  const user = await userService.getUserById(id)
  if (!user) {
    return res.status(404).json(
      new BaseResponse({
        errors: ['User not found'],
        hasErrors: true,
        statusCode: 404,
      })
    )
  }

  return res.status(200).json(user)
}

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const userData = req.body

  const updatedUser = await userService.updateUserById(id, userData)
  if (!updatedUser) {
    return res.status(404).json(
      new BaseResponse({
        errors: ['User not found or update failed'],
        hasErrors: true,
        statusCode: 404,
      })
    )
  }

  return res.status(200).json(updatedUser)
}

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await userService.deleteUserById(id)
  if (!result) {
    return res.status(404).json(
      new BaseResponse({
        errors: ['User not found or deletion failed'],
        hasErrors: true,
        statusCode: 404,
      })
    )
  }

  return res.status(204).json()
}
