# Vortexa Technical Challenge
---

Challenge is outlined [here](https://github.com/JRGranell/javascript-challenge) by Vortexa.

## Dependencies

- [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.
- [React Mapbox GL](https://visgl.github.io/react-map-gl/)
- [React Chartjs 2](https://www.npmjs.com/package/react-chartjs-2)
- [Tailwindcss](https://tailwindcss.com/) - utility CSS framework

## How to run

1. Clone this repo to local machine.
2. `cd vortexa-tech-challenge`.
3. Run `npm install`.
4. Run `npm start`. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Requirements

You need an API token from Map GL in `.env.local` variable called `REACT_APP_MAPBOX_TOKEN`. This will allow you access to use Map GL services.

```
// .env.local

REACT_APP_MAPBOX_TOKEN=<Mapbox token>
```

Create or sign into https://studio.mapbox.com/.

## Tasks to complete later

* Show more information in the popup
    * Reverse geolocation to show address of a ramp - [info here](https://docs.mapbox.com/api/search/geocoding/#reverse-geocoding).
    * Retrieve photos and display
* Instead of using markers, use clusters - [example found here](http://visgl.github.io/react-map-gl/examples/clusters).
* Set up error handling
    * Display error handling messages when needed
* Set up an extensive design system
    * Set up full colour scheme
    * Update typography, type-scale
    * Create reusable basic components 
