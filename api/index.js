import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

// Impor data dari modul JavaScript
import jsonData from '../server/data.js';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Buat salinan data yang bisa diubah untuk sesi ini
let database = { ...jsonData };

// Helper functions (tidak lagi async karena kita tidak membaca dari file)
function readData() {
    return database;
}

async function writeData(data) {
    // Logika untuk mencegah penulisan di Vercel tetap sama
    if (process.env.VERCEL) {
        console.log("Vercel environment detected. Data will not persist.");
        // Simulasikan perubahan hanya di memori
        database = data;
        return;
    }
    // Logika untuk penulisan lokal bisa ditambahkan di sini jika perlu
    // await fs.writeFile(...)
}

// Routes

// Get all stock issues
app.get('/stockissue', async (req, res) => {
    try {
        const data = readData(); // Gunakan fungsi baru
        res.json(data.stockIssues);
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Failed to fetch stock issues' });
    }
});

// Get single stock issue
app.get('/stockissue/:id', async (req, res) => {
    try {
        const data = readData();
        const stockIssue = data.stockIssues.find(si => si.id === req.params.id);
        if (!stockIssue) {
            return res.status(404).json({ error: 'Stock issue not found' });
        }
        res.json(stockIssue);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stock issue' });
    }
});

// Create new stock issue
app.post('/stockissue', async (req, res) => {
    try {
        const data = readData();
        const newStockIssue = {
            id: uuidv4(),
            ...req.body,
            createdAt: new Date().toISOString(),
            details: []
        };
        data.stockIssues.push(newStockIssue);
        await writeData(data);
        res.status(201).json(newStockIssue);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create stock issue' });
    }
});

// Update stock issue
app.put('/stockissue/:id', async (req, res) => {
    try {
        const data = readData();
        const index = data.stockIssues.findIndex(si => si.id === req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Stock issue not found' });
        }
        data.stockIssues[index] = { ...data.stockIssues[index], ...req.body };
        await writeData(data);
        res.json(data.stockIssues[index]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update stock issue' });
    }
});

// Delete stock issue
app.delete('/stockissue/:id', async (req, res) => {
    try {
        const data = readData();
        const index = data.stockIssues.findIndex(si => si.id === req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Stock issue not found' });
        }
        data.stockIssues.splice(index, 1);
        await writeData(data);
        res.json({ message: 'Stock issue deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete stock issue' });
    }
});

// Get stock issue details
app.get('/stockissue/:id/details', async (req, res) => {
    try {
        const data = readData();
        const stockIssue = data.stockIssues.find(si => si.id === req.params.id);
        if (!stockIssue) {
            return res.status(404).json({ error: 'Stock issue not found' });
        }
        res.json(stockIssue.details || []);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch details' });
    }
});

// Add detail to stock issue
app.post('/stockissue/:id/details', async (req, res) => {
    try {
        const data = readData();
        const stockIssue = data.stockIssues.find(si => si.id === req.params.id);
        if (!stockIssue) {
            return res.status(404).json({ error: 'Stock issue not found' });
        }
        const newDetail = {
            id: uuidv4(),
            ...req.body
        };
        if (!stockIssue.details) {
            stockIssue.details = [];
        }
        stockIssue.details.push(newDetail);
        await writeData(data);
        res.status(201).json(newDetail);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add detail' });
    }
});

// Update detail in stock issue
app.put('/stockissue/:id/details/:detailId', async (req, res) => {
    try {
        const data = readData();
        const stockIssue = data.stockIssues.find(si => si.id === req.params.id);
        if (!stockIssue) {
            return res.status(404).json({ error: 'Stock issue not found' });
        }
        const detailIndex = stockIssue.details?.findIndex(d => d.id === req.params.detailId) ?? -1;
        if (detailIndex === -1) {
            return res.status(404).json({ error: 'Detail not found' });
        }
        stockIssue.details[detailIndex] = { ...stockIssue.details[detailIndex], ...req.body };
        await writeData(data);
        res.json(stockIssue.details[detailIndex]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update detail' });
    }
});

// Delete detail from stock issue
app.delete('/stockissue/:id/details/:detailId', async (req, res) => {
    try {
        const data = readData();
        const stockIssue = data.stockIssues.find(si => si.id === req.params.id);
        if (!stockIssue) {
            return res.status(404).json({ error: 'Stock issue not found' });
        }
        const detailIndex = stockIssue.details?.findIndex(d => d.id === req.params.detailId) ?? -1;
        if (detailIndex === -1) {
            return res.status(404).json({ error: 'Detail not found' });
        }
        stockIssue.details.splice(detailIndex, 1);
        await writeData(data);
        res.json({ message: 'Detail deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete detail' });
    }
});

// Initialize data and start server
initializeData().then(() => {
    // app.listen(PORT, () => {
    //   console.log(`Server running on http://localhost:${PORT}`);
    // });
});

export default app;