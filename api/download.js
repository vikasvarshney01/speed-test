// api/download.js
export default async (req, res) => {
    const fileSize = 100 * 1024 * 1024; // 100 MB file
    const buffer = Buffer.alloc(fileSize, '0'); // Create a 100 MB buffer
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(buffer);
  };
  