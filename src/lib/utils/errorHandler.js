export default function errorHandler(response) {
    if (!response.ok) throw new Error(response.status);
    return response;
}
