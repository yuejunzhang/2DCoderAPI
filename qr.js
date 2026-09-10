const QRCode = require('qrcode');

const normalizeHexColor = (value, fallback) => {
  const raw = typeof value === 'string' ? value.trim() : '';
  if (!raw) return fallback;

  const normalized = raw.startsWith('#') ? raw.slice(1) : raw;
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(normalized)) {
    return fallback;
  }

  if (normalized.length === 3) {
    return `#${normalized.split('').map((char) => char + char).join('')}`;
  }

  return `#${normalized}`;
};

const getDefaultQrText = (req) => {
  const protocol = req.headers && req.headers['x-forwarded-proto'] ? req.headers['x-forwarded-proto'] : 'http';
  const host = (req.headers && req.headers.host) || 'localhost:3000';
  const pathname = req.url ;
  const baseUrl = `${protocol}://${host}`;

  if (!pathname || pathname === '/') {
    return `${baseUrl}`;
  }

  return `${baseUrl}${pathname}`;
};

module.exports = async (req, res) => {
  const query = req.query || {};
  const text = query.text || getDefaultQrText(req);

  try {
    const dark = normalizeHexColor(query.dark, '#000000');
    const light = normalizeHexColor(query.light, '#ffffff');

    const qrBuffer = await QRCode.toBuffer(text, {
      type: 'png',
      width: 300,
      margin: 2,
      color: {
        dark,
        light
      }
    });

    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable'
    });
    res.end(qrBuffer);
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Error generating QR code');
  }
};
