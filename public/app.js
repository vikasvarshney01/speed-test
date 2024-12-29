const socket = io(); // Connect to the backend using Socket.IO

document.getElementById('startTest').addEventListener('click', async () => {
  console.log('Test started');
  
  try {
    // Measure latency
    console.log('Measuring latency...');
    const latency = await measureLatency();
    console.log('Latency:', latency);
    document.getElementById('latency').textContent = latency;

    // Measure download speed
    console.log('Measuring download speed...');
    const downloadSpeed = await measureDownloadSpeed();
    console.log('Download Speed:', downloadSpeed);
    document.getElementById('downloadSpeed').textContent = downloadSpeed;

    // Measure upload speed
    console.log('Measuring upload speed...');
    const uploadSpeed = await measureUploadSpeed();
    console.log('Upload Speed:', uploadSpeed);
    document.getElementById('uploadSpeed').textContent = uploadSpeed;
  } catch (error) {
    console.error('Error during test:', error);
  }
});

// Function to measure latency
async function measureLatency() {
  const start = performance.now();
  const response = await fetch('/ping');
  const end = performance.now();
  if (!response.ok) throw new Error('Ping request failed');
  return (end - start).toFixed(2) + ' ms';
}

// Function to measure download speed with large files and multiple iterations
async function measureDownloadSpeed() {
    const iterations = 3;
    let totalSpeed = 0;
    
    // Run multiple download tests to average results
    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      const response = await fetch('/testfile');
      const end = performance.now();
      if (!response.ok) throw new Error('Download test failed');
      
      const blob = await response.blob();
      const fileSize = blob.size; // File size in bytes
      const timeTaken = (end - start) / 1000; // Time in seconds
      const speedMbps = ((fileSize * 8) / (timeTaken * 10 ** 6)).toFixed(2); // Mbps calculation
      totalSpeed += parseFloat(speedMbps);
      
      console.log(`Download Test ${i + 1}: Time: ${timeTaken}s, Speed: ${speedMbps} Mbps`);
    }
  
    const averageSpeed = (totalSpeed / iterations).toFixed(2);
    return `${averageSpeed} Mbps`;
  }
  
  async function measureDownloadSpeed() {
    const start = performance.now();
    const response = await fetch('/api/download');
    const end = performance.now();
    const fileSize = 100 * 1024 * 1024; // 100 MB file
    const timeTaken = (end - start) / 1000; // in seconds
    const speedMbps = (fileSize * 8) / (timeTaken * 1024 * 1024); // Mbps calculation
    return `${speedMbps.toFixed(2)} Mbps`;
  }
  
  async function measureUploadSpeed() {
    const file = new Blob(['0'.repeat(100 * 1024 * 1024)], { type: 'application/octet-stream' }); // 100 MB file
    const start = performance.now();
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: file,
    });
    const end = performance.now();
    const timeTaken = (end - start) / 1000; // in seconds
    const speedMbps = (file.size * 8) / (timeTaken * 1024 * 1024); // Mbps calculation
    return `${speedMbps.toFixed(2)} Mbps`;
  }
  