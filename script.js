// Navegação suave
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    })
  })
})

// Alternar tema claro/escuro
const themeToggle = document.querySelector(".theme-toggle")
const toggleCircle = document.querySelector(".toggle-circle")
const root = document.documentElement

// Verificar se há preferência de tema salva
const savedTheme = localStorage.getItem("theme")
if (savedTheme === "dark") {
  enableDarkMode()
}

themeToggle.addEventListener("click", () => {
  if (toggleCircle.style.transform === "translateX(20px)") {
    disableDarkMode()
  } else {
    enableDarkMode()
  }
})

function enableDarkMode() {
  toggleCircle.style.transform = "translateX(20px)"
  root.style.setProperty("--bg-color", "#1a1a2e")
  root.style.setProperty("--card-bg", "#16213e")
  root.style.setProperty("--text-color", "#e6e6e6")
  root.style.setProperty("--text-light", "#b3b3b3")
  localStorage.setItem("theme", "dark")
}

function disableDarkMode() {
  toggleCircle.style.transform = "translateX(0)"
  root.style.setProperty("--bg-color", "#f8f9fa")
  root.style.setProperty("--card-bg", "#fff")
  root.style.setProperty("--text-color", "#333")
  root.style.setProperty("--text-light", "#666")
  localStorage.setItem("theme", "light")
}

// Animação de entrada dos elementos
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in")
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observar elementos para animação
document.querySelectorAll(".project-card, .tech-item, .contact-item").forEach((el) => {
  observer.observe(el)
})

// Formulário de contato
const contactForm = document.querySelector(".contact-form form")
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Simulação de envio
    const submitBtn = this.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    submitBtn.innerHTML = "Enviando..."
    submitBtn.disabled = true

    setTimeout(() => {
      alert("Mensagem enviada com sucesso!")
      this.reset()
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }, 1500)
  })
}

// Menu mobile
const createMobileMenu = () => {
  if (window.innerWidth <= 576 && !document.querySelector(".mobile-menu-btn")) {
    const header = document.querySelector("header .container")
    const mobileBtn = document.createElement("div")
    mobileBtn.className = "mobile-menu-btn"
    mobileBtn.innerHTML = '<i class="fas fa-bars"></i>'
    header.appendChild(mobileBtn)

    const menu = document.querySelector(".menu")
    menu.classList.add("mobile-menu")

    mobileBtn.addEventListener("click", () => {
      menu.classList.toggle("show")
      mobileBtn.classList.toggle("active")
    })

    // Adicionar estilos CSS para o menu mobile
    const style = document.createElement("style")
    style.textContent = `
            .mobile-menu-btn {
                font-size: 1.5rem;
                cursor: pointer;
                display: block;
                z-index: 1001;
            }
            
            .mobile-menu-btn.active i:before {
                content: "\\f00d";
            }
            
            .mobile-menu {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background-color: var(--card-bg);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                transform: translateX(-100%);
                transition: transform 0.3s ease;
                z-index: 1000;
            }
            
            .mobile-menu.show {
                transform: translateX(0);
            }
            
            .mobile-menu li {
                margin: 1rem 0;
            }
            
            .mobile-menu a {
                font-size: 1.5rem;
            }
        `
    document.head.appendChild(style)
  }
}

// Executar ao carregar e redimensionar
window.addEventListener("load", createMobileMenu)
window.addEventListener("resize", createMobileMenu)

// Adicionar animações CSS
const animationStyles = document.createElement("style")
animationStyles.textContent = `
    .project-card, .tech-item, .contact-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`
document.head.appendChild(animationStyles)

// Tecnologias incluídas no portfólio:
// - JavaScript (JS)
// - React
// - Node.js
// - HTML5
// - CSS3
// - MongoDB
// - AWS
