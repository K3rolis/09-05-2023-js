const form = document.getElementById('form-container');
const studentList = document.getElementById('student-list');
const itRatingValue = document.querySelector('#it-rating-value');
// Validation items
const nameEl = document.getElementById('name');
const lastNameEl = document.getElementById('last-name');
const ageEl = document.getElementById('age');
const phoneEl = document.getElementById('phone');
const emailEl = document.getElementById('email');
const itRatingEl = document.getElementById('range-wrapper');
const groupEl = document.querySelector('[name="group"]');

const students = [
  {
    name: 'Zena',
    lastName: 'Erickson',
    age: '18',
    phone: '861234567',
    email: 'zenaer@gmail.com',
    itRating: '80',
    group: 'FEU 5',
    interests: ['PHP', 'Javascript'],
  },
  {
    name: 'Sydney',
    lastName: 'Ratliff',
    age: '24',
    phone: '861234567',
    email: 'xisyx@mailinator.com',
    itRating: '90',
    group: 'FEU 4',
    interests: ['Javascript'],
  },
  {
    name: 'Trevor',
    lastName: 'Mcknight',
    age: '22',
    phone: '861234567',
    email: 'qepov@mailinator.com',
    itRating: '20',
    group: 'FEU 7',
    interests: ['PHP', 'Javascript', 'C#'],
  },
];

itRatingValue.textContent = itRatingEl.value;
const hiddenData = true;

function createStudentItem() {
  let div = document.createElement('div');
  div.setAttribute('class', 'student-item');
  studentList.prepend(div);
}

function replaceSymbols(fieldName) {
  let stars = '';
  for (let i = 0; i < fieldName.length; i++) {
    stars += '*';
  }
  return stars;
}

function checkValidation() {
  const requiredEl = form.querySelectorAll('.required');
  const allInputs = form.querySelectorAll('input');
  let isValid = true;

  allInputs.forEach((item) => {
    let spanEl = item.parentNode.querySelector('.error-msg');
    item.classList.remove('error-input');
    if (spanEl) {
      spanEl.textContent = '';
    }
  });

  function getErrorMessage(element, errorMessage) {
    const errorEl = element.parentNode.querySelector('.error-msg');
    element.classList.add('error-input');
    errorEl.textContent = errorMessage;
    return (isValid = false);
  }

  requiredEl.forEach((item) => {
    if (!item.value) {
      let spanEl = item.parentNode.querySelector('.error-msg');
      item.classList.add('error-input');
      spanEl.textContent = 'Field required';
      isValid = false;
    } else {
      let length = item.textLength;

      if (item.id == 'name') {
        if (length < 3) {
          getErrorMessage(item, 'Vardas privalo būti bent 3 simbolių ilgumo');
          return;
        }
      }

      if (item.id == 'last-name') {
        if (length < 3) {
          getErrorMessage(item, 'Pavardė privalo būti bent 3 simbolių ilgumo');
          return;
        }
      }

      if (item.id == 'age') {
        // Given string contains only numbers
        const regex = /^\d+$/;
        if (!regex.test(item.value)) {
          getErrorMessage(item, 'Amžius gali būti tik sveikasis skaičius.');
          return;
        } else {
          let ageInt = Number(item.value);
          if (ageInt < 0) {
            getErrorMessage(item, 'Amžius privalo būti teigiamas skaičius');
            return;
          } else if (ageInt > 120) {
            getErrorMessage(item, 'Įvestas amžius yra per didelis');
            return;
          }
        }
      }

      if (item.id == 'phone') {
        if (length != 0 && (length < 9 || length > 12)) {
          getErrorMessage(item, 'Įvestas telefono numeris yra neteisingas');
          return;
        }
      }

      if (item.id == 'email') {
        if (length < 8 || !item.value.includes('@') || !item.value.includes('.')) {
          getErrorMessage(item, 'Įvestas elektroninis paštas yra neteisingas');
        }
      }
    }
  });

  if (!isValid) {
    createAlert('red', 'Please fill out all fields');
    return false;
  } else {
    return true;
  }
}

function displayStudentData(student) {
  const divEl = studentList.querySelector('div');

  if (!checkValidation()) {
    return;
  }

  createStudentItem();

  let ul = document.createElement('ul');
  divEl.append(ul);

  let studentData = Object.values(student);
  studentData.map((item) => {
    let li = document.createElement('li');
    if (item.length > 2) {
      li.textContent = `${item[0]}: ${item[2]} `;
    } else {
      li.textContent = `${item[0]}: ${item[1]} `;
    }
    ul.appendChild(li);
  });
}

