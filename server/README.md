
# README: SERVER



## Features

- Aggregate data from connected Instagram accounts
- Store user data in MongoDB and sync it with PineconeDB
- Chunk, embed, & vectorize user data into PineconeDB
- Perform similarity searches on user query


## Roadmap

- Data modeling to fit use case within vector db
- Customize Facebook SDK
- Implement additional social media APIs


## Tech Stack

**Server:** Node, Mongoose, Express, BCrypt, Axios, Cors, TypeScript, Nodemon, Eslint

**APIs:** Instagram Graph API

**AI:** Langchain, OpenAI Embedding Model

**Databases:** MongoDB, PineconeDB


## Run Locally

Go to the server directory

```bash
  cd server
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

MongoDB:
- `MONGODB_URL`

PineconeDB:
- `PINECONE_API_KEY`

OpenAI:
- `OPENAI_API_KEY`

Facebook SDK:
- `NEXT_PUBLIC_FACEBOOK_APP_ID`

Instagram Graph API:
- `NEXT_PUBLIC_APP_ID`
- `NEXT_PUBLIC_APP_SECRET`
- `NEXT_PUBLIC_HEADER`

S3Bucket:
- `AWS_BUCKET_NAME_ID`
- `AWS_BUCKET_REGION_ID`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECERT_ACCESS_KEY_TOKEN``


## API Reference

#### AuthRoute

```http
  /api/auth
```

| Operation | Parameter | Type     | Description                |
| :-------- | :-------- | :------- | :------------------------- |
| POST      | `/`       | N/A      | Authenticate user login    |

#### UserRoute

```http
  /api/users
```

| Operation | Parameter            | Type        | Description                |
| :-------- | :--------            | :-------    | :------------------------- |
| GET       | `/`                  | N/A         | Get all users              |
| GET       | `/username/:username`| String      | Check if username exists   |
| GET       | `/:id`               | String      | Check if user id exists    |
| POST      | `/`                  | N/A         | Register new user          |
| PUT       | `/`                  | N/A         | Update existing user       |
| DELETE    | `/`                  | N/A         | Delete user                |

#### CreatorRoute

```http
  /api/creators
```

| Operation | Parameter       |       Type     | Description                           |
| :-------- | :--------             | :------- | :-------------------------            |
| GET       | `/me`                 | N/A      | Get current users creator profile     |
| POST      | `/`                   | N/A      | Creator Sign Up                       |
| POST      | `/`                   | N/A      | Update creator profile                |
| GET       | `/`                   | N/A      | Get all creator profiles              |
| GET       | `/user/:user_id`      | String   | Get creator profile by user id        |
| GET       | `/username/:username` | N/A      | Get creator by username               |
| PUT       | `/:user_id/interests` | String   | Update creator interests              |
| PUT       | `/:user_id/bio`       | String   | Update creator bio                    |
| POST      | `/:user_id/packages`  | Array    | Create a package to creator           |
| PUT       | `/:user_id/packages`  | Array    | Update a package to creator           |
| DELETE    | `/:user_id/packages/:package_id`| Array | Delete a package from creator  |
| DELETE    | `/`                   | N/A      | Delete creator profile, user, & posts |

#### BrandRoute

```http
  /api/brands
```

| Operation | Parameter       | Type     | Description                           |
| :-------- | :--------       | :------- | :-------------------------            |
| GET       | `/me`           | N/A      | Get current users brand profile       |
| POST      | `/`             | N/A      | Check brand profile                   |
| PUT       | `/`             | N/A      | Update brand profile                  |
| GET       | `/`             | N/A      | Get all brand profiles                |
| GET       | `/user/:user_id`| String   | Get brand profile by user id          |
| DELETE    | `/`             | N/A      | Delete brand profile, user, & posts   |

#### QueriesRoute

```http
  /api/query
```

| Operation | Parameter       | Type     | Description                           |
| :-------- | :--------       | :------- | :-------------------------            |
| GET       | `/`             | String   | Get query response from req body      |

#### InstagramRoute

```http
  /api/instagram
```

| Operation | Parameter       | Type     | Description                           |
| :-------- | :--------       | :------- | :-------------------------            |
| POST      | `/`             | N/A      | N/A      |
| POST      | `/check`        | String   | Check if instagram user exists from access token in req body      |
| POST      | `/insights`     | String   | Get insights from user business id      |

#### S3Route

```http
  /api/s3
```

| Operation | Parameter             | Type     | Description                  |
| :-------- | :--------             | :------- | :-------------------------   |
| PUT       | `/:user_id/avatar`    | String   | Update User Avatar           |
| POST      | `/:user_id/portfolio` | String   | Uploading portfolio content  |
| DELETE    | `/:user_id/portfolio/:content_id` | String   | Deleting portfolio content  |
| PUT       | `/:user_id/portfolio/:content_id` | String   | Update portfolio content    |

## License

[MIT](https://choosealicense.com/licenses/mit/)

