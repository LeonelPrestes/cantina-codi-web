import { Button } from '@/components/ui/button'

export function Categories() {
    return (
        <div>
            <h2 className="text-xl font-semibold text-zinc-100">Categorias</h2>

            <div className="flex items-center gap-3 overflow-x-auto py-2">
                {Array.from({ length: 10 }).map((_, index) => (
                    <Button variant="secondary" key={index}>{`Categoria ${index + 1
                        }`}</Button>
                ))}
            </div>
        </div>
    )
}