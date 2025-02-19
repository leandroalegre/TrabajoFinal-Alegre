import { useState } from 'react';
import products from '../../productos.json';
import './ProductList.css';
import { useCart } from '../../../context/CartContext';

export const ProductList = () => {
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const { addToCart, cart } = useCart();

    // Obtener categorías únicas
    const categories = ['Todos', ...new Set(products.map(product => product.categoria))];

    // Filtrar productos por categoría
    const filteredProducts = selectedCategory === 'Todos'
        ? products
        : products.filter(product => product.categoria === selectedCategory);

    // Verificar si un producto está sin stock
    const isOutOfStock = (product) => {
        const cartItem = cart.find(item => item.id === product.id);
        const cartQuantity = cartItem ? cartItem.quantity : 0;
        return product.stock <= cartQuantity;
    };

    return (
        <div className="product-list-container">
            <div className="category-buttons">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="products-grid">
                {filteredProducts.map(product => (
                    <div key={product.id} className={`product-card ${isOutOfStock(product) ? 'out-of-stock' : ''}`}>
                        <div className="product-image-container">
                            <img 
                                src={`/src/assets/imagenes/${product.id}.jpg`} 
                                alt={product.nombre}
                                className={isOutOfStock(product) ? 'grayscale' : ''}
                            />
                            {isOutOfStock(product) && (
                                <div className="out-of-stock-overlay">
                                    <span>Sin Stock</span>
                                </div>
                            )}
                        </div>
                        <h3>{product.nombre}</h3>
                        <p className="category">{product.categoria}</p>
                        <p className="price">${product.precio}</p>
                        <button
                            className="add-to-cart-button"
                            onClick={() => addToCart(product)}
                            disabled={isOutOfStock(product)}
                        >
                            {isOutOfStock(product) ? 'Sin Stock' : 'Agregar al carrito'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}; 