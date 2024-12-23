export async function Fetching(url, options = {}) {
  let status = 'loading'; 
  let response = {
    success: null,
    error: null
  }

  try {
    status = 'loading';
    
    const fetching = await fetch(url, options);
    const jsonData = await fetching.json();

    status = 'success';
    response.success = jsonData;
  } catch (err) {
    status = 'error'
    response.error = err
  }

  return { status, response }
}