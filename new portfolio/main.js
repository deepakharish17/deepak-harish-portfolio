const navLinks = document.querySelectorAll('.ul-list li a');
const sections = document.querySelectorAll('section');

function removeActive() {
  navLinks.forEach(link => link.parentElement.classList.remove('active'));
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 80, 
      behavior: 'smooth'
    });

    removeActive();
    link.parentElement.classList.add('active');
  });
});

window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      removeActive();
      const activeLink = document.querySelector(`.ul-list li a[href="#${section.id}"]`);
      if (activeLink) activeLink.parentElement.classList.add('active');
    }
  });

  if(window.scrollY > 500){
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }

  revealElements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;

    if(elementTop < windowHeight - revealPoint){
      el.classList.add('active-reveal');
    }
  });
});

const revealElements = document.querySelectorAll('.home-container, .about-container, .projects-container, .services-container, .contact-content');
revealElements.forEach(el => el.classList.add('reveal'));

const backToTop = document.createElement('div');
backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
backToTop.id = "back-to-top";
document.body.appendChild(backToTop);

backToTop.style.cssText = `
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: #474af0;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.3s ease;
`;

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTop.addEventListener('mouseover', () => backToTop.style.transform = 'scale(1.2)');
backToTop.addEventListener('mouseout', () => backToTop.style.transform = 'scale(1)');

const cards = document.querySelectorAll('.project-card, .c1, .service-card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-8px) scale(1.05)');
  card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
});

const typingElement = document.querySelector('.info-home h3'); 
const words = ["Frontend Developer", "UI/UX Designer", "Web Enthusiast", "React Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentWord = words[wordIndex];
    let displayedText = currentWord.substring(0, charIndex);
    
    typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, typingSpeed / 2);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1000);
    }
}

document.addEventListener('DOMContentLoaded', type);

document.addEventListener("DOMContentLoaded", () => {
  const loadingText = document.getElementById("loading-text");
  const mainIcon = document.querySelector(".main-icon");
  const subIcons = document.querySelectorAll(".sub-icons i");
  const designerText = document.getElementById("designer-text");
  const mainPage = document.getElementById("main-page");
  const loadingScreen = document.getElementById("loading-screen");

  function showElement(element, delay=0){
    setTimeout(() => {
      element.classList.remove("hidden");
      element.classList.add("fall");
    }, delay);
  }

  showElement(loadingText, 0);          
  showElement(mainIcon, 800);         
  subIcons.forEach((icon, idx) => {
    showElement(icon, 1600 + idx*400);  
  });
  showElement(designerText, 2800);    

  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => loadingScreen.style.display='none', 500);
    mainPage.classList.add("visible");
  }, 4000);
});

(function () {
  emailjs.init("jS9pIzOuO10XVVMw1"); // ✅ your real PUBLIC key
})();

window.onload = function () {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const templateParams = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    emailjs
      .send("service_vpgjq1d", "template_qnxngeo", templateParams)
      .then(
        function (response) {
          alert("✅ Message sent successfully!");
          form.reset();
        },
        function (error) {
          console.error("❌ Failed...", error);
          alert("Failed to send message. Check console for details.");
        }
      );
  });
};

// /* ---------------- Existing JS code (your animations, menu, etc.) ---------------- */
// /* Keep all your previous main.js content above this comment */



// /* ------------------ EmailJS Contact Form Integration ------------------ */
// (function() {
//   // Initialize EmailJS with your Public Key
//   emailjs.init('jS9pIzOuO10XVVMw1');

//   const contactForm = document.getElementById('contact-form');
//   const feedbackDiv = document.getElementById('contact-feedback');

//   if (!contactForm) {
//     console.warn('Contact form not found (id="contact-form").');
//     return;
//   }

//   contactForm.addEventListener('submit', function(e) {
//     e.preventDefault();

//     // Disable button and show sending status
//     const sendBtn = contactForm.querySelector('button[type="submit"], input[type="submit"]');
//     const originalBtnText = sendBtn ? sendBtn.innerHTML : 'Send Message';
//     if (sendBtn) {
//       sendBtn.disabled = true;
//       sendBtn.innerHTML = 'Sending...';
//     }

//     feedbackDiv.style.display = 'none';
//     feedbackDiv.textContent = '';

//     // EmailJS parameters
//     const serviceID = 'service_vpgiq1d';
//     const templateID = 'template_30k8hiq';

//     // Send the form
//     emailjs.sendForm(serviceID, templateID, '#contact-form')
//       .then(function(response) {
//         console.log('SUCCESS!', response.status, response.text);
//         feedbackDiv.style.display = 'block';
//         feedbackDiv.style.color = '#0f9d58'; // green
//         feedbackDiv.textContent = '✅ Message sent successfully! I’ll get back to you soon.';
//         contactForm.reset();
//       }, function(error) {
//         console.error('FAILED...', error);
//         feedbackDiv.style.display = 'block';
//         feedbackDiv.style.color = '#d93025'; // red
//         feedbackDiv.textContent = '❌ Something went wrong. Please try again later.';
//       })
//       .finally(() => {
//         if (sendBtn) {
//           sendBtn.disabled = false;
//           sendBtn.innerHTML = originalBtnText;
//         }
//       });
//   });
// })();

