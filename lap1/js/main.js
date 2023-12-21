let slider = document.getElementById('slider');
let prevButton = document.getElementById('prev');
let nextButton = document.getElementById('next');
let indicatorsContainer = document.getElementById('indicators');

let currentIndex = 0;


for (let i = 0; i < slider.children.length; i++) {
  let indicator = document.createElement('div');
  indicator.classList.add('indicator');
  indicatorsContainer.appendChild(indicator);

  indicator.addEventListener('click', () => {
    goToSlide(i);
  });
}

let indicators = Array.from(indicatorsContainer.children);


indicators[currentIndex].classList.add('active');


function goToSlide(index) {
  currentIndex = index;
  updateSlider();
  updateIndicators();
}


function updateSlider() {
  let transformValue = -currentIndex * 100 + '%';
  slider.style.transform = 'translateX(' + transformValue + ')';
}


function updateIndicators() {
  indicators.forEach((indicator, index) => {
    if (index === currentIndex) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  });
}


nextButton.addEventListener('click', () => {
  goToSlide((currentIndex + 1) % slider.children.length);
});

prevButton.addEventListener('click', () => {
  goToSlide((currentIndex - 1 + slider.children.length) % slider.children.length);
});

setInterval(() => {
  goToSlide((currentIndex + 1) % slider.children.length);
}, 5000); 