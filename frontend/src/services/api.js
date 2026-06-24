const API_BASE_URL = import.meta.env.VITE_API_URL || "https://orbitguard-ai-tgj9.onrender.com";

export const analyzeImpactApi = async (fileName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file: fileName }),
    });

    if (!response.ok) {
      throw new Error(`API error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error connecting to backend:", error);
    throw error;
  }
};
