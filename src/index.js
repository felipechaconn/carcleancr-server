import app from "./app";
import dot_env from "./config/conf";

/**
 * Starting project and server
 */
try {
  async function main() {
    app.listen(dot_env.port || 3000);
    console.log(
      `Server running in ${process.env.NODE_ENV} mode and starts on PORT ${dot_env.port}`
    );
  }

  main();
} catch (error) {
  console.error(error);
}
