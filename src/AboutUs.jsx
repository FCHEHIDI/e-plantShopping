/**
 * AboutUs Component - Company Information Display
 * 
 * This component displays information about Paradise Nursery company.
 * It's used on the landing page to provide context about the business,
 * mission, and services offered to potential customers.
 * 
 * React Concepts Used:
 * - Functional Components: Simple component without state or complex logic
 * - JSX: HTML-like syntax for creating React elements
 * - CSS Classes: For styling and layout
 * - Component Composition: Used within App component
 * 
 * Design Patterns:
 * - Presentational Component: Only renders UI, no business logic
 * - Static Content: Content doesn't change based on props or state
 * - Responsive Design: Uses CSS classes for mobile-friendly layout
 */

import React from 'react';
import './AboutUs.css';

/**
 * AboutUs Functional Component
 * 
 * A presentational component that displays static information about
 * Paradise Nursery. This component doesn't need state or props as
 * it only displays fixed content.
 * 
 * Component Structure:
 * - Company welcome message
 * - Mission statement
 * - Quality commitment
 * - Call to action
 * 
 * @returns {JSX.Element} The about us section with company information
 */
function AboutUs() {
  return (
    <div className="about-us-container">
      {/* 
        Company Welcome Section
        First impression with welcoming message and brand tagline
      */}
      <p className="about-us-description">
        Welcome to Paradise Nursery, where green meets serenity!
      </p>
      
      {/* 
        Mission Statement
        Explains company purpose and product offerings
        
        Content Structure:
        - Mission statement
        - Product range overview
        - Target audience identification
      */}
      <p className="about-us-content">
        At Paradise Nursery, we are passionate about bringing nature closer to you. Our mission is to provide a wide range of 
        high-quality plants that not only enhance the beauty of your surroundings but also contribute to a healthier and 
        more sustainable lifestyle. From air-purifying plants to aromatic fragrant ones, we have something for every 
        plant enthusiast.
      </p>
      
      {/* 
        Quality and Support Section
        Emphasizes expertise and customer support
        
        Key Messages:
        - Quality standards
        - Expert team
        - Customer support
        - Inclusive for all skill levels
      */}
      <p className="about-us-content">
        Our team of experts is dedicated to ensuring that each plant meets our strict standards of quality and care. 
        Whether you're a seasoned gardener or just starting your green journey, we're here to support you every step of 
        the way. Feel free to explore our collection, ask questions, and let us help you find the perfect plant for your 
        home or office.
      </p>

      {/* 
        Call to Action Section
        Encourages engagement and reinforces company mission
        
        Purpose:
        - Motivate customers to take action
        - Reinforce environmental mission
        - Create sense of community
        - Invite customers to visit
      */}
      <p className="about-us-content">
        Join us in our mission to create a greener, healthier world. Visit Paradise Nursery today and experience the 
        beauty of nature right at your doorstep.
      </p>
    </div>
  );
}

/**
 * Export Component
 * 
 * Makes the AboutUs component available for import in other files
 * Used in App.jsx as part of the landing page layout
 * 
 * Usage Example:
 * import AboutUs from './AboutUs';
 * <AboutUs />
 */
export default AboutUs;
