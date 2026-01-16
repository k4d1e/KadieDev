// Spline Scene Controller
// Handles bone animation using the Spline Runtime API

import { Application } from 'https://unpkg.com/@splinetool/runtime@latest/build/runtime.js';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing Spline scene...');

  // Get the canvas element
  const canvas = document.getElementById('spline-canvas');
  
  if (!canvas) {
    console.error('Canvas element #spline-canvas not found!');
    return;
  }

  // Initialize Spline application
  const spline = new Application(canvas);

  // Load the Spline scene
  spline
    .load('https://prod.spline.design/FaL6Mf-9kilRQg91/scene.splinecode')
    .then(() => {
      console.log('Spline scene loaded successfully');

      // Query the bone object by name
      const bone001 = spline.findObjectByName('Bone001');
      
      if (!bone001) {
        console.error('Bone001 not found in the scene');
        console.log('Available objects:', spline.getAllObjects?.().map(obj => obj.name));
        return;
      }

      console.log('Bone001 found:', bone001);

      // Get the HTML element with class gradient-link large
      const developerLink = document.querySelector('.gradient-link.large');
      
      if (!developerLink) {
        console.error('Developer link not found');
        return;
      }

      // Track animation state to prevent overlapping transitions
      let isAnimating = false;
      let isHovering = false;

      // Mouse enter handler - trigger nod animation
      developerLink.addEventListener('mouseenter', () => {
        isHovering = true;
        
        if (isAnimating) return;
        isAnimating = true;

        // Transition to "Nod" state
        bone001.emitEvent('mouseDown', { 
          state: 'Nod',
          duration: 0.3,
          easing: 'easeInOut'
        });

        // After the nod duration, transition back to Base State
        setTimeout(() => {
          if (!isHovering) {
            bone001.emitEvent('mouseDown', {
              state: 'Base State',
              duration: 0.6,
              easing: 'easeInOut'
            });
            
            setTimeout(() => {
              isAnimating = false;
            }, 600);
          } else {
            isAnimating = false;
          }
        }, 300);
      });

      // Mouse leave handler - return to base state
      developerLink.addEventListener('mouseleave', () => {
        isHovering = false;
        
        // Transition back to Base State
        bone001.emitEvent('mouseDown', {
          state: 'Base State',
          duration: 0.6,
          easing: 'easeInOut'
        });
      });
    })
    .catch((error) => {
      console.error('Error loading Spline scene:', error);
    });
});