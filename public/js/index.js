//Create a new date object and store it in a variable named
const today = new Date(); 

//Retrieve the current year from your date object and store it in a variable named thisYear 
// add copyright to footer
const thisYear = new Date().getFullYear();
const footer = document.querySelector("footer");
const copyright = document.createElement("p");
copyright.innerHTML = `Diana ${thisYear}`;
footer.appendChild(copyright);

// apped array of skills to DOM Ul list
const skills = [
  "Python", 
  "Github",
  "JavaScript"
];

const skillsSection = document.getElementById("skills");
const skillsList = skillsSection.querySelector("ul");

for (let index = 0; index < skills.length; index++) {
  const element = skills[index];
  const skill = document.createElement("li");
  skill.innerText = element;
  skillsList.appendChild(skill);
}

const heading1 = document.getElementById("about");
const image = document.querySelector("img");

// When css animation ends, remove a class from image
image.addEventListener('animationend', () =>{
  image.classList.remove("animate");
  console.log('end');
});

// when we click heading attach class with animation to image
heading1.addEventListener('click', event =>{ 
  console.log(image.classList);
  image.classList.add("animate");
}); 


/**
 * When we hit the remove button to remove entry.
 * @param {Object} event the callback event
 */
const onClickRemoveEntry = (event) => {
  const entry = event.target.parentNode;
  entry.remove();

  const messageSection = document.getElementById("messages");
  const messageList = messageSection.querySelector("ul");
  const items = messageList.querySelectorAll("li");
  if (items.length === 0) {
    messageSection.classList.add("hide");
  }
};

/**
 * Take dom element, search for child forms, remove them.
 * @param {Object} container Dom elment
 */
const removeForm = (container) => {
  // remove any existing forms first
  const forms = container.querySelectorAll('form');
  for (let index = 0; index < forms.length; index++) {
    const currentForm = forms[index];
    currentForm.remove();
  }
}

/**
 * Remove edit form for entry
 * @param {Object} event the callback event
 */
const onClickCloseEntryForm = (event) => {
  const buttonParent = event.target.parentNode;
  buttonParent.remove();
}

/**
 * After editing entry, update values for entry.
 * @param {Object} event the callback event
 */
const onClickUpdateEntryForm = (event) => {
  const buttonParent = event.target.parentNode;
  // get inputs on form
  let text = buttonParent.querySelector("[name='name']");
  let email = buttonParent.querySelector("[name='email']");
  let messageInput = buttonParent.querySelector("[name='message']");

  // get current form values
  text = text.value;
  email = email.value;
  messageInput = messageInput.value;

  const formParent = buttonParent.parentNode;
  const link = formParent.querySelector('a');
  const span = formParent.querySelector('span');

  link.setAttribute('href', `mailto:${email}`);
  link.innerHTML = text;

  span.innerHTML = `wrote: ${messageInput}`;
}

/**
 * When we hit edit button on existing entry append new edit form for that entry.
 * Allow to udate form.
 * @param {Object} event the callback event
 */
const onClickEditEntry = (event) => {
  const element = event.target;
  const elementParent = element.parentNode;
  removeForm(elementParent);

  // add close button
  const closeFormButton = document.createElement("button");
  closeFormButton.innerText = "Close";
  closeFormButton.setAttribute("type", "button");
  closeFormButton.addEventListener('click', onClickCloseEntryForm);

  // add update button
  const updateFormButton = document.createElement("button");
  updateFormButton.innerText = "Update";
  updateFormButton.setAttribute("type", "button");
  updateFormButton.addEventListener('click', onClickUpdateEntryForm);

  const id = Date.now();
  const form = document.createElement("form");
  form.innerHTML = `
    <label for="text-${id}">Enter text</label>
    <br/>
    <input type="text" name="name" id="text-${id}" required=true />
    <br/>
    <label for="email-${id}">Input e-mail</label>
    <br/>
    <input type="email" name="email" id="email-${id}" required=true />
    <br/>
    <label for="message-${id}">Leave a message</label>
    <br/>
    <textarea name="message" id="message-${id}" required=true></textarea>
    <br/>
  `;
  form.appendChild(closeFormButton);
  form.appendChild(updateFormButton);

  elementParent.appendChild(form);
};

/**
 * When we submit the form add new item.
 * @param {Object} event the callback event
 */
const onFormSubmit = (event) => {
  event.preventDefault();

  // get inputs on form
  let text = event.target.querySelector("#text");
  let email = event.target.querySelector("#email");
  let messageInput = event.target.querySelector("#message");

  // get current form values
  text = text.value;
  email = email.value;
  messageInput = messageInput.value;

  // add remove button
  const removeButton = document.createElement("button");
  removeButton.innerText = "remove";
  removeButton.setAttribute("type", "button");
  removeButton.addEventListener('click', onClickRemoveEntry);

  // add edit button
  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.setAttribute("type", "button");
  editButton.addEventListener('click', onClickEditEntry);
  
  // create item
  const newMessage = document.createElement("li");
  newMessage.innerHTML = `<a href="mailto:${email}">${text}</a> <span>wrote: ${messageInput}</span>`;
  newMessage.appendChild(removeButton);
  newMessage.appendChild(editButton);

  // add item to lis
  const messageSection = document.getElementById("messages");
  const messageList = messageSection.querySelector("ul");
  messageList.appendChild(newMessage);

  // when we add a new item remove hide class
  messageSection.classList.remove("hide"); 

  // clear our form
  event.target.reset();
};

const messageForm = document.querySelector('[name="leave_message"]');
messageForm.addEventListener('submit', onFormSubmit);