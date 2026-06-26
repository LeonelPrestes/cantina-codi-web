import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import {
  getOrders,
  type GetOrdersResponse,
  type OrderStatus,
} from '@/api/get-orders'
import { Pagination } from '@/components/pagination'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ArrowLeft, RotateCcw, Search } from 'lucide-react'

const emptyOrdersResponse: GetOrdersResponse = {
  orders: [],
  products: [],
  ranking: [],
  summary: {
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    paidOrders: 0,
    failedOrders: 0,
  },
  metas: {
    totalOrders: 0,
    totalPages: 0,
  },
}

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  paid: 'Pago',
  failed: 'Falhou',
}

const moneyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

function formatDate(value: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

export function Orders() {
  const [data, setData] = useState<GetOrdersResponse>(emptyOrdersResponse)
  const [pageIndex, setPageIndex] = useState(0)
  const [status, setStatus] = useState<OrderStatus | 'all'>('all')
  const [productId, setProductId] = useState('all')
  const [search, setSearch] = useState('')
  const [appliedSearch, setAppliedSearch] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const totalPages = Math.max(data.metas.totalPages, 1)

  const filters = useMemo(
    () => ({
      pageIndex,
      status,
      productId,
      search: appliedSearch,
      startDate: startDate || undefined,
      endDate: endDate ? `${endDate}T23:59:59` : undefined,
    }),
    [appliedSearch, endDate, pageIndex, productId, startDate, status]
  )

  useEffect(() => {
    async function fetchOrders() {
      try {
        setIsLoading(true)
        const response = await getOrders(filters)
        setData(response)
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Erro ao buscar pedidos.'
        toast.error(message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [filters])

  function handlePageChange(nextPageIndex: number) {
    if (nextPageIndex < 0 || nextPageIndex >= totalPages) return
    setPageIndex(nextPageIndex)
  }

  function applySearch() {
    setPageIndex(0)
    setAppliedSearch(search)
  }

  function resetFilters() {
    setPageIndex(0)
    setStatus('all')
    setProductId('all')
    setSearch('')
    setAppliedSearch('')
    setStartDate('')
    setEndDate('')
  }

  return (
    <div className='mx-auto flex w-full max-w-6xl flex-col gap-6'>
      <div>
        <Button asChild variant='ghost' size='sm' className='mb-2 px-0'>
          <Link to='/dashboard'>
            <ArrowLeft />
            Voltar
          </Link>
        </Button>
        <h1 className='text-2xl font-bold text-zinc-100'>Pedidos</h1>
        <p className='text-sm text-zinc-400'>
          Acompanhe pedidos, pagamentos e produtos mais vendidos.
        </p>
      </div>

      <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-5'>
        <div className='rounded-md border border-zinc-800 bg-zinc-950 p-4'>
          <span className='text-xs text-zinc-500'>Pedidos</span>
          <strong className='mt-1 block text-xl text-zinc-100'>
            {data.summary.totalOrders}
          </strong>
        </div>
        <div className='rounded-md border border-zinc-800 bg-zinc-950 p-4'>
          <span className='text-xs text-zinc-500'>Receita paga</span>
          <strong className='mt-1 block text-xl text-zinc-100'>
            {moneyFormatter.format(data.summary.totalRevenue)}
          </strong>
        </div>
        <div className='rounded-md border border-zinc-800 bg-zinc-950 p-4'>
          <span className='text-xs text-zinc-500'>Pagos</span>
          <strong className='mt-1 block text-xl text-emerald-400'>
            {data.summary.paidOrders}
          </strong>
        </div>
        <div className='rounded-md border border-zinc-800 bg-zinc-950 p-4'>
          <span className='text-xs text-zinc-500'>Pendentes</span>
          <strong className='mt-1 block text-xl text-amber-400'>
            {data.summary.pendingOrders}
          </strong>
        </div>
        <div className='rounded-md border border-zinc-800 bg-zinc-950 p-4'>
          <span className='text-xs text-zinc-500'>Falhas</span>
          <strong className='mt-1 block text-xl text-red-400'>
            {data.summary.failedOrders}
          </strong>
        </div>
      </div>

      <div className='grid gap-6 lg:grid-cols-[1fr_320px]'>
        <div className='flex min-w-0 flex-col gap-4'>
          <div className='grid gap-3 rounded-md border border-zinc-800 bg-zinc-950 p-4 md:grid-cols-[1fr_170px_190px]'>
            <div className='flex gap-2'>
              <Input
                placeholder='Buscar por cliente, e-mail, pedido ou pagamento'
                value={search}
                onChange={event => setSearch(event.target.value)}
                onKeyDown={event => {
                  if (event.key === 'Enter') applySearch()
                }}
              />
              <Button onClick={applySearch} size='icon' title='Buscar'>
                <Search />
              </Button>
            </div>

            <Select
              value={status}
              onValueChange={value => {
                setStatus(value as OrderStatus | 'all')
                setPageIndex(0)
              }}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Todos os status</SelectItem>
                <SelectItem value='pending'>Pendente</SelectItem>
                <SelectItem value='paid'>Pago</SelectItem>
                <SelectItem value='failed'>Falhou</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={productId}
              onValueChange={value => {
                setProductId(value)
                setPageIndex(0)
              }}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Produto' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Todos os produtos</SelectItem>
                {data.products.map(product => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type='date'
              value={startDate}
              onChange={event => {
                setStartDate(event.target.value)
                setPageIndex(0)
              }}
            />
            <Input
              type='date'
              value={endDate}
              onChange={event => {
                setEndDate(event.target.value)
                setPageIndex(0)
              }}
            />
            <Button variant='outline' onClick={resetFilters}>
              <RotateCcw />
              Limpar filtros
            </Button>
          </div>

          <div className='rounded-md border border-zinc-800'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pedido</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Produtos</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className='text-center text-zinc-400'
                    >
                      Carregando pedidos...
                    </TableCell>
                  </TableRow>
                )}

                {!isLoading && data.orders.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className='text-center text-zinc-400'
                    >
                      Nenhum pedido encontrado.
                    </TableCell>
                  </TableRow>
                )}

                {!isLoading &&
                  data.orders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell className='font-mono text-xs text-zinc-300'>
                        {order.id.slice(0, 8)}
                      </TableCell>
                      <TableCell>
                        <div className='flex flex-col'>
                          <span className='font-medium text-zinc-100'>
                            {order.userName}
                          </span>
                          <span className='text-xs text-zinc-500'>
                            {order.userEmail}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className='rounded-md border border-zinc-700 px-2 py-1 text-xs text-zinc-200'>
                          {statusLabels[order.status] ?? order.status}
                        </span>
                      </TableCell>
                      <TableCell className='max-w-[260px] whitespace-normal text-zinc-300'>
                        {order.items
                          .map(
                            item =>
                              `${item.quantity}x ${item.product?.name ?? 'Produto removido'}`
                          )
                          .join(', ')}
                      </TableCell>
                      <TableCell className='font-medium'>
                        {moneyFormatter.format(order.total)}
                      </TableCell>
                      <TableCell>{formatDate(order.createdAt)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>

          <Pagination
            onPageChange={handlePageChange}
            pageIndex={pageIndex}
            totalPages={totalPages}
            totalProducts={data.metas.totalOrders}
          />
        </div>

        <aside className='rounded-md border border-zinc-800 bg-zinc-950 p-4'>
          <h2 className='text-lg font-semibold text-zinc-100'>Mais vendidos</h2>
          <div className='mt-4 flex flex-col gap-3'>
            {data.ranking.length === 0 && (
              <span className='text-sm text-zinc-500'>
                Sem vendas para os filtros atuais.
              </span>
            )}

            {data.ranking.map((product, index) => (
              <div
                key={product.productId}
                className='flex items-center gap-3 rounded-md border border-zinc-800 p-3'
              >
                <span className='flex h-8 w-8 items-center justify-center rounded-md bg-zinc-900 text-sm font-semibold text-zinc-300'>
                  {index + 1}
                </span>
                <div className='min-w-0 flex-1'>
                  <strong className='block truncate text-sm text-zinc-100'>
                    {product.name}
                  </strong>
                  <span className='text-xs text-zinc-500'>
                    {product.quantitySold} un. vendidas
                  </span>
                </div>
                <span className='text-xs font-medium text-zinc-300'>
                  {moneyFormatter.format(product.revenue)}
                </span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
