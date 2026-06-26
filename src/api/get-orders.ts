import { z } from 'zod'

const API_URL =
  import.meta.env.VITE_API_URL?.toString() ?? 'http://localhost:8080'

const orderStatusSchema = z.enum(['pending', 'paid', 'failed'])

const productOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
})

const orderItemSchema = z.object({
  id: z.string(),
  quantity: z.number(),
  price: z.number().nullable(),
  product: z
    .object({
      id: z.string(),
      name: z.string(),
      imageUrl: z.string().nullable(),
    })
    .nullable(),
})

const orderSchema = z.object({
  id: z.string(),
  total: z.number(),
  status: z.string(),
  paymentId: z.string().nullable(),
  receiptSentAt: z.string().nullable(),
  userName: z.string(),
  userEmail: z.email(),
  createdAt: z.string(),
  updatedAt: z.string(),
  coupon: z
    .object({
      id: z.string(),
      title: z.string(),
    })
    .nullable(),
  items: z.array(orderItemSchema),
})

const rankingSchema = z.object({
  productId: z.string(),
  name: z.string(),
  imageUrl: z.string().nullable(),
  quantitySold: z.number(),
  revenue: z.number(),
})

const getOrdersResponseSchema = z.object({
  orders: z.array(orderSchema),
  products: z.array(productOptionSchema),
  ranking: z.array(rankingSchema),
  summary: z.object({
    totalOrders: z.number(),
    totalRevenue: z.number(),
    pendingOrders: z.number(),
    paidOrders: z.number(),
    failedOrders: z.number(),
  }),
  metas: z.object({
    totalOrders: z.number(),
    totalPages: z.number(),
  }),
})

const apiErrorSchema = z.object({
  error: z.string().optional(),
  message: z.string().optional(),
})

export type OrderStatus = z.infer<typeof orderStatusSchema>
export type Order = z.infer<typeof orderSchema>
export type GetOrdersResponse = z.infer<typeof getOrdersResponseSchema>

export interface GetOrdersQuery {
  pageIndex?: number
  status?: OrderStatus | 'all'
  productId?: string
  search?: string
  startDate?: string
  endDate?: string
}

export async function getOrders(
  query: GetOrdersQuery = {}
): Promise<GetOrdersResponse> {
  const params = new URLSearchParams()
  params.set('pageIndex', String(query.pageIndex ?? 0))

  if (query.status && query.status !== 'all') params.set('status', query.status)
  if (query.productId && query.productId !== 'all') {
    params.set('productId', query.productId)
  }
  if (query.search?.trim()) params.set('search', query.search.trim())
  if (query.startDate) params.set('startDate', query.startDate)
  if (query.endDate) params.set('endDate', query.endDate)

  const response = await fetch(`${API_URL}/orders?${params.toString()}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })

  const raw = await response.json().catch(() => null)

  if (!response.ok) {
    const parsedError = apiErrorSchema.safeParse(raw)
    const message = parsedError.success
      ? (parsedError.data.error ?? parsedError.data.message)
      : `Erro ao buscar pedidos (HTTP ${response.status})`

    throw new Error(message)
  }

  const parsedResponse = getOrdersResponseSchema.safeParse(raw)

  if (!parsedResponse.success) {
    console.error('Payload inesperado em /orders:', raw)
    throw new Error('Resposta da API invalida (formato inesperado).')
  }

  return parsedResponse.data
}
