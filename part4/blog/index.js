const app = require("./app.js");
const logger = require("./utils/logger.js");
const config = require("./utils/config.js");

app.listen(config.PORT, () => {
  logger.info(`Server is running on port ${config.PORT}`);
});
