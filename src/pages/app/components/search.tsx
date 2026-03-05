import { Search } from 'lucide-react'

export function SearchComponent() {
  return (
      <div className="max-w-xl w-full mx-auto space-y-5">

<div className="mt-6">
        <h1 className="text-2xl font-bold text-zinc-100">Codi Cantina</h1>
        <p className="text-zinc-400">
          Abaixo você pode buscar produtos e adicionar ao carrinho.
        </p>
      </div>

      <div>
        <div className="flex items-center gap-3 bg-zinc-900 p-2 rounded-md border border-gray-700/30">
          <Search className="size-5 text-zinc-400" />
          <input
            className="outline-0 flex-1 bg-transparent"
            type="text"
            placeholder="Pesquise por um produto..."
          />
        </div>
      </div>
        </div>
    )
}