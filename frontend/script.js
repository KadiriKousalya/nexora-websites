function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}


window.addEventListener("scroll", function() {
  const header = document.querySelector("header");
  header.classList.toggle("scrolled", window.scrollY > 50);
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });
});


document.getElementById("enquiryForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = {
    name: this.name.value,
    email: this.email.value,
    phone: this.phone.value,
    course: this.course.value,
    message: this.message.value
  };

  try {
    const res = await fetch("http://localhost:5000/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    alert(data.message || "Something went wrong!");
    this.reset();
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Server error, please try again later.");
  }
  
});