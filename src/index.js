import app from "./app";
import dotEnv from "./config/conf";

/**
 * Starting project and server
 */
try {
  async function main() {
    app.listen(dotEnv.port || 3000);
    console.log(
      `Server running in ${process.env.NODE_ENV} mode and starts on PORT ${dotEnv.port}`
    );
  }

  main();
} catch (error) {
  console.error(error);
}
