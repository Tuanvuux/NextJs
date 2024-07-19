import z from 'zod'

export const CreateProductBody = z.object({
  productCd:z.string().min(1).max(3),
  name: z.string().min(1).max(256),
  dateOffered: z.date(),
  dateRetired: z.date(),
  productTypeCd: z.string().min(1).max(3)
})

export type CreateProductBodyType = z.TypeOf<typeof CreateProductBody>

export const ProductSchema = z.object({
  productCd:z.string().min(1).max(3),
  name: z.string().min(1).max(256),
  dateOffered: z.date(),
  dateRetired: z.date(),
  productTypeCd: z.string().min(1).max(3)
})

export const ProductRes = z.object({
  data: ProductSchema,
  message: z.string()
})

export type ProductResType = z.TypeOf<typeof ProductRes>

export const ProductListRes = z.object({
  data: z.array(ProductSchema),
  message: z.string()
})

export type ProductListResType = z.TypeOf<typeof ProductListRes>

export const UpdateProductBody = CreateProductBody
export type UpdateProductBodyType = CreateProductBodyType
export const ProductParams = z.object({
  id: z.coerce.number()
})
export type ProductParamsType = z.TypeOf<typeof ProductParams>
