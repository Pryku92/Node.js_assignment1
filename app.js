const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<h1>Wellcome from assignment #1!</h1>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Submit</button></form>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<ul><li>User 1</li><li>User 2</li><li>User 3</li></ul>');
        return res.end();
    }
    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', chunk => body.push(chunk));
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody.split('=')[1]);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
});

server.listen(3000);