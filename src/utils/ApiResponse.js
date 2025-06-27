class ApiResponse{
    constructor(statusCode,data, message="success") {
        this.statusCode = statusCode; // HTTP status code
        this.message = message; // Response message
        this.data = data; // Optional data payload
    this.success=statusCode<400
    }
}
export {ApiResponse}