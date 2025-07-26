/**
 * ProductList Component - Enhanced Shopping Interface with Category Navigation
 * 
 * This component displays all available plants organized by categories
 * and provides an enhanced shopping interface with category filtering,
 * cart functionality, and improved user experience.
 * 
 * React Concepts Used:
 * - useState Hook: For local component state (showCart, selectedCategory)
 * - useSelector Hook: For reading data from Redux store
 * - useDispatch Hook: For dispatching actions to Redux store
 * - Event Handlers: For user interactions (navigation, filtering, adding to cart)
 * - Conditional Rendering: Showing different views based on state
 * - Component Props: Receiving onHomeClick from parent component
 * - Array Methods: map(), filter() for rendering and filtering data
 * 
 * Redux Integration:
 * - Connects to cart slice to add items and read cart state
 * - Dispatches addItem actions when users click "Add to Cart"
 * - Reads cart items count for display in cart icon
 * 
 * Enhanced Features:
 * - Category filtering/navigation
 * - Show all categories or filter by specific category
 * - Improved Continue Shopping functionality
 * - Better visual organization
 */

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css'
import CartItem from './CartItem';

/**
 * ProductList Component
 * 
 * Enhanced shopping interface with category navigation and filtering
 * Manages navigation between plants view and cart view
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onHomeClick - Callback function to navigate back to home/landing page
 * @returns {JSX.Element} The enhanced product list component
 */
