import { Request, Response, Router } from 'express'
import FormData from 'form-data'
import multer from 'multer'
import { BaseResponse } from '../../shared/utils/baseResponse'
import { tokenMiddleware } from '../middlewares/tokenMiddleware'
import validateCreateProperty from '../middlewares/validateCreateProperty'
import { validationError } from '../middlewares/validationError'
import httpClient from '../services/httpClient'

const upload = multer();

const router = Router()

router.post(
  '/create-property',
  upload.array('Images'),
  tokenMiddleware,
  validateCreateProperty,
  validationError,
  async (req: Request, res: Response) => {
    const {
      countryId,
      stateId,
      title,
      address,
      environments,
      bathrooms,
      bedrooms,
      seniority,
      water,
      gas,
      surveillance,
      electricity,
      internet,
      pool,
      garage,
      pets,
      grill,
      elevator,
      terrace,
      description,
      ownerEmail,
      price,
      requirementPostRequestDto: { isWorking, hasWarranty, rangeSalary },
    } = req.body

    const formData = new FormData();
    formData.append('CountryId', countryId || '');
    formData.append('StateId', stateId || '');
    formData.append('Title', title || '');
    formData.append('Address', address || '');
    formData.append('Environments', environments || '');
    formData.append('Bathrooms', bathrooms || '');
    formData.append('Bedrooms', bedrooms || '');
    formData.append('Seniority', seniority || '');
    formData.append('Water', water || '');
    formData.append('Gas', gas || '');
    formData.append('Surveillance', surveillance || '');
    formData.append('Electricity', electricity || '');
    formData.append('Internet', internet || '');
    formData.append('Pool', pool || '');
    formData.append('Garage', garage || '');
    formData.append('Pets', pets || '');
    formData.append('Grill', grill || '');
    formData.append('Elevator', elevator || '');
    formData.append('Terrace', terrace || '');
    formData.append('Description', description || '');
    formData.append('OwnerEmail', ownerEmail || '');
    formData.append('Price', price || '');
    formData.append('RequirementPostRequestDto.IsWorking', isWorking || '');
    formData.append('RequirementPostRequestDto.HasWarranty', hasWarranty || '');
    formData.append('RequirementPostRequestDto.RangeSalary', rangeSalary || '');

    if (req.files && Array.isArray(req.files)) {
      req.files.forEach((file, index) => {
        formData.append(`Images[${index}]`, file.buffer, {
          filename: file.originalname,
          contentType: file.mimetype,
        });
      });
    }

    try {
      const response = await httpClient.post(
        '/Properties/PostProperty',
        formData,
        {
          params: { ownerEmail },
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
      )
    } catch (error: unknown) {
      console.error(error)
      return res.status(400).json(
        new BaseResponse({
          errors: ['Error al registrar la propiedad.'],
          hasErrors: true,
          statusCode: res.statusCode,
        })
      )
    }
  }
)

router.get('/get-properties', tokenMiddleware, async (req: Request, res: Response) => {
  try {
    const { CountryId, StateId, PriceMin, PriceMax, IsWorking, HasWarranty, RangeSalaryMin, RangeSalaryMax, Title } =
      req.query
    const response = await httpClient.get('/Properties', {
      params: { CountryId, StateId, PriceMin, PriceMax, IsWorking, HasWarranty, RangeSalaryMin, RangeSalaryMax, Title },
      headers: {
        Authorization: req.headers['authorization'],
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
        errors: ['No se encontraron propiedades que coincidan con su búsqueda.'],
        hasErrors: true,
        statusCode: res.statusCode,
      })
    )
  }
})

export default router
