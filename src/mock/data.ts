export const products = [
  {
    id: 'dddsdsdklj1',
    name: 'Hambúrguer Clássico',
    price: 19.9,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349',
    quantity: 0,
  },
  {
    id: 'dddsdsdklj2',
    name: 'Hambúrguer Duplo Bacon',
    price: 27.5,
    stock: 15,
    image:
      'https://images.unsplash.com/photo-1561758033-f8ff74d6494a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8SGFtYiVDMyVCQXJndWVyJTIwRHVwbG8lMjBCYWNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500',
    quantity: 0,
  },
  {
    id: 'dddsdsdklj3',
    name: 'Cheeseburger',
    price: 22.0,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    quantity: 0,
  },
  {
    id: 'dddsdsdklj4',
    name: 'Refrigerante Lata 350ml',
    price: 6.5,
    stock: 40,
    image:
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470',
    quantity: 0,
  },
]

export interface Product {
  id: string
  name: string
  price: number
  stock: number
  image: string
}

export const data: Product[] = products
