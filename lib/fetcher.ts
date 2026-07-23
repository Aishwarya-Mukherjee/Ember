export const fetcher = async (url: string) => {
  const res = await fetch(url);
  
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    try {
      const data = await res.json();
      (error as any).info = data;
    } catch {
      (error as any).info = res.statusText;
    }
    (error as any).status = res.status;
    throw error;
  }
  
  return res.json();
};
