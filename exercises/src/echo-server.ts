import * as http from 'http';

const HOST_NAME = '0.0.0.0';
const PORT = 3000;

const reverseString = (s: string): string => s.split('').reverse().join('');

const reverseArray = <T extends {}>(arr: T[]): T[] =>
  arr.map(elem => (typeof elem === 'object' ? reverseObj(elem) : elem));

type ObjectT<T> = T | T[] | null | undefined;

const reverseIfObject = <T extends {}>(obj: ObjectT<T>): ObjectT<T> =>
  Array.isArray(obj)
    ? reverseArray(obj)
    : typeof obj === 'object' && obj !== null
    ? reverseObj(obj)
    : obj;

const reverseObj = <T extends {}>(obj: T): T =>
  Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [reverseString(k), reverseIfObject(v)]),
  ) as T;

const server = http.createServer((req, res) => {
  console.log(`\n${req.method} ${req.url}`);
  console.log(req.headers);

  req.on('data', chunk => {
    console.log(`BODY: ${chunk}`);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    const revObj = reverseObj(JSON.parse(chunk));
    const response = JSON.stringify(revObj, null, 2);
    console.log(`RESPONSE: ${response}`);
    res.end(response);
  });
});

server.listen(PORT, HOST_NAME, () => console.log(`Server running at http://localhost:${PORT}/`));
