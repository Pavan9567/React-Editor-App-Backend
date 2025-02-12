const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const FRONTEND_PATH = "https://react-editor-app.vercel.app/"

// API Endpoint to Install Packages
app.post('/install', (req, res) => {
    const { packageName } = req.body;

    if (!packageName) {
        return res.status(400).json({ error: 'Package name is required' });
    }

    // Run npm install
    exec(`npm install ${packageName}`,  { cwd: FRONTEND_PATH }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stderr}`);
            return res.status(500).json({ error: stderr });
        }

        console.log(`Output: ${stdout}`);
        res.status(200).json({ message: `Installed ${packageName}` });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
