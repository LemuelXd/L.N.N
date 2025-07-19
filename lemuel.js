// Load EmailJS SDK dynamically
;(() => {
  window.emailjs = window.emailjs || {}
  const script = document.createElement("script")
  script.src = "https://cdn.emailjs.com/dist/email.min.js"
  script.onload = () => {
    window.emailjs.init("j_Rvdu4FRzpH80CxD") // Your EmailJS public key
  }
  document.head.appendChild(script)
})()

// DOM Elements
const themeToggle = document.getElementById("themeToggle")
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")
const navLinks = document.querySelectorAll(".nav-link")
const contactForm = document.getElementById("contactForm")
const formStatus = document.getElementById("formStatus")
const currentYearSpan = document.getElementById("current-year")

// Theme Management
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem("theme") || "dark"
    this.init()
  }

  init() {
    this.setTheme(this.currentTheme)
    this.bindEvents()
  }

  setTheme(theme) {
    document.body.className = theme === "dark" ? "dark-theme" : "light-theme"
    const icon = themeToggle.querySelector("i")
    icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon"
    localStorage.setItem("theme", theme)
    this.currentTheme = theme
  }

  toggleTheme() {
    const newTheme = this.currentTheme === "dark" ? "light" : "dark"
    this.setTheme(newTheme)
  }

  bindEvents() {
    themeToggle.addEventListener("click", () => this.toggleTheme())
  }
}

// Navigation Management
class NavigationManager {
  constructor() {
    this.isMenuOpen = false
    this.init()
  }

  init() {
    this.bindEvents()
    this.handleScroll()
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
    hamburger.classList.toggle("active", this.isMenuOpen)
    navMenu.classList.toggle("active", this.isMenuOpen)
    document.body.style.overflow = this.isMenuOpen ? "hidden" : ""
  }

  closeMenu() {
    this.isMenuOpen = false
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
    document.body.style.overflow = ""
  }

  smoothScroll(targetId) {
    const target = document.querySelector(targetId)
    if (target) {
      const offsetTop = target.offsetTop - 80 // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }

  handleScroll() {
    let ticking = false

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateActiveNavLink()
          this.updateScrollIndicator()
          ticking = false
        })
        ticking = true
      }
    })
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]")
    const scrollPos = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active")
          }
        })
      }
    })
  }

  updateScrollIndicator() {
    const scrollIndicator = document.querySelector(".scroll-indicator")
    if (scrollIndicator) {
      const scrolled = window.scrollY > 100
      scrollIndicator.style.opacity = scrolled ? "0" : "1"
    }
  }

  bindEvents() {
    // Hamburger menu toggle
    hamburger.addEventListener("click", () => this.toggleMenu())

    // Navigation links
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const targetId = link.getAttribute("href")
        this.smoothScroll(targetId)
        this.closeMenu()
      })
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (this.isMenuOpen && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        this.closeMenu()
      }
    })

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isMenuOpen) {
        this.closeMenu()
      }
    })
  }
}

// Animations Manager
class AnimationsManager {
  constructor() {
    this.init()
  }

  init() {
    this.setupIntersectionObserver()
    this.animateSkillBars()
    this.setupFloatingCube()
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    }, observerOptions)

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
      ".hero-content, .about-content, .skill-card, .project-card, .contact-content",
    )

    animateElements.forEach((el) => observer.observe(el))
  }

  animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-bar")

    const animateBar = (bar) => {
      const level = bar.getAttribute("data-level")
      bar.style.width = "0%"

      setTimeout(() => {
        bar.style.transition = "width 1.5s ease-out"
        bar.style.width = level + "%"
      }, 200)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateBar(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    skillBars.forEach((bar) => observer.observe(bar))
  }

  setupFloatingCube() {
    const cube = document.querySelector(".cube")
    if (cube) {
      let mouseX = 0
      let mouseY = 0
      let cubeX = 0
      let cubeY = 0

      document.addEventListener("mousemove", (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1
        mouseY = (e.clientY / window.innerHeight) * 2 - 1
      })

      const animateCube = () => {
        cubeX += (mouseX * 10 - cubeX) * 0.05
        cubeY += (mouseY * 10 - cubeY) * 0.05

        cube.style.transform = `rotateX(${cubeY * 2}deg) rotateY(${cubeX * 2}deg)`
        requestAnimationFrame(animateCube)
      }

      animateCube()
    }
  }
}

// Contact Form Manager
class ContactFormManager {
  constructor() {
    this.init()
  }

  init() {
    this.bindEvents()
    this.setupFormValidation()
  }

  bindEvents() {
    contactForm.addEventListener("submit", (e) => this.handleSubmit(e))

    // Enhanced form interactions
    const formGroups = document.querySelectorAll(".form-group")
    formGroups.forEach((group) => {
      const input = group.querySelector("input, textarea")
      const label = group.querySelector("label")

      input.addEventListener("focus", () => {
        group.classList.add("focused")
        if (label) {
          label.style.top = "5px"
          label.style.fontSize = "0.8rem"
          label.style.color = "var(--primary-color)"
        }
      })

      input.addEventListener("blur", () => {
        if (!input.value.trim()) {
          group.classList.remove("focused")
          if (label) {
            label.style.top = "15px"
            label.style.fontSize = "1rem"
            label.style.color = "var(--text-secondary)"
          }
        }
      })

      input.addEventListener("input", () => {
        if (input.value.trim()) {
          group.classList.add("has-value")
        } else {
          group.classList.remove("has-value")
        }
      })
    })
  }

