import React, { useState, useEffect } from 'react'

const App = () => {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')
  const [newQuantity, setNewQuantity] = useState(1)

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('shoppingItems')) || []
    setItems(storedItems)
  }, [])

  const saveItems = (newItems) => {
    localStorage.setItem('shoppingItems', JSON.stringify(newItems))
    setItems(newItems)
  }

  const addItem = () => {
    if (newItem.trim() === '') return

    const newItems = [
      ...items,
      { id: Date.now(), name: newItem, quantity: newQuantity, inCart: false }
    ]

    saveItems(newItems)
    setNewItem('')
    setNewQuantity(1)
  }

  const toggleInCart = (id) => {
    const newItems = items.map(item =>
      item.id === id ? { ...item, inCart: !item.inCart } : item
    )

    saveItems(newItems)
  }

  return (
    <div className="container">
      <h1>Shopping List</h1>
      <form onSubmit={(e) => { e.preventDefault(); addItem() }}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Item name"
        />
        <input
          type="number"
          value={newQuantity}
          onChange={(e) => setNewQuantity(parseInt(e.target.value))}
          min="1"
        />
        <button type="submit">Ajouter</button>
      </form>
      <ul>
        {items.map(item => (
          <li key={item.id} className={item.inCart ? 'strikethrough' : ''}>
            {item.name} - {item.quantity}
            <button
              onClick={() => toggleInCart(item.id)}
              className={item.inCart ? 'strikethrough' : ''}
            >
              {item.inCart ? 'Annuler' : 'OK'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
