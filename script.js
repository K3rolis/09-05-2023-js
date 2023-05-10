const form = document.getElementById('form-container');
const studentList = document.getElementById('student-list');
const itRatingEl = document.querySelector('#it-rating');
const itRatingValue = document.querySelector('#it-rating-value');

itRatingValue.textContent = itRatingEl.value;

let hiddenData = true;

function createStudentItem() {
  let div = document.createElement('div');
  div.setAttribute('class', 'student-item');
  studentList.prepend(div);
}

function getStudentData() {
  let languages = [];
  for (let i = 0; form.language.length > i; i++) {
    if (form.language[i].checked) {
      languages.push(form.language[i].value);
    }
  }

  let modifiedLanguages = languages.join(', ');

  const student = {
    name: ['Name', form.name.value],
    lastName: ['Last Name', form.lastName.value],
    age: ['Age', form.age.value],
    phone: ['Phone', form.phone.value, replaceSymbols(form.phone.value.length)],
    email: ['Email', form.email.value, replaceSymbols(form.email.value.length)],
    itRating: ['IT Knowledge / Rating', form['it-rating'].value],
    group: ['Group', form.group.value],
    programmingLanguages: ['Selected languages', modifiedLanguages],
  };

  return student;
}

function checkValidation() {
  let requiredEl = form.querySelectorAll('.required');

  let count = 0;
  requiredEl.forEach((item) => {
    if (item.nextElementSibling) {
      item.nextElementSibling.remove();
      item.style.border = '1px solid black';
    }
    if (!item.value) {
      let createEl = document.createElement('span');
      item.style.border = '1px solid red';
      item.parentNode.append(createEl);
      createEl.textContent = 'Field required';
      createEl.style.color = 'red';
      count++;
    }
  });

  if (count !== 0) {
    createAlert('red', 'Please fill out all fields');
    return false;
  } else {
    return true;
  }
}

function displayStudentData(student) {
  const divEl = studentList.querySelector('div');
  let ul = document.createElement('ul');
  divEl.append(ul);

  if (!checkValidation()) {
    return;
  }

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

  let createdMessage = `New Student Created Successfully (${student.name[1]} ${student.lastName[1]})`;
  createAlert('green', createdMessage);

  const buttonEl = document.createElement('button');
  let btnTextHide = 'Hide Personal Data';
  let btnTextShow = 'Show Personal Data';
  buttonEl.textContent = btnTextShow;
  ul.append(buttonEl);

  buttonEl.addEventListener('click', () => {
    let liElements = buttonEl.parentNode.querySelectorAll('li');
    if (hiddenData) {
      studentData.map((item, i) => {
        liElements[i].textContent = `${item[0]}: ${item[1]} `;
      });
      buttonEl.textContent = btnTextHide;
      hiddenData = false;
    } else {
      studentData.map((item, i) => {
        if (item.length > 2) {
          liElements[i].textContent = `${item[0]}: ${item[2]} `;
        }
      });
      buttonEl.textContent = btnTextShow;
      hiddenData = true;
    }
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete Student';
  ul.append(deleteBtn);

  deleteBtn.addEventListener('click', (e) => {
    let deletedMessage = `Student Deleted (${student.name[1]} ${student.lastName[1]})`;
    createAlert('red', deletedMessage);
    e.target.parentNode.remove();
  });
}

function createAlert(color, text) {
  let alert = document.createElement('span');
  alert.style.color = color;
  alert.textContent = text;
  studentList.prepend(alert);

  setTimeout(() => {
    alert.remove();
  }, 5000);
}

function replaceSymbols(fieldName) {
  let stars = '';
  for (let i = 0; fieldName > i; i++) {
    stars += '*';
  }
  return stars;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  createStudentItem();
  displayStudentData(getStudentData());
  // form.reset();
});

itRatingEl.addEventListener('input', (e) => {
  itRatingValue.textContent = e.target.value;
});