  setupFormValidation() {
    const inputs = contactForm.querySelectorAll("input, textarea")

    inputs.forEach((input) => {
      input.addEventListener("blur", () => this.validateField(input))
      input.addEventListener("input", () => this.clearFieldError(input))
    })
  }

  validateField(field) {
    const value = field.value.trim()
    const fieldName = field.name
    let isValid = true
    let errorMessage = ""

    // Remove existing error
    this.clearFieldError(field)

    switch (fieldName) {
      case "name":
        if (!value) {
          errorMessage = "Name is required"
          isValid = false
        } else if (value.length < 2) {
          errorMessage = "Name must be at least 2 characters"
          isValid = false
        }
        break

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!value) {
          errorMessage = "Email is required"
          isValid = false
        } else if (!emailRegex.test(value)) {
          errorMessage = "Please enter a valid email address"
          isValid = false
        }
        break

      case "subject":
        if (!value) {
          errorMessage = "Subject is required"
          isValid = false
        } else if (value.length < 3) {
          errorMessage = "Subject must be at least 3 characters"
          isValid = false
        }
        break

      case "message":
        if (!value) {
          errorMessage = "Message is required"
          isValid = false
        } else if (value.length < 10) {
          errorMessage = "Message must be at least 10 characters"
          isValid = false
        }
        break
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage)
    }

    return isValid
  }

  showFieldError(field, message) {
    const formGroup = field.closest(".form-group")
    formGroup.classList.add("error")

    let errorElement = formGroup.querySelector(".error-message")
    if (!errorElement) {
      errorElement = document.createElement("span")
      errorElement.className = "error-message"
      formGroup.appendChild(errorElement)
    }
    errorElement.textContent = message
  }

  clearFieldError(field) {
    const formGroup = field.closest(".form-group")
    formGroup.classList.remove("error")
    const errorElement = formGroup.querySelector(".error-message")
    if (errorElement) {
      errorElement.remove()
    }
  }

  validateForm() {
    const inputs = contactForm.querySelectorAll("input, textarea")
    let isValid = true

    inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isValid = false
      }
    })

    return isValid
  }

  async handleSubmit(e) {
    e.preventDefault()

    if (!this.validateForm()) {
      this.showFormStatus("error", "Please fix the errors above.")
      return
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
    submitBtn.disabled = true

    try {
      // Use your specific EmailJS service and template IDs
      await window.emailjs.sendForm("service_zeyz70n", "template_4ccp6ah", contactForm)

      this.showFormStatus("success", "Thank you! Your message has been sent successfully. I'll get back to you soon!")
      contactForm.reset()

      // Reset form labels to original position
      document.querySelectorAll(".form-group label").forEach((label) => {
        label.style.top = "15px"
        label.style.fontSize = "1rem"
        label.style.color = "var(--text-secondary)"
      })

      // Reset form groups
      const formGroups = document.querySelectorAll(".form-group")
      formGroups.forEach((group) => {
        group.classList.remove("focused", "has-value")
      })
    } catch (error) {
      console.error("EmailJS Error:", error)
      this.showFormStatus("error", "Oops! Something went wrong. Please try again later or contact me directly.")
    } finally {
      // Reset button state
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }
  }

  showFormStatus(type, message) {
    formStatus.className = `form-status ${type}`
    formStatus.textContent = message
    formStatus.style.display = "block"

    setTimeout(() => {
      formStatus.style.display = "none"
    }, 5000)
  }
}

// Utility Functions
class Utils {
  static setCurrentYear() {
    if (currentYearSpan) {
      currentYearSpan.textContent = new Date().getFullYear()
    }
  }

  static addScrollToTopButton() {
    const scrollToTopBtn = document.createElement("button")
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
    scrollToTopBtn.className = "scroll-to-top"
    scrollToTopBtn.setAttribute("aria-label", "Scroll to top")
    document.body.appendChild(scrollToTopBtn)

    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })

    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        scrollToTopBtn.classList.add("visible")
      } else {
        scrollToTopBtn.classList.remove("visible")
      }
    })
  }

  static handleKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        document.body.classList.add("keyboard-navigation")
      }
    })

    document.addEventListener("mousedown", () => {
      document.body.classList.remove("keyboard-navigation")
    })
  }

  static addLoadingAnimation() {
    window.addEventListener("load", () => {
      document.body.classList.add("loaded")
    })
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize managers
  new ThemeManager()
  new NavigationManager()
  new AnimationsManager()
  new ContactFormManager()

  // Initialize utilities
  Utils.setCurrentYear()
  Utils.addScrollToTopButton()
  Utils.handleKeyboardNavigation()
  Utils.addLoadingAnimation()

  // Add some additional interactive features
  const heroButtons = document.querySelectorAll(".hero-buttons .btn")
  heroButtons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "translateY(-2px)"
    })

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translateY(0)"
    })
  })

  // Add typing effect to hero title (optional enhancement)
  const nameElement = document.querySelector(".hero-title .name")
  if (nameElement) {
    const text = nameElement.textContent
    nameElement.textContent = ""
    let i = 0

    const typeWriter = () => {
      if (i < text.length) {
        nameElement.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 100)
      }
    }

    setTimeout(typeWriter, 1000)
  }

  console.log("Portfolio initialized successfully! 🚀")
})

// Handle page visibility changes
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    document.title = "Come back! - Lemuel Portfolio"
  } else {
    document.title = "Lemuel - Software Engineer Portfolio"
  }
})

// Add some performance optimizations
window.addEventListener("load", () => {
  // Preload critical images
  const criticalImages = ["/placeholder.svg?height=400&width=400"]

  criticalImages.forEach((src) => {
    const img = new Image()
    img.src = src
  })
})
