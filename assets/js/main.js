/**
* Template Name: Personal - v4.8.1
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

 

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }


  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()


function validateForm() {
  var name = document.getElementById("name").value;
  var mobilenumber = document.getElementById("mobilenumber").value;
  var email = document.getElementById("email").value;
  var subject = document.getElementById("subject").value;
  var message = document.getElementById("message").value;
  var msg1 = document.getElementById("msg1")

  if (name == "") {
    msg1.innerHTML = "Name must be filled out"
    setTimeout(function () {
      msg1.innerHTML = ""
    }, 5000)
    return false;
  }

  if (/\d/.test(name)) {
    msg1.innerHTML = "Name must be character"
    setTimeout(function () {
      msg1.innerHTML = ""
    }, 5000)
    return false
  }

  if (mobilenumber == "") {
    msg1.innerHTML = "Mobile Number must be filled out"
    setTimeout(function () {
      msg1.innerHTML = ""
    }, 5000)
    return false;
  }

  if (isNaN(mobilenumber)) {
    msg1.innerHTML = "Mobile Number must be Digits"
    setTimeout(function () {
      msg1.innerHTML = ""
    }, 5000)
    return false
  }

  if (mobilenumber.length < 10) {
    msg1.innerHTML = "Mobile Number must have 10 digits"
    setTimeout(function () {
      msg1.innerHTML = ""
    }, 5000)
    return false
  }

  if (mobilenumber.length > 10) {
    msg1.innerHTML = "Mobile Number must have only 10 digits"
    setTimeout(function () {
      msg1.innerHTML = ""
    }, 5000)
    return false
  }

  var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    msg1.innerHTML = "Email must be a valid email address"
    setTimeout(function () {
      msg1.innerHTML = ""
    }, 5000)
    return false;
  }

  if (subject == "") {
    msg1.innerHTML = "Subject must be filled out"
    setTimeout(function () {
      msg1.innerHTML = ""
    }, 5000)
    return false;
  }


  if (message == "") {
    msg1.innerHTML = "Message must be filled out"
    setTimeout(function () {
      msg1.innerHTML = ""
    }, 5000)
    return false;
  }

  return true;
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbz-BXdcvAaVROQlqhVT4AKmHMs1r2AgpQrzElQuAe_vKUG6sdirRiKLsJN58zgZSHAcqw/exec'
const form = document.getElementById("form")
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
  e.preventDefault()
  if (validateForm()) {
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        msg.innerHTML = "Sent Successfully"
        // alert("Sent Successfully")
        setTimeout(function () {
          msg.innerHTML = ""
        }, 5000)
        form.reset()
      })
      .catch(error => console.error('Error!', error.message))
  }
})