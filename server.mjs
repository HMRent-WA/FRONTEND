import dotenv from 'dotenv';
import express from 'express';
import next from 'next';
import { createProxyMiddleware } from 'http-proxy-middleware';

const port = parseInt(process.env.PORT, 10) || 3000;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ hostname: 'localhost', dev, port });
const handle = app.getRequestHandler();

dotenv.config();

app.prepare().then(() => {
  const server = express();

  server.use(
    '/api',
    createProxyMiddleware({
      target: process.env.NEXT_PUBLIC_API_URL,
      changeOrigin: true,
      logLevel: 'error',
      //   pathRewrite: {
      //     '^/api/': '/',
      //   },
      cookieDomainRewrite: {
        '*': 'localhost',
      },
    })
  );

  server.all('*', (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
  });
});
