import app from "./app";
import { connectToDatabase } from "./db/connection";

const PORT = process.env.PORT || 5000;

// Initalizing database connection
connectToDatabase().then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT} & connected to database.`));
    })
    .catch(error => console.log(error));
