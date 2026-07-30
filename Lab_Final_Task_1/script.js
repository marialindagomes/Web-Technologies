const orderForm = document.getElementById("orderForm");

orderForm.addEventListener("submit", function (event) {

    event.preventDefault();

    clearErrors();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const studentId = document.getElementById("studentId").value.trim();

    const gender = document.querySelector(
        'input[name="gender"]:checked'
    );

    const department =
        document.getElementById("department").value;

    const quantity =
        parseInt(document.getElementById("quantity").value);

    const instructions =
        document.getElementById("instructions").value.trim();


    let isValid = true;

    if (name === "") {

        document.getElementById("nameError").textContent =
            "Name cannot be empty.";

        isValid = false;
    }

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {

        document.getElementById("emailError").textContent =
            "Email cannot be empty.";

        isValid = false;

    } else if (!emailPattern.test(email)) {

        document.getElementById("emailError").textContent =
            "Please enter a valid email address.";

        isValid = false;
    }

    if (phone === "") {

        document.getElementById("phoneError").textContent =
            "Phone number cannot be empty.";

        isValid = false;
    }

    if (studentId === "") {

        document.getElementById("studentIdError").textContent =
            "Student ID cannot be empty.";

        isValid = false;
    }

    if (!gender) {

        document.getElementById("genderError").textContent =
            "Please select your gender.";

        isValid = false;
    }

    if (department === "") {

        document.getElementById("departmentError").textContent =
            "Please select your department.";

        isValid = false;
    }

    const selectedFoods = document.querySelectorAll(
        'input[name="food"]:checked'
    );
    if (selectedFoods.length === 0) {

        document.getElementById("foodError").textContent =
            "Please select at least one food item.";

        isValid = false;
    }

    if (isNaN(quantity) || quantity <= 0) {

        document.getElementById("quantityError").textContent =
            "Quantity must be greater than 0.";

        isValid = false;
    }

    if (!isValid) {
        return;
    }

    let totalPrice = 0;

    let selectedItemsHTML = "<ul>";


    selectedFoods.forEach(function (food) {

        const foodName = food.value;
        const foodPrice = parseFloat(food.dataset.price);

        totalPrice += foodPrice;

        selectedItemsHTML +=
            `<li>${foodName} - $${foodPrice}</li>`;
    });


    selectedItemsHTML += "</ul>";

    const totalBill = totalPrice * quantity;

    const result = document.getElementById("result");
    const resultContent = document.getElementById("resultContent");


    resultContent.innerHTML = `
    <p class="success">Order placed successfully!</p>

    <p>
        <strong>Customer Name:</strong>
        ${name}
    </p>

    <p>
        <strong>Student ID:</strong>
        ${studentId}
    </p>

    <p>
        <strong>Department:</strong>
        ${department}
    </p>

    <p>
        <strong>Selected Items:</strong>
    </p>

    ${selectedItemsHTML}

    <p>
        <strong>Quantity:</strong>
        ${quantity}
    </p>

    <p class="total">
        Total Bill: $${totalBill}
    </p>
`;



    result.classList.remove("hidden");



    result.scrollIntoView({
        behavior: "smooth"
    });

});



function clearErrors() {

    document.getElementById("nameError").textContent = "";

    document.getElementById("emailError").textContent = "";

    document.getElementById("phoneError").textContent = "";

    document.getElementById("studentIdError").textContent = "";

    document.getElementById("genderError").textContent = "";

    document.getElementById("departmentError").textContent = "";

    document.getElementById("foodError").textContent = "";

    document.getElementById("quantityError").textContent = "";
}