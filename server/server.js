import app from "./index.js";
import Connect from "./connect.js";

Connect();
app.listen(3200, () => {
    console.log(`Listening to PORT: 3200` )
});