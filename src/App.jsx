
/**
 * Paradise Nursery Fresh - Main Application Component
 * 
 * This is the root component of our React application that manages the main
 * navigation between the landing page and the product list page.
 * 
 * React Concepts Used:
 * - Functional Components: Modern way to write React components using functions
 * - useState Hook: For managing component state (showProductList)
 * - Event Handlers: Functions that respond to user interactions
 * - Conditional Rendering: Showing/hiding components based on state
 * - Props: Passing data and functions to child components
 * - CSS Classes: Dynamic styling based on state
 */

import React, { useState } from 'react';
import ProductList from './ProductList';
import './App.css';
import AboutUs from './AboutUs';

/**
 * Main App Component
 * 
 * Manages the application's main navigation flow between:
 * 1. Landing page with welcome message and about us section
 * 2. Product list page with plant shopping functionality
 * 
 * @returns {JSX.Element} The main application component
 */
function App() {
  
  /**
   * State Management with useState Hook
   * 
   * useState is a React hook that lets you add state to functional components
   * Returns an array with two elements:
   * 1. Current state value (showProductList)
   * 2. Function to update the state (setShowProductList)
   * 
   * Initial state: false (landing page is shown by default)
   */
  const [showProductList, setShowProductList] = useState(false);

  /**
   * Event Handler: Navigate to Product List
   * 
   * This function is called when the "Get Started" button is clicked
   * Updates state to show the product list and hide the landing page
   * 
   * React Concept: Event handlers are functions that respond to user interactions
   */
  const handleGetStartedClick = () => {
    setShowProductList(true); // Update state to show product list
  };

  /**
   * Event Handler: Navigate to Home/Landing Page
   * 
   * This function is passed as a prop to ProductList component
   * When called, it returns user to the landing page
   * 
   * React Concept: Lifting state up - child components can modify parent state
   * through callback functions passed as props
   */
  const handleHomeClick = () => {
    setShowProductList(false); // Update state to show landing page
  };

  /**
   * Component Render Method
   * 
   * JSX (JavaScript XML) allows us to write HTML-like syntax in JavaScript
   * Template literals with ${} allow dynamic class names based on state
   */
  return (
    <div className="app-container">
      {/* 
        Landing Page Section
        - Uses conditional CSS classes for animations
        - Template literal: ${showProductList ? 'fade-out' : ''}
        - This adds 'fade-out' class when showProductList is true
      */}
      <div className={`landing-page ${showProductList ? 'fade-out' : ''}`}>
        <div className="background-image"></div>
        <div className="content">
          {/* Main landing content with welcome message */}
          <div className="landing_content">
            <h1>Welcome To Paradise Nursery</h1>
            <div className="divider"></div>
            <p>Where Green Meets Serenity</p>
            
            {/* 
              Get Started Button
              - onClick prop receives our event handler function
              - When clicked, calls handleGetStartedClick to show product list
            */}
            <button className="get-started-button" onClick={handleGetStartedClick}>
              Get Started
            </button>
          </div>
          
          {/* About Us Component Container */}
          <div className="aboutus_container">
            {/* 
              AboutUs Component
              React Concept: Component composition - using other components
              within our component to build complex UIs
            */}
            <AboutUs/>
          </div>
        </div>
      </div>
      
      {/* 
        Product List Section
        - Conditionally visible based on showProductList state
        - Template literal adds 'visible' class when showProductList is true
      */}
      <div className={`product-list-container ${showProductList ? 'visible' : ''}`}>
        {/* 
          ProductList Component
          React Concept: Props - passing data/functions to child components
          - onHomeClick prop passes our handleHomeClick function to ProductList
          - This allows ProductList to trigger navigation back to home
        */}
        <ProductList onHomeClick={handleHomeClick}/>
      </div>
    </div>
  );
}

// Export the component so it can be imported and used in other files
export default App;



