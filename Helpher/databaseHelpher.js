// dbHelper.js
const { pool } = require("../Config/db");

// SELECT
async function selectFromTable(table, conditions = {}) {
    let query = `SELECT * FROM ${table}`;
    const values = [];
    const conditionStrings = [];

    for (const [key, value] of Object.entries(conditions)) {
        conditionStrings.push(`${key} = $${values.length + 1}`);
        values.push(value);
    }

    if (conditionStrings.length > 0) {
        query += " WHERE " + conditionStrings.join(" AND ");
    }

    try {
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        throw new Error(`SELECT failed: ${error.message}`);
    }
}

// UPDATE
async function updateTable(table, data = {}, conditions = {}) {
    const updates = [];
    const values = [];
    let i = 1;

    for (const [key, value] of Object.entries(data)) {
        updates.push(`${key} = $${i++}`);
        values.push(value);
        console.log(values);

    }

    const conditionStrings = [];
    for (const [key, value] of Object.entries(conditions)) {
        conditionStrings.push(`${key} = $${i++}`);
        values.push(value);
    }

    let query = `UPDATE ${table} SET ${updates.join(", ")}`;
    if (conditionStrings.length > 0) {
        query += " WHERE " + conditionStrings.join(" AND ");
    }

    try {
        const result = await pool.query(query, values);
        return result.rowCount; // number of rows updated
    } catch (error) {
        throw new Error(`UPDATE failed: ${error.message}`);
    }
}

// DELETE
async function deleteFromTable(table, conditions = {}) {
    let query = `DELETE FROM ${table}`;
    const values = [];
    const conditionStrings = [];

    for (const [key, value] of Object.entries(conditions)) {
        conditionStrings.push(`${key} = $${values.length + 1}`);
        values.push(value);
    }

    if (conditionStrings.length > 0) {
        query += " WHERE " + conditionStrings.join(" AND ");
    }

    try {
        const result = await pool.query(query, values);
        return result.rowCount; // number of rows deleted
    } catch (error) {
        throw new Error(`DELETE failed: ${error.message}`);
    }
}
// INSERT
async function insertIntoTable(table, data = {}) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");

    const query = `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${placeholders}) RETURNING *`;

    try {
        const result = await pool.query(query, values);
        return result.rows[0]; // return inserted row
    } catch (error) {
        throw new Error(`INSERT failed: ${error.message}`);
    }
}


module.exports = {
    selectFromTable,
    updateTable,
    deleteFromTable,
    insertIntoTable,
};