function createAlert(color, text) {
  let checkAlert = document.getElementById('alert');
  if (!checkAlert) {
    let alert = document.createElement('span');
    alert.setAttribute('id', 'alert');
    alert.style.color = color;
    alert.textContent = text;
    studentList.prepend(alert);
    setTimeout(() => {
      alert.remove();
    }, 5000);
  } else {
    studentList.prepend(checkAlert);
    checkAlert.textContent = text;
    checkAlert.style.color = color;
  }
}
function getInterests(e) {
  let temp = [];
  const form = e.target;
  for (let i = 0; form.language.length > i; i++) {
    if (form.language[i].checked) {
      temp.push(form.language[i].value);
    }
  }

  let interests = temp.join(', ');
  return interests;
}

function createData(e) {
  let name = form.name.value;
  let lastName = form['last-name'].value;
  let age = form.age.value;
  let phone = form.phone.value;
  let email = form.email.value;
  let itRating = form['it-rating'].value;
  let group = form.group.value;
  let interests = getInterests(e);
  return { name, lastName, age, phone, email, group, itRating, interests };
}

function createStudentData(data) {
  let object = data;
  let hiddenData = true;

  let divEl = studentList.querySelector('div');
  let list = document.createElement('ul');
  divEl.append(list);

  let firstName = document.createElement('li');
  firstName.textContent = 'Name: ' + object.name;

  let lastName = document.createElement('li');
  lastName.textContent = 'Last name: ' + object.lastName;

  let age = document.createElement('li');
  age.textContent = 'Age: ' + object.age;

  let phone = document.createElement('li');
  phone.textContent = 'Phone: ' + replaceSymbols(object.phone);

  let email = document.createElement('li');
  email.textContent = 'Email: ' + replaceSymbols(object.email);

  let itRating = document.createElement('li');
  itRating.textContent = 'It knowledge: ' + object.itRating;

  let group = document.createElement('li');
  group.textContent = 'Group: ' + object.group;

  let interests = document.createElement('li');
  interests.textContent = 'Interests: ' + object.interests;

  list.append(firstName, lastName, age, phone, email, itRating, group, interests);

  const buttonEl = document.createElement('button');
  let btnTextHide = 'Hide Personal Data';
  let btnTextShow = 'Show Personal Data';
  buttonEl.textContent = btnTextShow;

  buttonEl.addEventListener('click', () => {
    hiddenData = !hiddenData;
    if (hiddenData) {
      phone.textContent = 'Phone: ' + object.phone;
      email.textContent = 'Email: ' + object.email;
      buttonEl.textContent = btnTextHide;
    } else {
      phone.textContent = 'Phone: ' + replaceSymbols(object.phone);
      email.textContent = 'Email: ' + replaceSymbols(object.email);
      buttonEl.textContent = btnTextShow;
    }
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete Student';
  list.append(buttonEl, deleteBtn);

  deleteBtn.addEventListener('click', (e) => {
    let deletedMessage = `Student Deleted (${object.name} ${object.lastName})`;
    createAlert('red', deletedMessage);
    e.target.parentNode.remove();
  });
}

function successAlert(name, lastName) {
  let createdMessage = `New Student Created Successfully (${name} ${lastName})`;
  createAlert('green', createdMessage);
}

function setBubble(range, bubble) {
  const value = range.value;
  const min = range.min || 0;
  const max = range.max || 100;
  const offset = Number(((value - min) * 100) / (max - min));
  bubble.textContent = value;
  bubble.style.left = `calc(${offset}% + (${8 - offset * 0.15}px))`;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!checkValidation()) {
    return;
  }
  createStudentItem();
  createStudentData(createData(e));
  successAlert(createData(e).name, createData(e).lastName);
});

function displayStudents(data) {
  data.forEach((item) => {
    createStudentItem();
    createStudentData(item);
  });
}

const range = itRatingEl.querySelector('.range');
const bubble = itRatingEl.querySelector('.bubble');

range.addEventListener('input', () => {
  setBubble(range, bubble);
});
setBubble(range, bubble);

displayStudents(students);
