const http = require('http');
const url = require('url');
const qrHandler = require('./api/qr.js');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname || '/';
  req.query = parsedUrl.query || {};

  if (pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('ok');
    return;
  }

  if (pathname === '/qr' || pathname === '/') {
    qrHandler(req, res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not Found');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ 本地测试服务器已启动: http://localhost:${PORT}`);
  console.log(`👉 测试链接: http://localhost:${PORT}/qr?text=Hello`);
});
