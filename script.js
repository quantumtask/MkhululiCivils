const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const countItems = document.querySelectorAll(".count-up");

const animateCount = (el) => {
  const target = Number(el.dataset.target || "0");
  const suffix = el.dataset.suffix || "";
  const duration = 1400;
  let startTime = null;

  const frame = (time) => {
    if (!startTime) startTime = time;
    const progress = Math.min((time - startTime) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = `${value}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      el.textContent = `${target}${suffix}`;
    }
  };

  requestAnimationFrame(frame);
};

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.55 }
);

countItems.forEach((item) => countObserver.observe(item));
