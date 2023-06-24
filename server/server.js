const express = require("express")
const {getColorsFromImage} = require("./controller");

const app = express();

app
    .use(require("cors")({
        origin: "*",
    }))

    .use(express.json())

    // .listen(4000, () => {
    //     console.info("Listening on port 4000...")
    // })
