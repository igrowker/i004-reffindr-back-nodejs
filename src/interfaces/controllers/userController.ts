import { Request, Response, Router } from 'express'
import { validationResult } from 'express-validator'
import FormData from 'form-data'
import multer from 'multer'

import { BaseResponse } from '../../shared/utils/baseResponse'
import { tokenMiddleware } from '../middlewares/tokenMiddleware'
import validateUpdateUser from '../middlewares/validateUpdateUser'
import { validationError } from '../middlewares/validationError'
import httpClient from '../services/httpClient'

const upload = multer()

const router = Router()

router.get('/profile', tokenMiddleware, async (req: Request, res: Response) => {
  try {
    const response = await httpClient.get(`/Users/get-credentials`, {
      headers: {
        Authorization: req.headers['Authorization'],
      },
    })

    if (response.status === 404) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    return res.status(response.status).json(
      new BaseResponse({
        data: response.data,
        statusCode: response.status,
        hasErrors: false,
        errors: [],
      })
    )
  } catch (error: unknown) {
    return res.status(400).json(
      new BaseResponse({
        errors: ['Error al obtener el perfil.'],
        hasErrors: true,
        statusCode: res.statusCode,
      })
    )
  }
})

router.get('/owner-properties', tokenMiddleware, async (req: Request, res: Response) => {
  try {
    const response = await httpClient.get('/Users/get-ownerProperties', {
      headers: {
        Authorization: req.headers['Authorization'],
      },
    })

    if (response.status === 404) {
      return res.status(404).json({ error: 'No se han encontrado propiedades' })
    }

    return res.status(response.status).json(
      new BaseResponse({
        data: response.data,
        statusCode: response.status,
        hasErrors: false,
        errors: [],
      })
    )
  } catch (error: unknown) {
    return res.status(400).json(
      new BaseResponse({
        errors: ['Error al obtener las propiedades del usuario.'],
        hasErrors: true,
        statusCode: res.statusCode,
      })
    )
  }
})

router.put(
  '/profile/update',
  upload.single('profileImage'),
  validateUpdateUser,
  tokenMiddleware,
  validationError,
  async (req: Request, res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { countryId, stateId, email, name, lastName, dni, phone, address, birthDate, genreId, salaryId } = req.body

    const formData = new FormData()
    formData.append('Email', email)
    formData.append('Name', name)
    formData.append('LastName', lastName)
    formData.append('Dni', dni)
    formData.append('Phone', phone)
    formData.append('Address', address)
    formData.append('BirthDate', birthDate)
    formData.append('CountryId', countryId)
    formData.append('StateId', stateId)
    formData.append('GenreId', genreId)
    formData.append('SalaryId', salaryId)

    if (req.file) {
      formData.append('ProfileImage', req.file.buffer, {
        filename: req.file.originalname,
        contentType: req.file.mimetype,
      })
    }

    try {
      const response = await httpClient.put(`/Users/modify-credentials`, formData, {
        headers: {
          Authorization: req.headers['authorization'],
          ...formData.getHeaders(),
        },
      })

      return res.status(response.status).json(
        new BaseResponse({
          data: response.data,
          statusCode: response.status,
          hasErrors: false,
          errors: [],
        })
      )
    } catch (error: unknown) {
      console.log(error)
      return res.status(400).json(
        new BaseResponse({
          errors: ['Error al actualizar el perfil.'],
          hasErrors: true,
          statusCode: res.statusCode,
        })
      )
    }
  }
)

router.get('/get-properties', tokenMiddleware, async (req: Request, res: Response) => {
  try {
    const response = await httpClient.get('/Users/get-tenantAnnounce', {
      headers: {
        Authorization: req.headers['Authorization'],
      },
    })

    return res.status(response.status).json(
      new BaseResponse({
        data: response.data,
        statusCode: response.status,
        hasErrors: false,
        errors: [],
      })
    )
  } catch (error: unknown) {
    console.log(error)
    return res.status(404).json(
      new BaseResponse({
        errors: ['No se encontraron propiedades.'],
        hasErrors: true,
        statusCode: res.statusCode,
      })
    )
  }
})

router.delete('/profile/:id', async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const response = await httpClient.delete(`/users/${id}`)

    return res.status(response.status).json(response.data)
  } catch (error: any) {
    return res
      .status(error.response?.status || 500)
      .json({ error: error.response?.data || 'Error interno del servidor' })
  }
})

export default router
