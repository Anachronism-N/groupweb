# Profile Component with Hover Effect

This folder contains the extracted profile component from the Angular personal portfolio project, which implements the hover functionality for the homepage avatar.

## Component Structure

- `profile.component.ts`: Angular component TypeScript file with image URL sanitization and initialization
- `profile.component.html`: HTML template with the profile card structure and image elements
- `profile.component.css`: CSS file implementing the hover-based image switching animation
- `assets/img/`: Directory containing required image assets:
  - `Me.png`: Default profile image
  - `mecloud.png`: Hover profile image
  - `line-1.svg`: Decorative line element

## Features

1. **Hover-based Image Switching**: Changes from default image to hover image when mouse hovers over the profile card
2. **Smooth Transition**: Uses CSS opacity transitions for a smooth image swap effect
3. **Angular Security**: Implements URL sanitization using Angular's DomSanitizer
4. **Responsive Design**: Adapts to different screen sizes
5. **Greeting Popup**: Displays a dynamic greeting message based on time of day

## How the Hover Effect Works

The image switching is implemented purely with CSS:
- Both images are positioned absolutely in the same container
- The `.hover-trigger:hover` selector changes opacity of images
- Default image fades out, hover image fades in when hovering

## Usage

To use this component in an Angular project:
1. Copy the component files to your project
2. Add the necessary imports in your module or standalone component
3. Use the `<app-profile></app-profile>` selector in your template
4. Ensure the assets directory structure is maintained or update the image paths in the component

## Dependencies

- Angular framework
- `@angular/platform-browser` for DomSanitizer
- `canvas-confetti` npm package for celebration effect (optional)
- CommonModule from `@angular/common`