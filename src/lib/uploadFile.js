export async function uploadFile(file) {
  if (!file) {
    throw new Error('No file provided for upload.');
  }

  // Create a FormData object and append the file
  const formData = new FormData();
  formData.append('file', file); // Append the file to FormData

  try {
      // Make a POST request to the API route with the file
      const response = await fetch('/api/uploadFile', {
              method: 'POST',
              body: formData, // The file is included in the body as form data
      });

      // Check if the request was successful
      if (!response.ok) {
              throw new Error('Failed to upload file');
      }

      // Parse the response from the server
      const data = await response.json();

      if (!data.url) {
          throw new Error("URL not found in response.")
      }

      return data.url;
  } catch (error) {
      console.error('Error:', error);
      throw error;
  }
}
