const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const RECIPIENT_EMAIL = process.env.CONTACT_EMAIL || 'hndevco@gmail.com';
const LEADS_FILE = path.join(__dirname, 'leads.json');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

// Guardar lead localmente como respaldo
function saveLead(lead) {
  try {
    let leads = [];
    if (fs.existsSync(LEADS_FILE)) {
      const data = fs.readFileSync(LEADS_FILE, 'utf8');
      leads = JSON.parse(data || '[]');
    }
    leads.push({
      id: Date.now(),
      fecha: new Date().toISOString(),
      ...lead
    });
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8');
  } catch (err) {
    console.error('Error guardando lead en leads.json:', err.message);
  }
}

// Envío a hndevco@gmail.com vía FormSubmit API HTTPS nativo
function sendEmailViaCloud(lead) {
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      _subject: `🚀 Nueva Solicitud Técnica DEVCO: ${lead.nombre} (${lead.telefono})`,
      _template: 'table',
      _captcha: 'false',
      Nombre_Completo: lead.nombre,
      Telefono_WhatsApp: lead.telefono,
      Detalle_Proyecto: lead.mensaje,
      Destinatario: RECIPIENT_EMAIL,
      Fecha: lead.fecha || new Date().toLocaleString()
    });

    const options = {
      hostname: 'formsubmit.co',
      port: 443,
      path: `/ajax/${RECIPIENT_EMAIL}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'https://devco.hn',
        'Referer': 'https://devco.hn/',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        resolve({ success: true, status: res.statusCode, body });
      });
    });

    req.on('error', (e) => {
      console.error('Error enviando correo a FormSubmit:', e.message);
      resolve({ success: false, error: e.message });
    });

    req.setTimeout(8000, () => {
      req.destroy();
      resolve({ success: false, error: 'Timeout' });
    });

    req.write(postData);
    req.end();
  });
}

const server = http.createServer(async (req, res) => {
  // Encabezados CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API Endpoint: /api/contact
  if (req.url === '/api/contact' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 1e6) req.destroy();
    });

    req.on('end', async () => {
      try {
        const lead = JSON.parse(body || '{}');
        if (!lead.nombre || !lead.telefono || !lead.mensaje) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Faltan campos requeridos (nombre, telefono, mensaje).' }));
          return;
        }

        // 1. Guardar en leads.json
        saveLead(lead);
        console.log(`[LEAD RECIBIDO] ${lead.nombre} | ${lead.telefono} -> Enviar a: ${RECIPIENT_EMAIL}`);

        // 2. Enviar a hndevco@gmail.com
        await sendEmailViaCloud(lead);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: `Solicitud enviada a ${RECIPIENT_EMAIL}`,
          destinatario: RECIPIENT_EMAIL
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error procesando solicitud: ' + err.message }));
      }
    });
    return;
  }

  // Servidor de archivos estáticos
  let reqPath = req.url.split('?')[0];
  let filePath = path.join(__dirname, reqPath === '/' ? 'index.html' : reqPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 Not Found - DEVCO</h1>');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Server Error: ' + err.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 DEVCO Landing & Mail Service Online`);
  console.log(`📍 Web: http://localhost:${PORT}/`);
  console.log(`✉️ Correo de Destino de Leads: ${RECIPIENT_EMAIL}`);
  console.log(`💾 Base de Datos Local de Leads: ${LEADS_FILE}`);
  console.log(`======================================================\n`);
});
