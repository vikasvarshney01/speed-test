// api/upload.js
export default async (req, res) => {
    const body = req.body; // You can access the uploaded file here
    // Simulate upload success and respond
    res.status(200).json({ message: 'Upload successful' });
  };
  