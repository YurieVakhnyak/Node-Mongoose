const http = require("http");
// const fs = require("fs");
const fs = require("fs").promises;

// const manifest = fs.readFileSync("package.json", "utf-8");

const PORT = 8081;

// const requestHandler = (request, response) => {
const requestHandler = async (request, response) => {
  //   response.writeHead(200, { "Content-type": "text/html" });
  //   response.end("<h1>GOIT</h1>");

  //   if (request.url.indexOf("/home") >= 0) {
  //     response.writeHead(200, { "Content-type": "text/json" });
  //     return response.end('{ "url": "homepage" }');
  //   }
  //   response.writeHead(200, { "Content-type": "text/json" });
  //   return response.end('{ "url": "other" }');
  const manifest = await fs.readFile("package.json", "utf-8");
  response.writeHead(200, { "Content-type": "text/json" });
  return response.end(manifest);
};

const server = http.createServer(requestHandler);

server.listen(8081, (err) => {
  if (err) {
    console.error("Error at a server launch:", err);
  }
  console.log(`Server works at port: ${PORT}`);
});
