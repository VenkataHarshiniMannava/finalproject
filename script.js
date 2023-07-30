document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("userForm");
    const userDetailsDiv = document.getElementById("userDetails");
    const users = JSON.parse(localStorage.getItem("users")) || [];

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;

        if (name && email && phone) {
            const userDetails = {
                name: name,
                email: email,
                phone: phone,
            };

            // Check if the user email already exists
            const existingUserIndex = users.findIndex(user => user.email === email);
            if (existingUserIndex !== -1) {
                // Update existing user details
                users[existingUserIndex] = userDetails;
            } else {
                // Add new user details
                users.push(userDetails);
            }

            // Save user details to local storage
            localStorage.setItem("users", JSON.stringify(users));

            // Reset form fields
            form.reset();

            // Display user details
            displayUserDetails();
        }
    });

    function displayUserDetails() {
        userDetailsDiv.innerHTML = "";

        if (users.length > 0) {
            users.forEach((user, index) => {
                userDetailsDiv.innerHTML += `
                    <div>
                        <p><strong>Name:</strong> ${user.name}</p>
                        <p><strong>Email:</strong> ${user.email}</p>
                        <p><strong>Phone:</strong> ${user.phone}</p>
                        <button class="editButton" data-index="${index}">Edit</button>
                        <button class="deleteButton" data-index="${index}">Delete</button>
                        <hr>
                    </div>
                `;
            });

            const editButtons = document.querySelectorAll(".editButton");
            editButtons.forEach(button => {
                button.addEventListener("click", function() {
                    const index = this.dataset.index;
                    const user = users[index];
                    document.getElementById("name").value = user.name;
                    document.getElementById("email").value = user.email;
                    document.getElementById("phone").value = user.phone;
                });
            });

            const deleteButtons = document.querySelectorAll(".deleteButton");
            deleteButtons.forEach(button => {
                button.addEventListener("click", function() {
                    const index = this.dataset.index;
                    users.splice(index, 1);
                    localStorage.setItem("users", JSON.stringify(users));
                    displayUserDetails();
                });
            });
        }
    }

    // Display the user details if available in local storage
    displayUserDetails();
});
