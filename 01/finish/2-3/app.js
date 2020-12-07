const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  const markup = `
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="utf-8">
        <title>Hello</title>
      </head>
      <body>
        <h1>Hello Node.js!</h1>
        <p>This is Node.js sample page.</p>
        <p>これは、Node.jsのサンプルページです。</p>
      </body>
    </html>
  `;
  res.write(markup);
  res.end();
});

server.listen(3000);
console.log('Server start!')
