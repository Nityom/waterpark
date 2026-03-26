/**
 * Calculate convenience charge with proper rounding
 * - Adds 2.3% charge
 * - Rounds up if decimal >= 0.5, rounds down if decimal < 0.5
 */
export function calculateConvenienceCharge(baseAmount) {
  const numericAmount = Number(baseAmount);
  
  if (isNaN(numericAmount) || numericAmount <= 0) {
    return {
      baseAmount: numericAmount,
      chargeAmount: 0,
      totalAmount: numericAmount,
    };
  }

  // Calculate 2.3% convenience charge
  const chargeAmount = numericAmount * 0.023;
  
  // Custom rounding: if decimal >= 0.5, round up; else round down
  const decimalPart = chargeAmount % 1;
  const roundedCharge = decimalPart >= 0.5 
    ? Math.ceil(chargeAmount) 
    : Math.floor(chargeAmount);
  
  const totalAmount = numericAmount + roundedCharge;

  return {
    baseAmount: numericAmount,
    chargeAmount: roundedCharge,
    totalAmount: Math.round(totalAmount * 100) / 100, // Ensure proper decimal precision
  };
}
