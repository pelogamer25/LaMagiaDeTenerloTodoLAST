import './style.css';
import { initParallax } from './parallax.js';
import { initCards } from './cards.js';
import { initAnimations } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize background parallax effect
  initParallax();
  
  // Initialize 3D cards
  initCards();
  
  // Initialize scroll animations and lazy loading
  initAnimations();
});
