(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();


class form {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    if (this.form) {
        this.url = this.form.getAttribute("action");
    }
    this.sendForm = this.sendForm.bind(this);
  }

displaySuccess() {
    this.form.innerHTML = this.settings.success;
}

displayError() {
    this.form.innerHTML = this.settings.error;
}

getformObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
        formObject[field.getAttribute("name")] = field.value;
    });
    return formObject;
}

onSubmission(event) {
    event.preventDefault();
    event.target.disabled = true;
    event.target.innerText = "Sending...";
}

async sendForm(event) {
    try {
        this.onSubmission(event);
        await fetch(this.url, {
    
        method: "POST",
        headers: { 
        'Content-Type': 'application/json',
        Accept: "application/json",
    },
    body: "",
    });
    this.displaySuccess();
} catch (error) {
    this.displayError();
    throw new Error(error);
}


}




init () {
    if (this.form) 
        this.formButton.addEventListener("click", this.sendForm);
    return this;
}
  
}

const formSubmit = new formSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "<h1 class= 'success'>Message sent!</h1>",
    error: "<h1 class= 'error'>Something went wrong!</h1>",
})