function ProductList({ onHomeClick }) {
    /**
     * Local State Management
     * 
     * Enhanced state management for better user experience
     */
    const [showCart, setShowCart] = useState(false); // Controls cart view visibility
    const [selectedCategory, setSelectedCategory] = useState('all'); // Controls category filtering

    /**
     * Redux State Connection
     * 
     * useSelector hook connects component to Redux store
     * Automatically re-renders component when selected state changes
     */
    const cartItems = useSelector(state => state.cart.items);
    
    /**
     * Redux Action Dispatcher
     * 
     * useDispatch hook returns function to send actions to Redux store
     */
    const dispatch = useDispatch();

    /**
     * Calculate total items in cart for badge display
     */
    const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    /**
     * Plant Categories Data
     * 
     * Organized plant data with categories for easy filtering and display
     */
    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Produces oxygen at night, improving air quality.",
                    cost: "$15"
                },
                {
                    name: "Spider Plant",
                    image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                    description: "Filters formaldehyde and xylene from the air.",
                    cost: "$12"
                },
                {
                    name: "Peace Lily",
                    image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
                    description: "Removes mold spores and purifies the air.",
                    cost: "$18"
                },
                {
                    name: "Boston Fern",
                    image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg",
                    description: "Adds humidity to the air and removes toxins.",
                    cost: "$20"
                },
                {
                    name: "Rubber Plant",
                    image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg",
                    description: "Easy to care for and effective at removing toxins.",
                    cost: "$17"
                },
                {
                    name: "Aloe Vera",
                    image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
                    description: "Purifies the air and has healing properties for skin.",
                    cost: "$14"
                }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                {
                    name: "Lavender",
                    image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    description: "Calming scent, used in aromatherapy.",
                    cost: "$20"
                },
                {
                    name: "Jasmine",
                    image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    description: "Sweet fragrance, promotes relaxation.",
                    cost: "$18"
                },
                {
                    name: "Rosemary",
                    image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg",
                    description: "Invigorating scent, often used in cooking.",
                    cost: "$15"
                },
                {
                    name: "Mint",
                    image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg",
                    description: "Refreshing aroma, used in teas and cooking.",
                    cost: "$12"
                },
                {
                    name: "Lemon Balm",
                    image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg",
                    description: "Citrusy scent, relieves stress and promotes sleep.",
                    cost: "$14"
                },
                {
                    name: "Hyacinth",
                    image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg",
                    description: "Hyacinth is a beautiful flowering plant known for its fragrant.",
                    cost: "$22"
                }
            ]
        },
        {
            category: "Insect Repellent Plants",
            plants: [
                {
                    name: "oregano",
                    image: "https://cdn.pixabay.com/photo/2015/05/30/21/20/oregano-790702_1280.jpg",
                    description: "The oregano plants contains compounds that can deter certain insects.",
                    cost: "$10"
                },
                {
                    name: "Marigold",
                    image: "https://cdn.pixabay.com/photo/2022/02/22/05/45/marigold-7028063_1280.jpg",
                    description: "Natural insect repellent, also adds color to the garden.",
                    cost: "$8"
                },
                {
                    name: "Geraniums",
                    image: "https://cdn.pixabay.com/photo/2012/04/26/21/51/flowerpot-43270_1280.jpg",
                    description: "Known for their insect-repelling properties while adding a pleasant scent.",
                    cost: "$20"
                },
                {
                    name: "Basil",
                    image: "https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg",
                    description: "Repels flies and mosquitoes, also used in cooking.",
                    cost: "$9"
                },
                {
                    name: "Lavender",
                    image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    description: "Calming scent, used in aromatherapy.",
                    cost: "$20"
                },
                {
                    name: "Catnip",
                    image: "https://cdn.pixabay.com/photo/2015/07/02/21/55/cat-829681_1280.jpg",
                    description: "Repels mosquitoes and attracts cats.",
                    cost: "$13"
                }
            ]
        },
        {
            category: "Medicinal Plants",
            plants: [
                {
                    name: "Aloe Vera",
                    image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
                    description: "Soothing gel used for skin ailments.",
                    cost: "$14"
                },
                {
                    name: "Echinacea",
                    image: "https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg",
                    description: "Boosts immune system, helps fight colds.",
                    cost: "$16"
                },
                {
                    name: "Peppermint",
                    image: "https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg",
                    description: "Relieves digestive issues and headaches.",
                    cost: "$13"
                },
                {
                    name: "Lemon Balm",
                    image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg",
                    description: "Calms nerves and promotes relaxation.",
                    cost: "$14"
                },
                {
                    name: "Chamomile",
                    image: "https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg",
                    description: "Soothes anxiety and promotes sleep.",
                    cost: "$15"
                },
                {
                    name: "Calendula",
                    image: "https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg",
                    description: "Heals wounds and soothes skin irritations.",
                    cost: "$12"
                }
            ]
        },
        {
            category: "Low Maintenance Plants",
            plants: [
                {
                    name: "ZZ Plant",
                    image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    description: "Thrives in low light and requires minimal watering.",
                    cost: "$25"
                },
                {
                    name: "Pothos",
                    image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg",
                    description: "Tolerates neglect and can grow in various conditions.",
                    cost: "$10"
                },
                {
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Needs infrequent watering and is resilient to most pests.",
                    cost: "$15"
                },
                {
                    name: "Cast Iron Plant",
                    image: "https://cdn.pixabay.com/photo/2017/02/16/18/04/cast-iron-plant-2072008_1280.jpg",
                    description: "Hardy plant that tolerates low light and neglect.",
                    cost: "$20"
                },
                {
                    name: "Succulents",
                    image: "https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg",
                    description: "Drought-tolerant plants with unique shapes and colors.",
                    cost: "$18"
                },
                {
                    name: "Aglaonema",
                    image: "https://cdn.pixabay.com/photo/2014/10/10/04/27/aglaonema-482915_1280.jpg",
                    description: "Requires minimal care and adds color to indoor spaces.",
                    cost: "$22"
                }
            ]
        }
    ];

    /**
     * Get Filtered Categories
     * 
     * Returns categories based on current filter selection
     * If 'all' is selected, returns all categories
     * Otherwise, returns only the selected category
     * 
     * @returns {Array} Filtered array of categories
     */
    const getFilteredCategories = () => {
        if (selectedCategory === 'all') {
            return plantsArray;
        }
        return plantsArray.filter(categoryObj => categoryObj.category === selectedCategory);
    };

    /**
     * Inline Styles Objects
     */
    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff!important',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '20px',
    };

    const styleObjUl = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '1100px',
    };

    const styleA = {
        color: 'white',
        fontSize: '30px',
        textDecoration: 'none',
    };

    /**
     * Event Handlers
     */

    /**
     * Handle Home Navigation
     */
    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    /**
     * Handle Cart View Toggle
     * 
     * Shows the cart view when cart icon is clicked
     */
    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    /**
     * Handle Plants View Toggle
     * 
     * Shows the plants view when "Plants" link is clicked
     * Resets to show all categories
     */
    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowCart(false);
        setSelectedCategory('all'); // Reset to show all categories
    };

    /**
     * Handle Continue Shopping - FIXED
     * 
     * Called from CartItem component via props
     * Returns user from cart view back to plants view
     * Ensures proper state management
     */
    const handleContinueShopping = () => {
        setShowCart(false); // Hide cart view
        // Don't change selectedCategory - keep user's current filter
    };

    /**
     * Handle Category Selection
     * 
     * Filters plants by selected category
     * 
     * @param {string} category - Category name to filter by
     */
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        // Scroll to top of products section for better UX
        document.querySelector('.product-grid')?.scrollIntoView({ behavior: 'smooth' });
    };

    /**
     * Handle Add to Cart
     */
    const handleAddToCart = (plant) => {
        dispatch(addItem({
            name: plant.name,
            image: plant.image,
            description: plant.description,
            cost: plant.cost
        }));

        // Show user feedback
        console.log(`Added ${plant.name} to cart!`);
    };

    /**
     * Component Render
     */
    return (
        <div>
            {/* Navigation Bar */}
            <div className="navbar" style={styleObj}>
                {/* Brand/Logo Section */}
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="Paradise Nursery Logo" />
                        <a href="/" onClick={handleHomeClick}>
                            <div>
                                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Navigation Links */}
                <div style={styleObjUl}>
                    <div>
                        <a href="#" onClick={handlePlantsClick} style={styleA}>Plants</a>
                    </div>
                    
                    {/* Cart icon with item count badge */}
                    <div>
                        <a href="#" onClick={handleCartClick} style={styleA}>
                            <div className="cart-container" style={{ position: 'relative' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="68" width="68">
                                    <rect width="156" height="156" fill="none"></rect>
                                    <circle cx="80" cy="216" r="12"></circle>
                                    <circle cx="184" cy="216" r="12"></circle>
                                    <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                </svg>
                                
                                {totalCartItems > 0 && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '5px',
                                        right: '5px',
                                        backgroundColor: '#ff4444',
                                        color: 'white',
                                        borderRadius: '50%',
                                        padding: '2px 6px',
                                        fontSize: '12px',
                                        fontWeight: 'bold'
                                    }}>
                                        {totalCartItems}
                                    </span>
                                )}
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            {!showCart ? (
                /* Enhanced Plants View with Category Navigation */
                <div className="product-grid">
                    <h2 style={{ textAlign: 'center', margin: '20px 0', fontSize: '2em', color: '#4CAF50' }}>
                        Our Plant Collection
                    </h2>
                    
                    {/* Category Filter Navigation */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: '10px',
                        margin: '20px 0',
                        padding: '20px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '8px'
                    }}>
                        <button
                            onClick={() => handleCategorySelect('all')}
                            style={{
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                backgroundColor: selectedCategory === 'all' ? '#4CAF50' : '#e0e0e0',
                                color: selectedCategory === 'all' ? 'white' : '#333',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            All Categories ({plantsArray.reduce((total, cat) => total + cat.plants.length, 0)} plants)
                        </button>
                        
                        {plantsArray.map((categoryObj, index) => (
                            <button
                                key={index}
                                onClick={() => handleCategorySelect(categoryObj.category)}
                                style={{
                                    padding: '10px 20px',
                                    border: 'none',
                                    borderRadius: '20px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    backgroundColor: selectedCategory === categoryObj.category ? '#4CAF50' : '#e0e0e0',
                                    color: selectedCategory === categoryObj.category ? 'white' : '#333',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseOver={(e) => {
                                    if (selectedCategory !== categoryObj.category) {
                                        e.target.style.backgroundColor = '#c8e6c9';
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if (selectedCategory !== categoryObj.category) {
                                        e.target.style.backgroundColor = '#e0e0e0';
                                    }
                                }}
                            >
                                {categoryObj.category} ({categoryObj.plants.length})
                            </button>
                        ))}
                    </div>
                    
                    {/* Render Selected Categories */}
                    {getFilteredCategories().map((category, categoryIndex) => (
                        <div key={categoryIndex} className="category-section" style={{ marginBottom: '40px' }}>
                            {/* Category Header */}
                            <h3 style={{ 
                                fontSize: '1.5em', 
                                color: '#2E7D32', 
                                borderBottom: '2px solid #4CAF50',
                                paddingBottom: '10px',
                                marginBottom: '20px'
                            }}>
                                {category.category} ({category.plants.length} plants)
                            </h3>
                            
                            {/* Plants Grid for this category */}
                            <div className="plants-grid" style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '20px',
                                padding: '0 20px'
                            }}>
                                {category.plants.map((plant, plantIndex) => (
                                    <div key={plantIndex} className="plant-card" style={{
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        padding: '15px',
                                        backgroundColor: '#f9f9f9',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                        transition: 'transform 0.2s ease'
                                    }}>
                                        <img 
                                            src={plant.image} 
                                            alt={plant.name}
                                            style={{
                                                width: '100%',
                                                height: '200px',
                                                objectFit: 'cover',
                                                borderRadius: '4px',
                                                marginBottom: '10px'
                                            }}
                                        />
                                        
                                        <h4 style={{ color: '#2E7D32', marginBottom: '8px' }}>
                                            {plant.name}
                                        </h4>
                                        <p style={{ 
                                            fontSize: '14px', 
                                            color: '#666', 
                                            marginBottom: '10px',
                                            lineHeight: '1.4'
                                        }}>
                                            {plant.description}
                                        </p>
                                        
                                        <div style={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            alignItems: 'center',
                                            marginTop: '15px'
                                        }}>
                                            <span style={{ 
                                                fontSize: '18px', 
                                                fontWeight: 'bold', 
                                                color: '#4CAF50' 
                                            }}>
                                                {plant.cost}
                                            </span>
                                            
                                            <button
                                                onClick={() => handleAddToCart(plant)}
                                                style={{
                                                    backgroundColor: '#4CAF50',
                                                    color: 'white',
                                                    border: 'none',
                                                    padding: '8px 16px',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    fontSize: '14px',
                                                    transition: 'background-color 0.2s ease'
                                                }}
                                                onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                                                onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Cart View with Fixed Continue Shopping */
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
