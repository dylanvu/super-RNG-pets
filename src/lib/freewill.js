const IsFreeWill = (turn, frequency, freeR1) => {
    // Function to determine if the current turn is a free will turn
    return freeR1 ? (turn - 1) % (frequency + 1) === 0 : turn % (frequency + 1) === 0;
}

export default IsFreeWill;