/**
 * CartItem Component - Shopping Cart Management Interface
 * 
 * This component displays and manages the shopping cart functionality.
 * It shows all items added to the cart, allows quantity modifications,
 * item removal, and displays cost calculations.
 * 
 * React Concepts Used:
 * - Functional Components with hooks
 * - useSelector: Reading data from Redux store
 * - useDispatch: Dispatching actions to Redux store
 * - Event Handlers: Managing user interactions
 * - Array Methods: map() for rendering cart items
 * - Conditional Rendering: Empty cart vs items display
 * - Props: Receiving callback functions from parent
 * 
 * Redux Integration:
 * - Reads cart items from store state
 * - Dispatches updateQuantity actions for +/- buttons
 * - Dispatches removeItem actions for delete functionality
 * - Calculates totals based on current store state
 * 
 * Business Logic:
 * - Price calculations with quantity
 * - Cart total computation
 * - Quantity validation (minimum 1)
 * - Remove items functionality
 */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

/**
 * CartItem Component
 * 
 * Displays the shopping cart with all added items and provides
 * functionality to modify quantities, remove items, and proceed to checkout
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onContinueShopping - Callback function to return to shopping
 * @returns {JSX.Element} The cart management interface
 */
const CartItem = ({ onContinueShopping }) => {
  /**
   * Redux State Connection
   * 
   * useSelector connects to Redux store to read cart items
   * This creates a subscription - component re-renders when cart changes
   * 
   * State path: state.cart.items (defined in store.js and CartSlice.jsx)
   */
  const cart = useSelector(state => state.cart.items);
  
  /**
   * Redux Action Dispatcher
   * 
   * useDispatch returns function to send actions to Redux store
   * Used for updating quantities and removing items
   */
  const dispatch = useDispatch();

  /**
   * Calculate Total Cart Amount
   * 
   * Computes the total cost of all items in the cart
   * Uses Array.reduce() to sum up individual item totals
   * 
   * Logic:
   * 1. For each item, extract numeric cost (remove "$" symbol)
   * 2. Multiply cost by quantity
   * 3. Sum all item totals
   * 4. Return formatted result to 2 decimal places
   * 
   * @returns {string} Total cart amount formatted to 2 decimal places
   */
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      // Extract numeric value from cost string (e.g., "$15" -> 15)
      const itemCost = parseFloat(item.cost.replace('$', ''));
      // Add this item's total (cost * quantity) to running total
      return total + (itemCost * item.quantity);
    }, 0).toFixed(2); // Start with 0, format to 2 decimal places
  };

  /**
   * Handle Continue Shopping
   * 
   * Event handler for "Continue Shopping" button
   * Calls parent component's callback to return to product list
   * 
   * @param {Event} e - Click event object
   */
  const handleContinueShopping = (e) => {
    e.preventDefault(); // Prevent any default button behavior
    onContinueShopping(); // Call parent's callback function
  };

  /**
   * Handle Quantity Increment
   * 
   * Increases item quantity by 1 when "+" button is clicked
   * Dispatches updateQuantity action to Redux store
   * 
   * Redux Flow:
   * 1. Dispatch updateQuantity action with new quantity
   * 2. CartSlice reducer updates state
   * 3. Component re-renders with new quantity
   * 
   * @param {Object} item - Cart item to increment
   * @param {string} item.name - Item name (used as identifier)
   * @param {number} item.quantity - Current quantity
   */
  const handleIncrement = (item) => {
    // Dispatch action to increase quantity by 1
    dispatch(updateQuantity({
      name: item.name,
      quantity: item.quantity + 1
    }));
  };

  /**
   * Handle Quantity Decrement
   * 
   * Decreases item quantity by 1 when "-" button is clicked
   * If quantity would become 0, removes item instead
   * 
   * Business Rules:
   * - Minimum quantity is 1
   * - If quantity becomes 0 or less, item is removed from cart
   * 
   * @param {Object} item - Cart item to decrement
   * @param {string} item.name - Item name (used as identifier)  
   * @param {number} item.quantity - Current quantity
   */
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      // Decrease quantity by 1 if greater than 1
      dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity - 1
      }));
    } else {
      // Remove item if quantity would become 0
      dispatch(removeItem(item.name));
    }
  };

  /**
   * Handle Item Removal
   * 
   * Completely removes an item from cart when "Delete" button is clicked
   * Dispatches removeItem action regardless of quantity
   * 
   * @param {Object} item - Cart item to remove
   * @param {string} item.name - Item name (used as identifier)
   */
  const handleRemove = (item) => {
    // Dispatch action to remove item completely
    dispatch(removeItem(item.name));
  };

  /**
   * Calculate Individual Item Total Cost
   * 
   * Computes the total cost for a single item (price × quantity)
   * Used to display individual item totals in the cart
   * 
   * @param {Object} item - Cart item
   * @param {string} item.cost - Item cost as string (e.g., "$15")
   * @param {number} item.quantity - Item quantity
   * @returns {string} Item total formatted to 2 decimal places
   */
  const calculateTotalCost = (item) => {
    // Extract numeric cost and multiply by quantity
    const itemCost = parseFloat(item.cost.replace('$', ''));
    return (itemCost * item.quantity).toFixed(2);
  };

  /**
   * Component Render
   * 
   * Returns JSX that creates the cart interface
   * Uses conditional rendering and array mapping
   */
  return (
    <div className="cart-container">
      {/* 
        Cart Header with Total Amount
        Shows the sum of all items in the cart
      */}
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      
      {/* 
        Cart Items Section
        Conditionally renders either empty cart message or list of items
      */}
      <div>
        {cart.length === 0 ? (
          /* Empty Cart Message */
          <div className="empty-cart" style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: '#666' 
          }}>
            <h3>Your cart is empty</h3>
            <p>Add some beautiful plants to get started!</p>
          </div>
        ) : (
          /* Cart Items List */
          cart.map(item => (
            /*
              Individual Cart Item
              Key prop: React needs unique keys for list items
              Using item.name as key (assumes unique plant names)
            */
            <div className="cart-item" key={item.name}>
              {/* Plant Image */}
              <img 
                className="cart-item-image" 
                src={item.image} 
                alt={item.name}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
              
              {/* Item Details Section */}
              <div className="cart-item-details">
                {/* Plant Name */}
                <div className="cart-item-name" style={{ 
                  fontWeight: 'bold', 
                  fontSize: '18px',
                  marginBottom: '5px'
                }}>
                  {item.name}
                </div>
                
                {/* Unit Price */}
                <div className="cart-item-cost" style={{ 
                  color: '#4CAF50', 
                  fontWeight: 'bold',
                  marginBottom: '10px'
                }}>
                  Unit Price: {item.cost}
                </div>
                
                {/* Quantity Controls */}
                <div className="cart-item-quantity" style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  marginBottom: '10px'
                }}>
                  {/* Decrease Quantity Button */}
                  <button 
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                    style={{
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >
                    -
                  </button>
                  
                  {/* Current Quantity Display */}
                  <span 
                    className="cart-item-quantity-value"
                    style={{ 
                      margin: '0 15px',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}
                  >
                    {item.quantity}
                  </span>
                  
                  {/* Increase Quantity Button */}
                  <button 
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                    style={{
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >
                    +
                  </button>
                </div>
                
                {/* Item Total Cost */}
                <div className="cart-item-total" style={{ 
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#2E7D32',
                  marginBottom: '10px'
                }}>
                  Item Total: ${calculateTotalCost(item)}
                </div>
                
                {/* Delete Item Button */}
                <button 
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                  style={{
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* 
        Cart Actions Section
        Contains navigation and checkout buttons
      */}
      <div className="continue_shopping_btn" style={{ 
        marginTop: '30px',
        textAlign: 'center'
      }}>
        {/* Continue Shopping Button */}
        <button 
          className="get-started-button"
          onClick={handleContinueShopping}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            marginRight: '15px',
            marginBottom: '10px'
          }}
        >
          Continue Shopping
        </button>
        
        {/* Checkout Button */}
        <button 
          className="get-started-button1"
          onClick={() => {
            // Placeholder for checkout functionality
            alert(`Proceeding to checkout with total: $${calculateTotalAmount()}`);
          }}
          style={{
            backgroundColor: '#FF9800',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            marginLeft: '15px'
          }}
          disabled={cart.length === 0} // Disable if cart is empty
        >
          Checkout (${calculateTotalAmount()})
        </button>
      </div>
    </div>
  );
};

/**
 * Export Component
 * 
 * Makes CartItem available for import in other components
 * Used in ProductList.jsx when showCart state is true
 */
export default CartItem;


