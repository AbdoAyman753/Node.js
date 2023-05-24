const http = require("http");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;
// console.log(fs.readFileSync('./style.css',{encoding:"utf-8"}));
const server = http.createServer((req, res) => {
  if (req.method == "GET") {
    switch (req.url) {
      case "/":
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(fs.readFileSync("./index.html", { encoding: "utf-8" }));
        break;
      case "/images/favicon.ico":
        res.statusCode = 200;
        res.setHeader("Content-Type", "image/vnd.microsoft.icon");
        res.end(fs.readFileSync("./images/favicon.ico"));
        break;
      case "/style.css":
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/css");
        res.end(fs.readFileSync("./style.css", { encoding: "utf-8" }));
        break;
      case "/images/R6S-background.jpg":
        res.statusCode = 200;
        res.setHeader("Content-Type", "image/jpeg");
        res.end(fs.readFileSync("./images/R6S-background.jpg"));
        break;
      case "/users":
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(fs.readFileSync("./data.json", { encoding: "utf-8" }));
        break;
      default:
    }
  }
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/html");
//   res.end("<h1>Hello World</h1></br>");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
