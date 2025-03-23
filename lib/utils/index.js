const generateElevations = () => {
  const elevations = {};
  for (let i = 0; i <= 10; i++) {
    if (i === 0) {
      elevations[i] = {};
    } else {
      elevations[i] = {
        elevation: i,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: i },
        shadowOpacity: 0.1 * i,
        shadowRadius: i * 2,
      };
    }
  }
  return elevations;
};

export { generateElevations };
