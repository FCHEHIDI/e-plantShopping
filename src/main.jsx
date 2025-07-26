/**
 * Application Entry Point - main.jsx
 * 
 * This is the main entry point for our React application.
 * It sets up the React app with Redux state management and renders
 * the root App component into the DOM.
 * 
 * Key React Concepts:
 * - ReactDOM.createRoot(): Modern React 18 way to render apps
 * - React.StrictMode: Development tool that helps find problems
 * - Provider: Makes Redux store available to all components
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store.js'

/**
 * Application Initialization
 * 
 * React 18 Pattern: createRoot() + render()
 * - createRoot(): Creates a root to display React components
 * - render(): Renders the component tree into the root
 * 
 * Component Hierarchy:
 * React.StrictMode
 *   └── Provider (Redux)
 *       └── App
 *           ├── AboutUs
 *           └── ProductList
 *               └── CartItem
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  /**
   * React.StrictMode
   * 
   * Development-only wrapper component that:
   * - Identifies components with unsafe lifecycles
   * - Warns about deprecated APIs
   * - Helps detect side effects by double-invoking functions
   * - Does nothing in production builds
   */
  <React.StrictMode>
    {/**
     * Redux Provider Component
     * 
     * Makes the Redux store available to all child components
     * Any component can now:
     * - Read state with useSelector()
     * - Dispatch actions with useDispatch()
     * 
     * Props:
     * - store: The Redux store we configured in store.js
     */}
    <Provider store={store}>
      {/**
       * Root App Component
       * 
       * Our main application component that manages:
       * - Navigation between landing page and product list
       * - Overall application layout and structure
       */}
      <App />
    </Provider>
  </React.StrictMode>,
)
