

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Your API routes will go here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Sample JSON data to represent the table
let tableData = [
    { id: 1, name: 'Row 1', value: 'Value 1' },
    { id: 2, name: 'Row 2', value: 'Value 2' },
    { id: 3, name: 'Row 3', value: 'Value 3' },
    { id: 4, name: 'Row 4', value: 'Value 4' },
  ];
  
  // GET: Retrieve the table data
  app.get('/api/table', (req, res) => {
    res.json(tableData);
  });
  
  // POST: Add a new row to the table
  app.post('/api/table', (req, res) => {
    const newRow = req.body;
    newRow.id = tableData.length + 1;
    tableData.push(newRow);
    res.json(newRow);
  });
  
  // PUT: Update a row in the table
  app.put('/api/table/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedRow = req.body;
  
    for (let i = 0; i < tableData.length; i++) {
      if (tableData[i].id === id) {
        tableData[i] = updatedRow;
        return res.json(updatedRow);
      }
    }
  
    res.status(404).json({ error: 'Row not found' });
  });
  
  // DELETE: Delete a row from the table
  app.delete('/api/table/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tableData.findIndex((row) => row.id === id);
  
    if (index !== -1) {
      tableData.splice(index, 1);
      res.json({ message: 'Row deleted' });
    } else {
      res.status(404).json({ error: 'Row not found' });
    }
  });
  


  //Frontend
  // script.js
const table = document.getElementById('table');
const tbody = table.querySelector('tbody');
const nameInput = document.getElementById('name');
const valueInput = document.getElementById('value');

function renderTable() {
  // Fetch the table data from the server and render it
  fetch('/api/table')
    .then((response) => response.json())
    .then((data) => {
      tbody.innerHTML = '';
      data.forEach((row) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.id}</td>
          <td>${row.name}</td>
          <td>${row.value}</td>
          <td>${row.location}</td>
          <td>${row.CGPA}</td>
          <td>
            <button onclick="editRow(${row.id})">Edit</button>
            <button onclick="deleteRow(${row.id})">Delete</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    });
}

function addRow() {
  // Add a new row to the table
  const newRow = { name: nameInput.value, value: valueInput.value, location: locationInput.value, CGPA: CGPAInput.value };
  fetch('/api/table', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newRow),
  })
    .then((response) => response.json())
    .then(() => {
      renderTable();
      nameInput.value = '';
      valueInput.value = '';
    });
}

function editRow(id) {
  // Handle row editing (optional)
  // You can implement a form to edit the row here
}

function deleteRow(id) {
  // Delete a row from the table
  fetch(`/api/table/${id}`, {
    method: 'DELETE',
  })
    .then(() => {
      renderTable();
    });
}

// Initial rendering of the table
renderTable();
