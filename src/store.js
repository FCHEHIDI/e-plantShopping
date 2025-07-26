/**
 * Redux Store Configuration
 * 
 * This file sets up the Redux store for our Paradise Nursery application.
 * Redux is a state management library that helps manage application state
 * in a predictable way across the entire app.
 * 
 * Redux Concepts Explained:
 * - Store: The single source of truth for your app's state
 * - Reducers: Pure functions that specify how state changes in response to actions
 * - Actions: Plain objects that describe what happened in the app
 * 
 * Redux Toolkit Benefits:
 * - Simplifies Redux setup and reduces boilerplate code
 * - Includes utilities for common Redux patterns
 * - Built-in integration with Redux DevTools
 */

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

/**
 * Configure Redux Store
 * 
 * configureStore() is from Redux Toolkit and automatically:
 * - Sets up Redux DevTools Extension
 * - Adds middleware for better development experience
 * - Enables Redux Toolkit's serializable state checks
 * 
 * The reducer object defines the shape of our state:
 * - cart: managed by cartReducer (from CartSlice.jsx)
 * 
 * Final state shape will be: { cart: { items: [] } }
 */
const store = configureStore({
    reducer: {
        /**
         * Cart Reducer
         * Manages all cart-related state including:
         * - items: array of products added to cart
         * - quantities: how many of each item
         * - total calculations: price totals
         */
        cart: cartReducer,
    },
});

/**
 * Export the store so it can be:
 * 1. Provided to the app via <Provider> in main.jsx
 * 2. Used by components via useSelector and useDispatch hooks
 * 
 * React-Redux Integration:
 * - Provider component makes store available to all components
 * - useSelector hook: read data from store
 * - useDispatch hook: dispatch actions to update store
 */
export default store;
