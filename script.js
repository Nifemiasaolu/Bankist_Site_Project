'use strict';

//================= Selections =================
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const buttonScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

////////////////////////////////////////
//=============== Modal window Function ===============
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//========================= Functions =========================
//========= Button Smooth Scroll Function =========
buttonScrollTo.addEventListener('click', function (e) {
  // const s1coords = section1.getBoundingClientRect();  //Getting the coordinates of the section
  // console.log(s1coords); //Gets the coordinate of the section,

  // console.log(e.target.getBoundingClientRect()); //Getting the coordinates of the section

  // console.log('Current scrol (X/Y', window.pageXOffset, window.pageYOffset); //`Distance btw the current position of
  // the port and the view page`

  // console.log(
  //   'Height/Width viewport',
  //   document.documentElement.clientHeight, //Gets the current viewport height and width
  //   document.documentElement.clientWidth
  // );

  //============== Scrolling ==============

  //==== Older Method =====
  // window.scrollTo(
  // s1coords.left + window.pageXOffset,
  // s1coords.top + window.pageYOffset
  // ); //This adds the distance between the current
  // position of the viewport and the very top to the top position e.g: a+b+c
  // a = the very beginnig of the page
  // b = the current top of the page
  // c = the current position to the top of the page

  // Another Scrolling method that enables Smooth Scrolling
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // })

  // Newer Method
  section1.scrollIntoView({ behavior: 'smooth' });
});

//========= Page Navigation Function (Event Delegation) =========

//===== Older Method but still in use =====
// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click', function(e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'})
//   })
// })

//========== Page Navigation Using Event Delegation (Modern Method)==========
// 1. Add event listener to the parent Element
// 2. Determine what element originated/activated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//============= Tabbed Components Function =============

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  // Guard clause (Modern method)
  // if(!clicked) return; //if it is not clicked, return the function immediately,
  // if it's clicked, execute the next function

  // Traditional Method
  //   if(clicked) {
  //   tabs.forEach(t => t.classList.remove('operations__tab--active'));
  //   clicked.classList.add('.operations__tab--active'); //This means whichever we click,
  //  }

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate Tab
  clicked.classList.add('operations__tab--active'); //This means whichever we click, we want to make it active

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//================= Menu Fade Animation =================
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//////////////////////////////////////////////////
//================= Sticky Navigation Scroll Event =================
////////////
//====== Older Method ======
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', function() {
// console.log(window.scrollY);

//   if(window.scrollY > initialCoords.top) nav.classList.add('sticky')
//   else nav.classList.remove('sticky');
// })

///////////////////////////////////////////////////
//==== Sticky Navigaion: Intersection Observer API (Newer Method) ====
// const section2 = document.querySelector('#section--2');

// const obsCallBack = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// }

// const obsOptions = {
//   root: null,
//   threshold: 0.1
// }
// const observer = new IntersectionObserver(obsCallBack, obsOptions);
// observer.observe(section1);

//////////////////////////////////////////////////
// Smooth Scroll Event Using Intersection Observer API 
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height; //Gets the height automatically, regardless of viewport.
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//////////////////////////////////////////////////////////////
//======= Reveal Section Using Intersection Observer API =======
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  // Guard Clause
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); //This is to unobserve all the unnecessary activities.
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//////////////////////////////////////////////////
//============ Lazy Loading Images Using Intersection Observer API============
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  //Converts the lazy image into the clear original one
  entry.target.src = entry.target.dataset.src; 
  
  // Listen for load before removing the lazy image filter 
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  // Stop observing 
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(function (img) {
  imgObserver.observe(img);
});

////////////////////////////////////////////////////////////////
/////////////////////// LECTURES //////////////////////////////
//=========== Selecting Elements Methods ===========
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');

// console.log(document.getElementsByClassName('btn'));

//=============== Creating and Inserting HTML ===============
// const message = document.createElement('div');
// message.classList.add('cookie-message'); //classList is to select class
// message.textContent = 'We use cookies for improved functionality and analytics'; //used to select the text content
// message.innerHTML =
//   'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'; // used to insert HTML

// Element Methods
// header.prepend(message); //Prepend adds the element as the first child of the element.
// header.append(message); // Append inserts and moves the element as the last child of the element.
// header.append(message.cloneNode(true)); Makes it appear in both top and bottom

// header.before(message); //the message pops up before the header
// header.after(message); // the message pops up after the header. Header and Message are Siblings.

// Delete Elements
// document
// .querySelector('.btn--close-cookie')
// .addEventListener('click', function () {
// message.remove();
// message.parentElement.removeChild(message); //This is called DOM Traversing
// });

////////////////////////////////////////////////////////////////
//===================== Styles, Attributes and Classes =====================
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log(message.style.height);
// console.log(message.style.backgroundColor);

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height); // This is to get the height that was not declared manually on JS, but it exists on CSS.

// To alter the height
// message.style.height =
// Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// Working with Custom CSS
// document.documentElement.style.setProperty('--color-primary', 'orangered'); //Used to easily change the style of a page.

//====== Attributes ======
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);
// console.log(logo.id);

// Resetting/ Altering Attributes
// logo.alt = 'Beautiful minimalist logo';

// Non-standard ways of reading attributes
// console.log(logo.designer); //Results Undefined
// console.log(logo.getAttribute('designer')); // This is a non standard way of reading installed attributes

// Set New Attribbutes => Creates New Attribute
// logo.setAttribute('company', 'Bankist');

// Using Absolute and Relative Version of Attribute
// console.log(logo.src); //Absolute Version
// console.log(logo.getAttribute('src')); //Relative Version is mostly used.

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href); // Absolute version
// console.log(link.getAttribute('href')); // Relative version

// Data Attributes
// console.log(logo.dataset.versionNumber);

// Classes
// logo.classList.add('c', 'j');
// logo.classList.remove('c', 'j');
// logo.classList.toggle('c');
// logo.classList.contains('c');

// logo.className = 'Jonas'; // DO NOT DO THIS!!!! It will override every className associated to it.

////////////////////////////////////////////////////////////////////////////////////////////////////////

//===================== Implementing Smooth Scrolling =====================

//////////////////////////////////////////////////////////////////
//================== Types of Events and Event Handlers ==================
// const h1 = document.querySelector('h1');

const alertH1 = function () {
  // alert('EventListener: Great! You are reading the heading');
  // h1.removeEventListener('mouseenter', alertH1); // Listen to the event only once i.e removes the listener.
};

// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => {
// h1.addEventListener('mouseenter', alertH1)
// }, 5000);

//===================== Event Propagation and Bubbling =====================
// rgb(255, 255,255);

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);

// Stop Propagation
// e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// console.log('NAV', e.target, e.currentTarget);
// });

//======================= DOM Traversing =======================
// const h1 = document.querySelector('h1');

// Going downwards: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';
// const title = document.querySelector('.header__title');
// console.log(title.children);
// console.log(title.childNodes);

// Going Upwards: parent
// console.log(h1.parentNode);
// console.log(h1.parentElement); //Mostly Used

// Finding a parent element that is not a direct parent but is related to it.
// h1.closest('.header').style.background = 'var(--gradient-primary)';
// h1.closest('h1').style.background = 'var(--gradient-secondary)';

// Closest is regarded as the opposite of querySelector, bcos it finds parents
// no matter how high they are in the heirachy, as long as they are related.
// While querySelector finds children no matter how deep they are in the heirachy

// Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function(el) {
//   if(el !== h1) el.style.transform = 'scale(0.5)'
// })
