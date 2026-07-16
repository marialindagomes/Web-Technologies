const form = document.getElementById("appointmentForm");

let passwordAttempts = 0;
let isLocked = false;

form.addEventListener("submit", function (event) {

    event.preventDefault();

    clearErrors();

    if (isLocked) {
        document.getElementById("passwordError").innerHTML =
            "Password is locked. Try again after 1 minute.";
        return;
    }

    let fname = document.getElementById("fname");
    let lname = document.getElementById("lname");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirmPassword");
    let department = document.getElementById("department");
    let description = document.getElementById("description");

    let gender = document.querySelector('input[name="gender"]:checked');
    let services = document.querySelectorAll('input[name="service"]:checked');

    let valid = true;

    let namePattern = /^[A-Za-z]+$/;
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (fname.value.trim() == "") {

        showError(fname, "fnameError", "First name is required.");
        valid = false;

    }
    else if (!namePattern.test(fname.value.trim())) {

        showError(fname, "fnameError", "Only alphabets are allowed.");
        valid = false;

    }
    else {

        showSuccess(fname);

    }

    if (lname.value.trim() == "") {

        showError(lname, "lnameError", "Last name is required.");
        valid = false;

    }
    else if (!namePattern.test(lname.value.trim())) {

        showError(lname, "lnameError", "Only alphabets are allowed.");
        valid = false;

    }
    else {

        showSuccess(lname);

    }

    if (email.value.trim() == "") {

        showError(email, "emailError", "Email is required.");
        valid = false;

    }
    else if (!emailPattern.test(email.value.trim())) {

        showError(email, "emailError", "Invalid email address.");
        valid = false;

    }
    else {

        showSuccess(email);

    }

    if (password.value == "") {

        showError(password, "passwordError", "Password is required.");
        valid = false;

    }

    if (confirmPassword.value == "") {

        showError(confirmPassword, "confirmError", "Confirm password is required.");
        valid = false;

    }
    else if (password.value != confirmPassword.value) {

        passwordAttempts++;

        showError(
            confirmPassword,
            "confirmError",
            "Password doesn't match! Attempt " + passwordAttempts + " of 3."
        );

        valid = false;

        if (passwordAttempts >= 3) {

            isLocked = true;

            document.getElementById("passwordError").innerHTML =
                "Too many wrong attempts. Password locked for 1 minute.";

            password.disabled = true;
            confirmPassword.disabled = true;

            setTimeout(function () {

                isLocked = false;
                passwordAttempts = 0;

                password.disabled = false;
                confirmPassword.disabled = false;

                document.getElementById("passwordError").innerHTML =
                    "Password unlocked. Try again.";

            }, 60000);

        }

    }
    else {

        passwordAttempts = 0;
        showSuccess(password);
        showSuccess(confirmPassword);

    }
    if (gender == null) {

        document.getElementById("genderError").innerHTML =
            "Please select your gender.";

        valid = false;

    }

    if (services.length == 0) {

        document.getElementById("serviceError").innerHTML =
            "Select at least one service.";

        valid = false;

    }

    if (department.value == "") {

        showError(
            department,
            "departmentError",
            "Please select a department."
        );

        valid = false;

    }
    else {

        showSuccess(department);

    }

    if (description.value.trim() == "") {

        showError(
            description,
            "descriptionError",
            "Description is required."
        );

        valid = false;

    }
    else if (description.value.trim().length < 20) {

        showError(
            description,
            "descriptionError",
            "Description must be at least 20 characters."
        );

        valid = false;

    }
    else {

        showSuccess(description);

    }

    if (valid) {

        document.getElementById("successMessage").innerHTML =
            "Appointment Registration Completed Successfully!";

        form.reset();

        clearErrors();

    }

});

function showError(input, errorId, message) {

    input.classList.add("errorBorder");
    input.classList.remove("successBorder");

    document.getElementById(errorId).innerHTML = message;

}

function showSuccess(input) {

    input.classList.remove("errorBorder");
    input.classList.add("successBorder");

}

function clearErrors() {

    let errors = document.querySelectorAll(".error");

    errors.forEach(function (item) {

        item.innerHTML = "";

    });

    let fields = document.querySelectorAll("input, select, textarea");

    fields.forEach(function (field) {

        field.classList.remove("errorBorder");
        field.classList.remove("successBorder");

    });

    document.getElementById("successMessage").innerHTML = "";

}