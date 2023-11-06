const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

const creds = require('./creds.json'); // Update with your PostgreSQL credentials
const pool = new Pool(creds);

app.get('/', async (req, res) => {
    const customerId = req.query.customerId;
    let callsHtml = "";
    let totalCost = 0;
    let customerName = "";

    if (customerId) {
        try {
            const result = await pool.query(`
                SELECT c.*, p.call_cost, p.call_date 
                FROM calls p 
                JOIN customer c ON p.customer_id = c.customer_id 
                WHERE c.customer_id = $1
            `, [customerId]);

            if (result.rows.length > 0) {
                customerName = result.rows[0].name;
                callsHtml = result.rows.map(row => {
                    const cost = parseFloat(row.call_cost); // Parse call_cost as a float
                    totalCost += cost; // Calculate the total cost
                    return `<p>Call Date: ${row.call_date}, Call Cost: $${cost.toFixed(2)}</p>`;
                }).join('');
            }
        } catch (err) {
            return res.status(500).send("Error: " + err.message);
        }
    }

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Calls</title>
        </head>
        <body>
            <form action="/" method="GET">
                <label for="customerId">Enter Customer ID:</label>
                <input type="number" name="customerId" id="customerId" required>
                <button type="submit">Get Calls</button>
            </form>
            ${customerName ? `<h2>${customerName}'s Calls:</h2>` : '<h2>Enter a Customer ID to view calls.</h2>'}
            <div>
                <h3>Calls:</h3>
                ${callsHtml}
                ${callsHtml ? `<p>Total Call Cost: $${totalCost.toFixed(2)}</p>` : ''}
            </div>
            <a href="/payments">Click here to go to payments</a>
        </body>
        </html>
    `);
});

// ... Previous code ...

app.get('/payments', async (req, res) => {
    const customerId = req.query.customerId;
    let paymentsHtml = "";
    let totalPayments = 0;
    let customerName = "";

    if (customerId) {
        try {
            const result = await pool.query(`
                SELECT c.*, p.payment_amount, p.payment_date 
                FROM payments p 
                JOIN customer c ON p.customer_id = c.customer_id 
                WHERE c.customer_id = $1
            `, [customerId]);

            if (result.rows.length > 0) {
                customerName = result.rows[0].name;
                paymentsHtml = result.rows.map(row => {
                    const payment = parseFloat(row.payment_amount); // Parse payment_amount as a float
                    totalPayments += payment; // Calculate the total payments
                    return `<p>Payment Date: ${row.payment_date}, Payment Amount: $${payment.toFixed(2)}</p>`;
                }).join('');
            }
        } catch (err) {
            return res.status(500).send("Error: " + err.message);
        }
    }

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Payments</title>
        </head>
        <body>
            <form action="/payments" method="GET">
                <label for="customerId">Enter Customer ID:</label>
                <input type="number" name="customerId" id="customerId" required>
                <button type="submit">Get Payments</button>
            </form>
            ${customerName ? `<h2>${customerName}'s Payments:</h2>` : '<h2>Enter a Customer ID to view payments.</h2>'}
            <div>
                <h3>Payments:</h3>
                ${paymentsHtml}
                ${paymentsHtml ? `<p>Total Payments: $${totalPayments.toFixed(2)}</p>` : ''}
            </div>
            <a href="/">Click here to go back to calls</a>
        </body>
        </html>
    `);
});

// ... Rest of your code ...



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
