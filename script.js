function sayHello() {
  alert("Hello! Thanks for visiting my website 🎉");
}

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const nav = document.querySelector('nav ul');

mobileMenu.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Smooth Scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        name: contactForm.name.value,
        email: contactForm.email.value,
        message: contactForm.message.value
    };

    try {
        const response = await fetch('http://localhost:3000/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            contactForm.reset();
            successMessage.style.display = 'block';
        } else {
            alert(result.error || 'Something went wrong');
        }
    } catch (error) {
        alert('Error sending message: ' + error.message);
    }
});
