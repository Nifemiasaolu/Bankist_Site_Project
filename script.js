'use strict';

///////////////////////////////////////
//=============== Modal window ===============

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

/////////////////////////////////////////////////////
//=========== Selecting Elements Methods ===========
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
// console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');

// console.log(document.getElementsByClassName('btn'));

//=============== Creating and Inserting HTML ===============
const message = document.createElement('div');
message.classList.add('cookie-message'); //classList is to select class
// message.textContent = 'We use cookies for improved functionality and analytics'; //used to select the text content
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'; // used to insert HTML

// Element Methods
// header.prepend(message); //Prepend adds the element as the first child of the element.
// header.append(message); // Append inserts and moves the element as the last child of the element.
// header.append(message.cloneNode(true)); Makes it appear in both top and bottom

// header.before(message); //the message pops up before the header
header.after(message); // the message pops up after the header. Header and Message are Siblings.

// Delete Elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message); //This is called DOM Traversing
  });

////////////////////////////////////////////////////////////////
//===================== Styles, Attributes and Classes =====================
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// console.log(message.style.height);
// console.log(message.style.backgroundColor);

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height); // This is to get the height that was not declared manually on JS, but it exists on CSS.

// To alter the height
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// Working with Custom CSS
// document.documentElement.style.setProperty('--color-primary', 'orangered'); //Used to easily change the style of a page.

//====== Attributes ======
const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);
// console.log(logo.id);

// Resetting/ Altering Attributes
logo.alt = 'Beautiful minimalist logo';

// Non-standard ways of reading attributes
// console.log(logo.designer); //Results Undefined
// console.log(logo.getAttribute('designer')); // This is a non standard way of reading installed attributes

// Set New Attribbutes => Creates New Attribute
logo.setAttribute('company', 'Bankist');

// Using Absolute and Relative Version of Attribute
// console.log(logo.src); //Absolute Version
// console.log(logo.getAttribute('src')); //Relative Version is mostly used.

const link = document.querySelector('.nav__link--btn');
// console.log(link.href); // Absolute version
// console.log(link.getAttribute('href')); // Relative version

// Data Attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c');

logo.className = 'Jonas'; // DO NOT DO THIS!!!! It will override every className associated to it.

////////////////////////////////////////////////////////////////////////////////////////////////////////

//===================== Implementing Smooth Scrolling =====================

const buttonScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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

//////////////////////////////////////////////////////////////////
//================== Types of Events and Event Handlers ==================
const h1 = document.querySelector('h1');

const alertH1 = function() {
  // alert('EventListener: Great! You are reading the heading');

  // h1.removeEventListener('mouseenter', alertH1); // Listen to the event only once i.e removes the listener.
}

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => {
h1.addEventListener('mouseenter', alertH1)
}, 5000);
