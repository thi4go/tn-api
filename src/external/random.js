const URL = 'https://api.random.org/json-rpc/4/invoke';

const API_KEY = '37ad4044-6591-40d8-a7fc-4861a7ac97c0';

const generateStringsPayload = {
  jsonrpc: '2.0',
  method: 'generateStrings',
  params: {
    apiKey: API_KEY,
    n: 8,
    length: 10,
    characters: 'abcdefghijklmnopqrstuvwxyz',
    replacement: true,
  },
  id: 1,
};

export async function getRandomString() {
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(generateStringsPayload),
  });
  const data = await response.json();
  return data.result.random.data[0];
}
