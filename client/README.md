
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


## Design References

| Design System | https://www.figma.com/proto/rqktpBJN7YFzyJMg7YP2ob/H2JC-Project?page-id=372%3A2&node-id=372-3&viewport=657%2C472%2C0.85&t=Trt06epenYD7YZzX-1&scaling=min-zoom|
| --------------| -----------------------------------------------------------------|                                                         


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

