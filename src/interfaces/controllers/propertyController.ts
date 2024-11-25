import { Request, Response, Router } from 'express'
import { validationResult } from 'express-validator'

import { BaseResponse } from '../../shared/utils/baseResponse'
// import validateCreateProperty from '../middlewares/validateCreateProperty'
import httpClient from '../services/httpClient'

const router = Router()

// router.post('/createProperty', validateCreateProperty, async (req: Request, res: Response) => {
//   const errors = validationResult(req)

//   if (!errors.isEmpty()) {
//     const errorsValidation = errors.array().map((error) => error.msg)

//     return res.status(400).json(
//       new BaseResponse({
//         errors: errorsValidation,
//         hasErrors: true,
//         statusCode: res.statusCode,
//       })
//     )
//   }

//   const { ownerEmail } = req.query

//   if (!ownerEmail || typeof ownerEmail !== 'string') {
//     return res.status(400).json(
//       new BaseResponse({
//         errors: ['El correo del propietario (ownerEmail) es obligatorio y debe ser un string.'],
//         hasErrors: true,
//         statusCode: res.statusCode,
//       })
//     )
//   }

//   const {
//     countryId,
//     stateId,
//     title,
//     address,
//     environments,
//     bathrooms,
//     bedrooms,
//     seniority,
//     water,
//     gas,
//     surveillance,
//     electricity,
//     internet,
//     pool,
//     garage,
//     pets,
//     grill,
//     elevator,
//     terrace,
//     description,
//     requirementPostRequestDto: { isWorking, hasWarranty, rangeSalary },
//   } = req.body

//   const token = req.headers.authorization

//   try {
//     const response = await httpClient.post(
//       '/Properties/PostProperty',
//       {
//         CountryId: countryId,
//         StateId: stateId,
//         Title: title,
//         Address: address,
//         Environments: environments,
//         Bathrooms: bathrooms,
//         Bedrooms: bedrooms,
//         Seniority: seniority,
//         Water: water,
//         Gas: gas,
//         Surveillance: surveillance,
//         Electricity: electricity,
//         Internet: internet,
//         Pool: pool,
//         Garage: garage,
//         Pets: pets,
//         Grill: grill,
//         Elevator: elevator,
//         Terrace: terrace,
//         Description: description,
//         RequirementPostRequestDto: {
//           IsWorking: isWorking,
//           HasWarranty: hasWarranty,
//           RangeSalary: rangeSalary,
//         },
//         OwnerEmail: ownerEmail,
//       },
//       {
//         headers: {
//           Authorization: token, // Pasar el token en el encabezado de la solicitud
//         },
//       }
//     )

//     return res.status(response.status).json(response.data)
//   } catch (error: unknown) {
//     console.error(error)
//     return res.status(400).json(
//       new BaseResponse({
//         errors: ['Error al registrar la propiedad.'],
//         hasErrors: true,
//         statusCode: res.statusCode,
//       })
//     )
//   }
// })

router.post('/createProperty', async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorsValidation = errors.array().map((error) => error.msg)

    return res.status(400).json(
      new BaseResponse({
        errors: errorsValidation,
        hasErrors: true,
        statusCode: res.statusCode,
      })
    )
  }

  const { ownerEmail } = req.query
  const propertyPostRequestDto = req.body

  try {
    const response = await httpClient.post('/Properties/PostProperty', propertyPostRequestDto, {
      params: { ownerEmail },
    })

    return res.status(response.status).json(response.data)
  } catch (error: unknown) {
    return res.status(400).json(
      new BaseResponse({
        errors: ['Error al publicar la propiedad.'],
        hasErrors: true,
        statusCode: res.statusCode,
      })
    )
  }
})

router.get('/properties/getProperties', async (_req: Request, res: Response) => {
  try {
    const response = await httpClient.get('/Properties')
    return res.status(response.status).json(response.data)
  } catch (error: unknown) {
    return res.status(404).json(
      new BaseResponse({
        errors: ['No se encontraron propiedades que coincidan con su búsqueda.'],
        hasErrors: true,
        statusCode: res.statusCode,
      })
    )
  }
})

export default router
