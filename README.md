# Weather Forecast Next.js App

## Overview

This is a Next.js weather forecast application that allows users to search for weather conditions in a specific city or country. It provides real-time weather data including temperature, humidity, wind speed, and a 5-day forecast in 3-hour intervals.

## Features

- Uses Next.js API routes to call OpenWeather API securely.
- Implements caching with `Map` to optimize API requests.
- Encrypts data before storing it in `localStorage`.
- Maintains search history in storage.

## Project Structure

```
- app/
  - Home Page: Displays current weather details and 5-day forecast.
  - Search Page: Allows users to search for a city or country and navigate back to Home to view weather data.
- assets/: Stores images and fonts.
- services/
  - api/: Implements reusable API services.
  - constants/: Defines constant variables.
  - utils/: Contains utility functions such as formatters and validation.
- hooks/: Defines reusable hooks.
- components/: Contains standard UI components.
```

## Getting Started

### Prerequisites

- Node.js installed
- Yarn package manager
- OpenWeather API key

### Setup Instructions

1. Clone the repository:

   ```sh
   git clone <repo_url>
   cd <project_folder>
   ```

2. Install dependencies:

   ```sh
   yarn install
   ```

3. Create an OpenWeather API account and get an API key.

4. Add your API key to the `.env` file:

   ```env
   OPEN_WEATHER_API_KEY=your_api_key_here
   ```

5. Start the development server:
   ```sh
   yarn dev
   ```

## Technologies Used

- Next.js (App Router)
- OpenWeather API
- LocalStorage (with encryption)
- JavaScript (ES6+)
- Tailwind

## License

This project is licensed under the MIT License.
