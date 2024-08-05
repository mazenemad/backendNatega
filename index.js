const express = require('express');
const XLSX = require('xlsx');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const FILE_PATH = path.join(__dirname, 'data.xlsx'); // Ensure the correct path

// Endpoint to search in the XLSX file
app.post('/search', (req, res) => {
    const { searchTerm } = req.body;

    if (!searchTerm) {
        return res.status(400).send({ message: 'Search term is required.' });
    }

    // Load the workbook
    try {
        const workbook = XLSX.readFile(FILE_PATH);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);
        const results = data.filter(row => Object.values(row).some(value => value.toString().toLowerCase().includes(searchTerm.toLowerCase())));
        
        res.send(results);
    } catch (error) {
        res.status(500).send({ message: 'Failed to read the file', error: error.toString() });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
