// script.js

// Get references to HTML elements
const binaryInput = document.getElementById("binaryInput");
const modulationSelect = document.getElementById("modulationSelect");
const simulateBtn = document.getElementById("simulateBtn");
const canvas = document.getElementById("waveformCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 800;
canvas.height = 400; // Increased height for both waveforms

// Event listener for the simulate button
simulateBtn.addEventListener("click", () => {
  const binaryData = binaryInput.value.trim();
  const modulationType = modulationSelect.value;

  if (!isValidBinary(binaryData)) {
    alert("Please enter valid binary data (only 0s and 1s).");
    return;
  }

  simulateModulation(binaryData, modulationType);
});

// Function to validate binary input
function isValidBinary(binary) {
  return /^[01]+$/.test(binary);
}

// Function to simulate modulation
function simulateModulation(binaryData, modulationType) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const carrierFrequency = 5; // Hz
  const sampleRate = 1000; // Samples per second
  const amplitude = 50; // Amplitude of the wave
  const timePerBit = 1; // Duration for each bit (in seconds)

  const totalTime = binaryData.length * timePerBit;
  const samplesPerBit = sampleRate * timePerBit;
  const totalSamples = sampleRate * totalTime;

  let time = 0;

  // Plot the binary waveform
  drawBinaryWaveform(binaryData, samplesPerBit, timePerBit);

  // Plot the modulated waveform
  for (let i = 0; i < binaryData.length; i++) {
    const bit = parseInt(binaryData[i], 10);

    for (let j = 0; j < samplesPerBit; j++) {
      const x = (time / totalTime) * canvas.width;
      let y;

      if (modulationType === "ASK") {
        y = bit * amplitude * Math.sin(2 * Math.PI * carrierFrequency * time);
      } else if (modulationType === "FSK") {
        const freq = bit === 1 ? carrierFrequency * 2 : carrierFrequency;
        y = amplitude * Math.sin(2 * Math.PI * freq * time);
      } else if (modulationType === "PSK") {
        const phase = bit === 1 ? Math.PI : 0;
        y = amplitude * Math.sin(2 * Math.PI * carrierFrequency * time + phase);
      }

      const yCanvas = canvas.height / 2 + 100 - y; // Adjusted for modulated signal

      if (j === 0 && i === 0) {
        ctx.beginPath();
        ctx.moveTo(x, yCanvas);
      } else {
        ctx.lineTo(x, yCanvas);
      }

      time += 1 / sampleRate;
    }
  }

  ctx.strokeStyle = "blue";
  ctx.lineWidth = 2;
  ctx.stroke();
}

// Function to draw binary waveform
function drawBinaryWaveform(binaryData, samplesPerBit, timePerBit) {
  const amplitude = 50;
  const totalTime = binaryData.length * timePerBit;
  let time = 0;

  for (let i = 0; i < binaryData.length; i++) {
    const bit = parseInt(binaryData[i], 10);
    const xStart = (time / totalTime) * canvas.width;
    const xEnd = ((time + timePerBit) / totalTime) * canvas.width;
    const yValue = canvas.height / 2 - 150 - bit * amplitude; // Adjusted for binary signal

    // Draw the binary signal as a square wave
    ctx.beginPath();
    ctx.moveTo(xStart, canvas.height / 2 - 150); // Base line
    ctx.lineTo(xStart, yValue); // Rising edge
    ctx.lineTo(xEnd, yValue); // Constant value
    ctx.lineTo(xEnd, canvas.height / 2 - 150); // Falling edge
    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    ctx.stroke();

    time += timePerBit;
  }
}
