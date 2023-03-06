const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    let url = req.url;
    switch(url) {
        case '/':
            url = 'index.html';
            break;
        case '/about':
            url = 'about.html';
            break;
        case '/contact':
            url = 'contact.html';
            break;
    }

    let filePath = path.join(__dirname, 'public', url);
    let extName = path.extname(filePath);
    let contentType = 'text/html';

    switch(extName) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
    };

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf8');
                });
            } else {
                res.writeHead(500);
                res.end(`Error: ${err.code}`);
            };
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        };
    });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));