import { useState } from 'react'
import products from './products.json'





function App() {
  
  const [search, setSearch] = useState('')

  const [category, setCategory] = useState('All')

  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const [sort, setSort] = useState('')

  const [cart, setCart] = useState([])

  const [showCart, setShowCart] = useState(false)


  function addToCart(product) {
    const item = cart.find((item) => item.id === product.id)

    if (item) {
      setCart(cart.map((item) =>item.id === product.id ? { ...item, quantity: item.quantity + 1 }: item))}
      else {setCart([...cart, { ...product, quantity: 1 }])}
  }

  function changeQuantity(id, amount) {
    setCart(cart.map((item) =>item.id === id ? { ...item, quantity: item.quantity + amount }: item).filter((item) => item.quantity > 0))
  }

  
  let filteredProducts = products.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(search.toLowerCase())

    const categoryMatch = category === 'All' || product.category === category
    const minMatch = minPrice === '' || product.price >= Number(minPrice)
    const maxMatch = maxPrice === '' || product.price <= Number(maxPrice)

    return nameMatch && categoryMatch && minMatch && maxMatch
  })

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen">

      <header className="bg-white border-b">

        <div className="px-4 py-4 flex justify-between">
          <h1 className="text-2xl font-bold">My Store</h1>

          <button
            onClick={() => setShowCart(true)}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Cart ({cartCount})
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">

        <h2 className="text-3xl font-bold mb-2">Our Products</h2>

        <div className="bg-white border rounded-lg p-4 mb-6 gap-3">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-md px-3 py-2"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option value="All">All Categories</option>

            <option value="Shoes">Shoes</option>

            <option value="Accessories">Accessories</option>

            <option value="Electronics">Electronics</option>

            <option value="Clothing">Clothing</option>

            <option value="Home">Home</option>
          </select>

          <input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border rounded-md px-3 py-2"
          />

          <input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border rounded-md px-3 py-2"/>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded-md px-3 py-2">
            <option value="">Default Sort</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>

        </div>


        {filteredProducts.length > 0 ? (

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">

            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border rounded-lg overflow-hidden"
              >

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover bg-gray-100"
                />

                <div className="p-4">
                  <p className="text-sm text-gray-500">{product.category}</p>

                  <h3 className="font-semibold text-lg mt-1">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 mt-2">₹{product.price}</p>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-black text-white rounded-md py-2 text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

              </div>
            ))}

          </div>

        ) : (
          <p className="bg-white border text-gray-500">
            No products found.
          </p>
        )}

      </main>

      {showCart && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">

          <div className="bg-white rounded-lg max-w-lg w-full p-5 max-h-[85vh] overflow-y-auto">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Shopping Cart</h2>

              <button
                onClick={() => setShowCart(false)}
                className="text-xl"
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (

              <p className="text-gray-500 py-6 text-center">
                Your cart is empty.
              </p>

            ) : (
              <>

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="border-b py-3 flex justify-between gap-3"
                  >

                    <div>
                      <h3 className="font-semibold">{item.name}</h3>

                      <p className="text-sm text-gray-500">
                        ₹{item.price} each
                      </p>

                      <div className="flex items-center gap-3 mt-2">

                        <button
                          onClick={() => changeQuantity(item.id, -1)}
                          className="border rounded px-2"
                        >
                          -
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() => changeQuantity(item.id, 1)}
                          className="border rounded px-2"
                        >
                          +
                        </button>

                      </div>
                    </div>

                    <p className="font-semibold">
                      ₹{item.price * item.quantity}
                    </p>

                  </div>
                ))}

                <div className="flex justify-between font-bold text-lg mt-5">
                  <span>Total</span>
                  <span>₹{cartTotal}</span>
                </div>

              </>
            )}

          </div>
        </div>
      )}

    </div>
  )
}

export default App