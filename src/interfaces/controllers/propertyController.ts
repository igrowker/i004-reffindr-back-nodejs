import { Request, Response, Router } from 'express'
import FormData from 'form-data'
import multer from 'multer'

import { BaseResponse } from '../../shared/utils/baseResponse'
import { tokenMiddleware } from '../middlewares/tokenMiddleware'
import httpClient from '../services/httpClient'
import { validationError } from '../middlewares/validationError'
//import validateCreateProperty from '../middlewares/validateCreateProperty'


const upload = multer({
  storage: multer.memoryStorage(),
 });



const router = Router()
router.post(
  '/create-property',
  upload.array('Images', 10),
  //validateCreateProperty,
  tokenMiddleware,
  validationError,
  async (req: Request, res: Response) => {
    const formData = new FormData();

    if (req.files && Array.isArray(req.files)) {
      req.files.forEach((file: Express.Multer.File) => {
        formData.append('Images', file.buffer, file.originalname);
      });
    }

    formData.append('CountryId', req.body.CountryId);
    formData.append('StateId', req.body.StateId);
    formData.append('Title', req.body.Title);
    formData.append('Address', req.body.Address);
    formData.append('Environments', req.body.Environments.toString());
    formData.append('Bathrooms', req.body.Bathrooms.toString());
    formData.append('Bedrooms', req.body.Bedrooms.toString());
    formData.append('Seniority', req.body.Seniority.toString());
    formData.append('Water', req.body.Water.toString());
    formData.append('Gas', req.body.Gas.toString());
    formData.append('Surveillance', req.body.Surveillance.toString());
    formData.append('Electricity', req.body.Electricity.toString());
    formData.append('Internet', req.body.Internet.toString());
    formData.append('Pool', req.body.Pool.toString());
    formData.append('Garage', req.body.Garage.toString());
    formData.append('Pets', req.body.Pets.toString());
    formData.append('Grill', req.body.Grill.toString());
    formData.append('Elevator', req.body.Elevator.toString());
    formData.append('Terrace', req.body.Terrace.toString());
    formData.append('Description', req.body.Description);
    formData.append('OwnerEmail', req.body.OwnerEmail);
    formData.append('Price', req.body.Price.toString());
    formData.append('RequirementPostRequestDto[IsWorking]', req.body.RequirementPostRequestDto.IsWorking.toString());
    formData.append('RequirementPostRequestDto[HasWarranty]', req.body.RequirementPostRequestDto.HasWarranty.toString());
    formData.append('RequirementPostRequestDto[RangeSalary]', req.body.RequirementPostRequestDto.RangeSalary);

    try {

      const response = await httpClient.post(
        `/Properties/PostProperty`,
        formData, {
          headers: {
            Authorization: req.headers['authorization'],
            ...formData.getHeaders()
          },
        }
      )

      return res.status(response.status).json(
        new BaseResponse({
          data: response.data,
          statusCode: response.status,
          hasErrors: false,
          errors: [],
        })
      );
    } catch (error: unknown) {
      console.error('Error al registrar la propiedad:', error);
      return res.status(400).json(
        new BaseResponse({
          errors: ['Error al registrar la propiedad.'],
          hasErrors: true,
          statusCode: res.statusCode,
        })
      );
    }
  }
);


router.get('/get-properties', tokenMiddleware, async (req: Request, res: Response) => {
  try {
    const { CountryId, StateId, PriceMin, PriceMax, IsWorking, HasWarranty, RangeSalaryMin, RangeSalaryMax, Title } =
      req.query
    const response = await httpClient.get('/Properties/GetProperty', {
      params: { CountryId, StateId, PriceMin, PriceMax, IsWorking, HasWarranty, RangeSalaryMin, RangeSalaryMax, Title },
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
    return res.status(404).json(
      new BaseResponse({
        errors: ['No se encontraron propiedades que coincidan con su búsqueda.'],
        hasErrors: true,
        statusCode: res.statusCode,
      })
    )
  }
})

router.get('/get-favorites-properties', tokenMiddleware, async (req: Request, res: Response) => {
  const { userId } = req.query

  try {
    const response = await httpClient.get('/Properties/GetFavoriteProperties', {
      headers: {
        Authorization: req.headers['Authorization'],
      },
      params: { userId },
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
        errors: ['No se encontraron propiedades favoritas.'],
        hasErrors: true,
        statusCode: res.statusCode,
      })
    )
  }
})

router.post('/add-favorite', tokenMiddleware, async (req: Request, res: Response) => {
  const { userId, propertyId } = req.query

  try {
    const response = await httpClient.post(
      '/Properties/AddFavorite',
      {},
      {
        headers: {
          Authorization: req.headers['Authorization'],
        },
        params: { userId, propertyId },
      }
    )

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
    const err = error as { response?: { status?: number; data?: { error?: string } } }
    return res.status(err.response?.status || 500).json(
      new BaseResponse({
        errors: [err.response?.data?.error || 'Error al agregar propiedad a favoritos.'],
        hasErrors: true,
        statusCode: res.statusCode,
      })
    )
  }
})

export default router
