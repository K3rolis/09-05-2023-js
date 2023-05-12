const form = document.getElementById('form-container');
const studentList = document.getElementById('student-list');
const itRatingValue = document.querySelector('#it-rating-value');
const submitEl = form.querySelector('[type="submit"]');

// Validation items
const nameEl = document.getElementById('name');
const lastNameEl = document.getElementById('last-name');
const ageEl = document.getElementById('age');
const phoneEl = document.getElementById('phone');
const emailEl = document.getElementById('email');
const itRatingEl = document.getElementById('range-wrapper');
const groupEl = document.querySelector('[name="group"]');

const range = itRatingEl.querySelector('.range');
const bubble = itRatingEl.querySelector('.bubble');

itRatingValue.textContent = itRatingEl.value;
const hiddenData = true;

let editBtnId = 0;
let deleteBtnId = 0;
let showInfoId = 0;

const students = [
  {
    name: 'Zena',
    lastName: 'Erickson',
    age: '18',
    phone: '861234567',
    email: 'zenaer@gmail.com',
    itRating: '80',
    group: 'FEU 5',
    interests: ['PHP', 'JavaScript'],
  },
  {
    name: 'Sydney',
    lastName: 'Ratliff',
    age: '24',
    phone: '861234567',
    email: 'xisyx@mailinator.com',
    itRating: '90',
    group: 'FEU 4',
    interests: ['JavaScript'],
  },
  {
    name: 'Trevor',
    lastName: 'Mcknight',
    age: '22',
    phone: '861234567',
    email: 'qepov@mailinator.com',
    itRating: '20',
    group: 'FEU 7',
    interests: ['PHP', 'JavaScript', 'C#'],
  },
];

function replaceSymbols(fieldName) {
  let stars = '';
  for (let i = 0; i < fieldName.length; i++) {
    stars += '*';
  }
  return stars;
}

function checkValidation() {
  // const requiredEl = form.querySelectorAll('.required');
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

  allInputs.forEach((item) => {
    if (!item.value && !item.id == 'phone') {
      let spanEl = item.parentNode.querySelector('.error-msg');
      item.classList.add('error-input');
      spanEl.textContent = 'Field required';
      isValid = false;
    } else {
      let length = item.textLength;

      if (item.id == 'name') {
        if (length < 3) {
          getErrorMessage(item, 'Vardas privalo būti bent 3 simbolių ilgumo');
        }
        return;
      }

      if (item.id == 'last-name') {
        if (length < 3) {
          getErrorMessage(item, 'Pavardė privalo būti bent 3 simbolių ilgumo');
        }
        return;
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
          }
          return;
        }
      }

      if (item.id == 'phone') {
        if (length != 0 && (length < 9 || length > 12)) {
          getErrorMessage(item, 'Įvestas telefono numeris yra neteisingas');
        }
        return;
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

function alertTimeout(element) {
  setTimeout(() => {
    element.remove();
  }, 5000);
}

function createAlert(color, text) {
  let checkAlert = document.getElementById('alert');
  if (!checkAlert) {
    let alert = document.createElement('span');
    alert.setAttribute('id', 'alert');
    alert.style.color = color;
    alert.textContent = text;
    form.append(alert);
    alertTimeout(alert);
  } else {
    checkAlert.textContent = text;
    checkAlert.style.color = color;
    alertTimeout(checkAlert);
  }
}

function getInterests() {
  let temp = [];
  for (let i = 0; form.language.length > i; i++) {
    if (form.language[i].checked) {
      temp.push(form.language[i].value);
    }
  }

  let interests = temp.join(', ');
  return interests;
}

function formData() {
  let name = form.name.value;
  let lastName = form['last-name'].value;
  let age = form.age.value;
  let phone = form.phone.value;
  let email = form.email.value;
  let itRating = form['it-rating'].value;
  let group = form.group.value;
  let interests = getInterests();
  return { name, lastName, age, phone, email, group, itRating, interests };
}

function createStudentData(data) {
  let object = data;
  let hiddenData = true;

  let listEl = document.getElementById('student-list');
  let studentItem = document.createElement('div');
  studentItem.classList.add('student-item');
  listEl.prepend(studentItem);

  let list = document.createElement('ul');
  studentItem.appendChild(list);

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

  const personalDataEl = document.createElement('button');
  let btnTextHide = 'Hide Personal Data';
  let btnTextShow = 'Show Personal Data';
  personalDataEl.textContent = btnTextShow;

  personalDataEl.addEventListener('click', () => {
    hiddenData = !hiddenData;
    if (hiddenData) {
      phone.textContent = 'Phone: ' + object.phone;
      email.textContent = 'Email: ' + object.email;
      personalDataEl.textContent = btnTextHide;
    } else {
      phone.textContent = 'Phone: ' + replaceSymbols(object.phone);
      email.textContent = 'Email: ' + replaceSymbols(object.email);
      personalDataEl.textContent = btnTextShow;
    }
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete Student';

  deleteBtn.addEventListener('click', () => {
    let deletedMessage = `Student Deleted (${object.name} ${object.lastName})`;
    createAlert('red', deletedMessage);
    studentItem.remove();
  });

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';

  editBtn.addEventListener('click', () => {
    let object = data;
    submitEl.classList.add('edit');
    submitEl.textContent = 'Save Changes';
    form.name.value = object.name;
    form['last-name'].value = object.lastName;
    form.age.value = object.age;
    form.phone.value = object.phone;
    form.email.value = object.email;
    form['it-rating'].value = object.itRating;
    form.group.value = object.group;
    form.language.forEach((item) => {
      if (object.interests.includes(item.value)) {
        item.setAttribute('checked', 'true');
      } else {
        item.removeAttribute('checked');
      }
    });

    form.addEventListener('submit', () => {
      if (!checkValidation()) {
        return;
      }
      let object = formData();
      firstName.textContent = 'Name: ' + object.name;
      lastName.textContent = 'Last name: ' + object.lastName;
      age.textContent = 'Age: ' + object.age;
      phone.textContent = 'Phone: ' + replaceSymbols(object.phone);
      email.textContent = 'Email: ' + replaceSymbols(object.email);
      itRating.textContent = 'It knowledge: ' + object.itRating;
      group.textContent = 'Group: ' + object.group;
      interests.textContent = 'Interests: ' + object.interests;
      submitEl.textContent = 'Submit';
      submitEl.classList.remove('edit');
    });

    setBubble(range, bubble);
  });

  list.append(firstName, lastName, age, phone, email, itRating, group, interests, personalDataEl, deleteBtn, editBtn);
}

function setBubble(range, bubble) {
  const value = range.value;
  const min = range.min || 0;
  const max = range.max || 100;
  const offset = Number(((value - min) * 100) / (max - min));
  bubble.textContent = value;
  bubble.style.left = `calc(${offset}% + (${8 - offset * 0.15}px))`;
}

function displayStudents(data) {
  data.forEach((item) => {
    createStudentData(item);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!checkValidation()) {
    return;
  }
  if (submitEl.classList.contains('edit')) {
    return;
  } else {
    createStudentData(formData());
    let message = `New Student Created Successfully (${formData().name} ${formData().lastName})`;
    createAlert('green', message);
  }
});

range.addEventListener('input', () => {
  setBubble(range, bubble);
});

setBubble(range, bubble);
displayStudents(students);
