/**
 * Helper function to send a universal response.
 * @param {object} res - The response object
 * @param {number} statusCode - The HTTP status code (200, 404, etc.)
 * @param {string} message - The message to be sent with the response
 * @param {object} data - The data to send with the response (if any)
 */
const sendResponse = (res, statusCode, message, data = {}) => {
    const status = statusCode >= 200 && statusCode < 300 ? "success" : "error";
    res.status(statusCode).json({
        status,
        message,
        data
    });
};

module.exports = { sendResponse };
