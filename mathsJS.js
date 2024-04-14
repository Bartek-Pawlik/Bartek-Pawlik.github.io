function calculate() {
    const input = document.getElementById('numbers').value;
    const numbers = input.split(',').map(num => parseFloat(num.trim()));

    if (numbers.some(isNaN)) {
      document.getElementById('result').innerHTML = '<p class="text-danger">Please enter valid numbers.</p>';
      return;
    }

    const mean = numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length;
    const sortedNumbers = numbers.slice().sort((a, b) => a - b);
    const median = calculateMedian(sortedNumbers);
    const mode = calculateMode(numbers);
    const range = Math.max(...numbers) - Math.min(...numbers);
    const minimum = Math.min(...numbers);
    const maximum = Math.max(...numbers);
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    const quartiles = calculateQuartiles(sortedNumbers);
    const q1 = (quartiles[0]).toFixed(2);
    const q3 = (quartiles[2]).toFixed(2);
    const iqr = q3 - q1;
   
  
    const resultHtml = `
      <p><strong>Mean:</strong> ${mean}</p>
      <p><strong>Median:</strong> ${median}</p>
      <p><strong>Mode:</strong> ${mode}</p>
      <p><strong>Range:</strong> ${range}</p>
      <p><strong>Minimum:</strong> ${minimum}</p>
      <p><strong>Maximum:</strong> ${maximum}</p>
      <p><strong>Sum:</strong> ${sum}</p>
      <p><strong>Quartile Q1:</strong> ${q1}</p>
      <p><strong>Quartile Q3:</strong> ${q3}</p>
      <p><strong>Interquartile Range (IQR):</strong> ${iqr}</p>
    `;

    document.getElementById('result').innerHTML = resultHtml;
  }

  function calculateMedian(sortedNumbers) {
  const mid = Math.floor(sortedNumbers.length / 2);
  return sortedNumbers.length % 2 !== 0 ? sortedNumbers[mid] : (sortedNumbers[mid - 1]);
}


  function calculateMode(numbers) {
    const counts = {};
    numbers.forEach(num => counts[num] = (counts[num] || 0) + 1);
    const maxCount = Math.max(...Object.values(counts));
    return Object.keys(counts).filter(key => counts[key] === maxCount).join(', ');
  }

  function calculateMedian2(numbers) {
    const mid = Math.floor(numbers.length / 2);
    return numbers.length % 2 === 0 ? (numbers[mid - 1] + numbers[mid]) / 2 : numbers[mid];
}


function calculateQuartiles(numbers) {
    numbers.sort((a, b) => a - b);

    const mid = Math.floor(numbers.length / 2);
    
    const lowerHalf = numbers.slice(0, mid);
    const upperHalf = numbers.slice(numbers.length % 2 === 0 ? mid : mid + 1);

    const q1 = calculateMedian(lowerHalf);
    const q2 = calculateMedian(numbers);
    const q3 = calculateMedian(upperHalf);

    return [q1, q2, q3];
}
