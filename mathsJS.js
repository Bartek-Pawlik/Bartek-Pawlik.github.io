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
  
  // Calculate quartiles (Q1, Q2=median, Q3)
  const quartiles = calculateQuartiles(sortedNumbers);
  const q1 = quartiles[0];
  const q3 = quartiles[2];
  
  const iqr = q3 - q1;
  const lowerOutlier = q1 - 1.5 * iqr;
  const upperOutlier = q3 + 1.5 * iqr;

  const resultHtml = `
      <p><strong>Mean:</strong> ${mean.toFixed(2)}</p>
      <p><strong>Median:</strong> ${median.toFixed(2)}</p>
      <p><strong>Mode:</strong> ${mode}</p>
      <p><strong>Range:</strong> ${range.toFixed(2)}</p>
      <p><strong>Minimum:</strong> ${minimum}</p>
      <p><strong>Maximum:</strong> ${maximum}</p>
      <p><strong>Sum:</strong> ${sum}</p>
      <p><strong>Quartile Q1:</strong> ${q1.toFixed(2)}</p>
      <p><strong>Quartile Q3:</strong> ${q3.toFixed(2)}</p>
      <p><strong>Interquartile Range (IQR):</strong> ${iqr.toFixed(2)}</p>
      <p><strong>Lower Outlier:</strong> ${lowerOutlier.toFixed(2)}</p>
      <p><strong>Upper Outlier:</strong> ${upperOutlier.toFixed(2)}</p>
  `;

  document.getElementById('result').innerHTML = resultHtml;
}

function calculateMedian(numbers) {
  const mid = Math.floor(numbers.length / 2);
  return numbers.length % 2 !== 0 ? numbers[mid] : (numbers[mid - 1] + numbers[mid]) / 2.0;
}

function calculateMode(numbers) {
  const counts = {};
  numbers.forEach(num => counts[num] = (counts[num] || 0) + 1);
  const maxCount = Math.max(...Object.values(counts));
  return Object.keys(counts).filter(key => counts[key] === maxCount).join(', ');
}

function calculateQuartiles(numbers) {
  const n = numbers.length;
  const q1Position = (n + 1) / 4;
  const q2Position = (n + 1) / 2;
  const q3Position = 3 * (n + 1) / 4;

  const q1 = interpolateQuartile(numbers, q1Position);
  const q2 = interpolateQuartile(numbers, q2Position);
  const q3 = interpolateQuartile(numbers, q3Position);

  return [q1, q2, q3];
}

function interpolateQuartile(sortedNumbers, position) {
  const index = Math.floor(position);
  const fraction = position - index;
  if (fraction === 0) {
      return sortedNumbers[index - 1];
  } else {
      return sortedNumbers[index - 1] + fraction * (sortedNumbers[index] - sortedNumbers[index - 1]);
  }
}
