const currentSavings = async () => {
  try {
    const response = await fetch(`http://localhost:3001/api/savings`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with fetch.", error);
  } finally {
    // Consider setting a loading state to 'false' here to indicate data is fetched
  }
};

export default currentSavings;
