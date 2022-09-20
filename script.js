const circle = document.querySelector(".progress__circle");
const radius = circle.r.baseVal.value;
console.log(radius);
const curcumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = `${curcumference} ${curcumference}`;

function setProgress(percent) {
  const offset = curcumference - (percent / 100) * curcumference;
  circle.style.strokeDashoffset = offset;
}

const percentInput = document.querySelector(".progress__input");

percentInput.addEventListener("change", (evt) => {
  const percent = evt.target;

  if (percent.value > 100) {
    percent.value = 100;
  } else if (percent.value < 0) {
    percent.value = 0;
  }

  setProgress(percent.value);
});

const animateState = document.querySelector(
  '.progress__checkbox[name="animation"]'
);
const ring = document.querySelector(".progress__ring");

animateState.addEventListener("change", (evt) => {
  const animate = evt.target.checked;

  if (animate) {
    if (!ring.classList.contains("progress__ring_rotating"))
      ring.classList.add("progress__ring_rotating");
  } else {
    if (ring.classList.contains("progress__ring_rotating"))
      ring.classList.remove("progress__ring_rotating");
  }
});

const hideState = document.querySelector('.progress__checkbox[name="hide"]');
const progressGraph = document.querySelector(".progress__graph");

hideState.addEventListener("change", (evt) => {
  const hide = evt.target.checked;

  if (hide) {
    if (!progressGraph.classList.contains("progress__graph_hidden"))
      progressGraph.classList.add("progress__graph_hidden");
  } else {
    if (progressGraph.classList.contains("progress__graph_hidden"))
      progressGraph.classList.remove("progress__graph_hidden");
  }
});
