
# README: CLIENT



## Features

- Creator & Brand dashboards
- Creator & Brand signup
- User data stored in MongoDB
- MapBox Implementation
- User token authentication


## Roadmap

- Finish Creator & Brand dashboard to fit data
- Enhance landing page



## Tech Stack

**Client:** Next.JS, Node, Axios, NextAuth, MUI, TailWindCSS, TypeScript

**APIs:** MapBox


## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Example Color | ![#0a192f](https://via.placeholder.com/10/0a192f?text=+) #0a192f |
| Example Color | ![#f8f8f8](https://via.placeholder.com/10/f8f8f8?text=+) #f8f8f8 |
| Example Color | ![#00b48a](https://via.placeholder.com/10/00b48a?text=+) #00b48a |
| Example Color | ![#00d1a0](https://via.placeholder.com/10/00b48a?text=+) #00d1a0 |


## Run Locally

Go to the server directory

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

MapBox:
- `NEXT_PUBLIC_MAPBOX_TOKEN`
- `NEXT_PUBLIC_SEARCH_BOX_ID_SECRET`

NextAuth:
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`

## License

[MIT](https://choosealicense.com/licenses/mit/)

