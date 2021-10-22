export const FetchAPI = async (
  endpoint,
  method = "GET",
  body = null,
  headers = {}
) => {
  const url = `${process.env.REACT_APP_API_URL}` + endpoint;

  try {
    const response = await fetch(url, {
      method: method,
      body: method === "GET" ? null : JSON.stringify(body),
      headers: headers,
      credentials: "include",
    });
    let error = "";
    const responseData = await response.json();

    if (!response.ok) {
      error = responseData.error;
    }
    return { responseData, error };
  } catch (error) {
    return error;
  }
};
