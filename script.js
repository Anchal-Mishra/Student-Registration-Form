document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');
    const studentTable = document.getElementById('studentTable').querySelector('tbody');

    // Arrays to store student data
    let studentNames = [];
    let studentIDs = [];
    let emails = [];
    let contacts = [];
    let genders = [];

    // Load data from localStorage
    loadStudentData();

    studentForm.addEventListener('submit', function () {

        const studentName = document.getElementById('name').value.trim();
        const studentID = document.getElementById('studentID').value.trim();
        const email = document.getElementById('email').value.trim();
        const contact = document.getElementById('contact').value.trim();
        const gender = document.querySelector('input[name="gender"]:checked');

        if (verifyInputs(studentName, studentID, email, contact, gender)) {
            addStudent(studentName, studentID, email, contact, gender.value);
            studentForm.reset();
        }
    });

    function verifyInputs(name, id, email, contact, gender) {
        const namePattern = /^[A-Za-z\s]+$/;
        const idPattern = /^[0-9]+$/;
        const contactPattern = /^[0-9]{10}$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!gender) {
            alert('Please select a gender.');
            return false;
        }

        if (!namePattern.test(name) || !idPattern.test(id) || !emailPattern.test(email) || !contactPattern.test(contact)) {
            alert('Please enter valid data.');
            return false;
        }

        return true;
    }

    function addStudent(name, id, email, contact, gender) {
        
        studentNames.push(name);
        studentIDs.push(id);
        emails.push(email);
        contacts.push(contact);
        genders.push(gender);
      
        saveToLocalStorage();   

        updateTable();
    }

    function updateTable() {
        studentTable.innerHTML = '';

        for (let i = 0; i < studentNames.length; i++) {
            const row = studentTable.insertRow();
            row.innerHTML = `
                <td>${studentNames[i]}</td>
                <td>${studentIDs[i]}</td>
                <td>${emails[i]}</td>
                <td>${contacts[i]}</td>
                <td>${genders[i]}</td>
                <td>
                    <button onclick="editStudent(${i})">Edit</button>
                    <button onclick="deleteStudent(${i})">Delete</button>
                </td>
            `;
        }
    }

    window.editStudent = function (input) {                 // fill the form to edit the data 
        
        document.getElementById('name').value = studentNames[input];
        document.getElementById('studentID').value = studentIDs[input];
        document.getElementById('email').value = emails[input];
        document.getElementById('contact').value = contacts[input];
        document.querySelector(`input[name="gender"][value="${genders[input]}"]`).checked = true;

       
        deleteStudent(input);                               // remove the student record
    };

    window.deleteStudent = function (input) {               // remove student data from each array
        
        studentNames.splice(input, 1);
        studentIDs.splice(input, 1);
        emails.splice(input, 1);
        contacts.splice(input, 1);
        genders.splice(input, 1);

        saveToLocalStorage();

        updateTable();
    };

    function saveToLocalStorage() {                          // save each array to localStorage
        
        localStorage.setItem('studentNames', studentNames.join(','));
        localStorage.setItem('studentIDs', studentIDs.join(','));
        localStorage.setItem('emails', emails.join(','));
        localStorage.setItem('contacts', contacts.join(','));
        localStorage.setItem('genders', genders.join(','));
    }

    function loadStudentData() {                             // load data from localStorage and split into arrays
    
        if (localStorage.getItem('studentNames')) {
            studentNames = localStorage.getItem('studentNames').split(',');
            studentIDs = localStorage.getItem('studentIDs').split(',');
            emails = localStorage.getItem('emails').split(',');
            contacts = localStorage.getItem('contacts').split(',');
            genders = localStorage.getItem('genders').split(',');
        }
        updateTable();
    }
});
