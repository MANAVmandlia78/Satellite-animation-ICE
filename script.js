// GSAP Animation for Satellite Orbit
gsap.to("#orbit-container", {
  rotation: 360, // Full circle
  duration: 10, // Duration of one revolution (seconds)
  repeat: -1, // Infinite loop
  ease: "linear", // Smooth and constant speed
  transformOrigin: "center center" // Rotate around Earth
});

var menu = document.querySelector("#nav i")
var cross = document.querySelector("#full i")
var tl = gsap.timeline()

tl.to("#full",{
   right:0,
   duration:0.8
})

tl.from("#full h4",{
   x:150,
   duration:0.7,
   stagger:0.3,
   opacity:0
})

tl.from("#full i",{
   opacity:0
})

tl.pause()

menu.addEventListener("click",function(){
   tl.play()
})

cross.addEventListener("click",function(){
   tl.reverse()
})

// Constants
const G = 6.674 * Math.pow(10, -11); // Gravitational constant (Nm^2/kg^2)
const M = 5.972 * Math.pow(10, 24); // Mass of Earth (kg)
const R_EARTH = 6371 * 1000; // Radius of Earth in meters (6371 km)

// Satellite Calculator
document.getElementById("calculate-btn").addEventListener("click", function () {
    const altitudeKm = parseFloat(document.getElementById("altitude").value);

    if (isNaN(altitudeKm) || altitudeKm < 160) {
        alert("Please enter a valid altitude of at least 160 km.");
        return;
    }

    const radius = R_EARTH + altitudeKm * 1000; // Total radius in meters (Earth radius + altitude)
    const velocity = Math.sqrt((G * M) / radius); // Orbital velocity in m/s
    const time = (2 * Math.PI * radius) / velocity; // Orbital period in seconds

    const timeInMinutes = time / 60; // Convert time to minutes
    const timeInHours = timeInMinutes / 60; // Convert time to hours

    // Display Results
    document.getElementById("velocity-result").textContent = `Orbital Velocity: ${velocity.toFixed(2)} m/s`;
    document.getElementById("time-result").textContent = `Orbital Period: ${timeInMinutes.toFixed(2)} minutes (${timeInHours.toFixed(2)} hours)`;
});

// Toggle LEO Information
// Toggle Information for LEO and MEO
// Toggle Information for LEO and MEO
function toggleInfo(titleId, infoId) {
   document.getElementById(titleId).addEventListener("click", function () {
       const info = document.getElementById(infoId);
       if (info.classList.contains("hidden")) {
           info.classList.remove("hidden");
           info.style.display = "block";
       } else {
           info.classList.add("hidden");
           info.style.display = "none";
       }
   });
}

// Initialize toggle functionality for LEO and MEO
toggleInfo("leo-info-title", "leo-info");
toggleInfo("meo-info-title", "meo-info"); // Ensure this is the correct ID for MEO
meo-info-title





