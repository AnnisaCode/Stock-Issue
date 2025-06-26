import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Data file path
const DATA_FILE = path.join(process.cwd(), 'server', 'data.json');

// ... (seluruh isi server/index.js setelah ini tetap sama, tidak perlu diubah kecuali path DATA_FILE)

// Initialize data file if it doesn't exist
async function initializeData() {
    try {
        await fs.access(DATA_FILE);
    } catch {
        const initialData = {
            stockIssues: [
                {
                    id: '1',
                    issueNumber: 'SI-2024-001',
                    date: '2024-01-15',
                    department: 'Production',
                    requestedBy: 'Sarah Johnson',
                    status: 'approved',
                    description: 'Monthly production supplies',
                    createdAt: '2024-01-15T08:00:00Z',
                    details: [
                        {
                            id: '1-1',
                            itemCode: 'ITM001',
                            itemName: 'Steel Rod 10mm',
                            requestedQty: 100,
                            approvedQty: 95,
                            unit: 'pcs',
                            remarks: 'Quality checked'
                        },
                        {
                            id: '1-2',
                            itemCode: 'ITM002',
                            itemName: 'Welding Wire',
                            requestedQty: 50,
                            approvedQty: 50,
                            unit: 'kg',
                            remarks: 'Standard quality'
                        }
                    ]
                },
                {
                    id: '2',
                    issueNumber: 'SI-2024-002',
                    date: '2024-01-16',
                    department: 'Maintenance',
                    requestedBy: 'Mike Chen',
                    status: 'pending',
                    description: 'Equipment maintenance supplies',
                    createdAt: '2024-01-16T09:30:00Z',
                    details: [
                        {
                            id: '2-1',
                            itemCode: 'MTN001',
                            itemName: 'Engine Oil SAE 40',
                            requestedQty: 20,
                            approvedQty: 0,
                            unit: 'liters',
                            remarks: 'Pending approval'
                        }
                    ]
                }
            ]
        };
        await fs.writeFile(DATA_FILE, JSON.stringify(initialData, null, 2));
    }
}

// Helper functions
async function readData() {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
}

async function writeData(data) {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// Routes

// Get all stock issues
app.get('/stockissue', async (req, res) => {
    try {
        const data = await readData();
        res.json(data.stockIssues);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stock issues' });
    }
});

// Get single stock issue
app.get('/stockissue/:id', async (req, res) => {
    try {
        const data = await readData();
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
        const data = await readData();
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
        const data = await readData();
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
        const data = await readData();
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
        const data = await readData();
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
        const data = await readData();
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
        const data = await readData();
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
        const data = await readData();
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