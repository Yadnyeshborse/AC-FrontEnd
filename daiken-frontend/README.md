# Building Controls Frontend

A React.js frontend application for the Building Controls System that allows users to manage and monitor building temperature control systems.

## Features

- **Building Overview**: Display building statistics and current status
- **Room Management**: View, add, edit, and delete rooms (Apartments and Common Rooms)
- **Temperature Control**: Set and adjust building target temperature
- **Real-time Updates**: Automatic refresh of heating/cooling status every 5 seconds
- **Responsive Design**: Modern UI that works on desktop and mobile devices

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Java Backend API running on `http://localhost:8080`

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd daiken-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Start the development server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`

3. Make sure your Java backend is running on `http://localhost:8080`

## Project Structure

```
src/
├── components/
│   ├── Building.js          # Main building component
│   ├── Building.css         # Building component styles
│   ├── RoomCard.js          # Individual room card component
│   ├── RoomCard.css         # Room card styles
│   ├── AddRoomModal.js      # Modal for adding new rooms
│   └── AddRoomModal.css     # Modal styles
├── services/
│   └── api.js               # API service layer for backend communication
├── App.js                   # Main application component
├── App.css                  # Application styles
├── index.js                 # Application entry point
└── index.css                # Global styles
```

## API Integration

The frontend communicates with the Java backend through REST API endpoints:

- `GET /api/building` - Get building details
- `PUT /api/building/temperature/{temperature}` - Update building target temperature
- `GET /api/building/rooms` - Get all rooms
- `POST /api/building/apartments` - Add new apartment
- `POST /api/building/common-rooms` - Add new common room
- `PUT /api/building/rooms/{id}` - Update room details
- `DELETE /api/building/rooms/{id}` - Delete room

## Components Overview

### Building Component
- Main container component that manages the overall application state
- Displays building statistics and controls
- Handles real-time updates via polling
- Manages room operations (add, edit, delete)

### RoomCard Component
- Displays individual room information
- Shows current temperature and heating/cooling status
- Provides inline editing capabilities
- Supports both Apartment and Common Room types

### AddRoomModal Component
- Modal dialog for adding new rooms
- Form validation and preview functionality
- Supports adding both apartments (with owner name) and common rooms (with type)

## Styling

The application uses modern CSS with:
- CSS Grid and Flexbox for responsive layouts
- CSS custom properties for consistent theming
- Smooth animations and transitions
- Mobile-first responsive design

## Real-time Features

- Automatic data refresh every 5 seconds
- Visual indicators for heating/cooling status
- Live temperature updates
- Immediate UI feedback for user actions

## Error Handling

- Network error handling with user-friendly messages
- Form validation for user inputs
- Graceful degradation when backend is unavailable
- Retry mechanisms for failed operations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

### Code Style

The project follows standard React and JavaScript conventions:
- Functional components with hooks
- Consistent naming conventions
- Modular CSS organization
- Proper error boundaries and loading states

## Assumptions Made

1. **Backend API Structure**: Assumed the backend follows RESTful conventions with the endpoints listed above
2. **Room Types**: Assumed Common Rooms are limited to 'GYM', 'LIBRARY', and 'LAUNDRY' as specified
3. **Temperature Range**: Assumed valid temperature range is 10-40°C for safety
4. **Real-time Updates**: Implemented polling instead of WebSockets for simplicity
5. **Authentication**: No authentication implemented as not specified in requirements
6. **Data Persistence**: Assumed backend handles all data persistence

## Future Enhancements

- WebSocket integration for real-time updates
- User authentication and authorization
- Advanced temperature scheduling
- Historical temperature data visualization
- Mobile app version
- Offline mode support