//Selecting the 'name' input field and giving it a focus state by default
const nameInput = document.getElementById('name');
nameInput.focus();

//Selecting the 'Other job role' element and hiding it by default
const otherJobs = document.getElementById('other-job-role');
otherJobs.style.display = 'none';


const jobRoles = document.getElementById('title');
const colorSelection = document.getElementById('color');
const design = document.getElementById('design');
const colorOptions = colorSelection.children;

//The 'Color' menu is disabled by default
colorSelection.disabled = true;


const registerActivities = document.getElementById('activities');
const totalCost = document.getElementById('activities-cost');

//A variable which stores the total cost of the activities
let sumOfCosts = 0;

//Selecting the fields from the 'Payment Info' section
const paymentOption = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');

//The 'paypal' and 'bitcoin' sections are hidden by default
paypal.style.display = 'none';
bitcoin.style.display = 'none';

//The 'credit-card' section is displayed by default
paymentOption.children[1].setAttribute('selected', true);

//Selecting required elements for form validation
const emailInput = document.getElementById('email');
const ccNumberInput = document.getElementById('cc-num');
const zipCodeInput = document.getElementById('zip');
const cvvCodeInput = document.getElementById('cvv');
const form = document.querySelector('form');

//Selecting checkboxes from the 'Register for Activities' fieldset
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

/*
 Event Listener for 'change' events on the 'Job Role' menu. If the 'Other' option
 is chosen, the 'Other job role' field is displayed, otherwise it is hidden.
*/
jobRoles.addEventListener('change', e => {
    if (e.target.value === 'other') {
        otherJobs.style.display = '';
    } else {
        otherJobs.style.display = 'none';
    }
});

/*
 Event listener for 'change' events on the 'Design' field. When this event is triggered,
 the 'Color' field is enabled and its drop down menu updates according to the selected
 T-Shirt theme.
*/
design.addEventListener('change', e => {
    colorSelection.disabled = false;
    for (let i = 1; i < colorOptions.length; i++) {
        const designValue = e.target.value;
        const theme = colorOptions[i].getAttribute('data-theme');

        if (designValue === theme) {
            colorOptions[i].hidden = false;
            colorOptions[i].setAttribute('selected', true);
        } else {
            colorOptions[i].hidden = true;
            colorOptions[i].setAttribute('selected', false);
        }
    }
});


/* 
 Event Listener for 'change' events on the 'Register for Activities' fieldset. 
 When the event is triggered, the total cost updates according to the costs 
 of the selected activities. 
*/
registerActivities.addEventListener('change', e => {
    const dataCost = +e.target.getAttribute('data-cost');

    if (e.target.checked) {
        sumOfCosts += dataCost;
    } else {
        sumOfCosts -= dataCost;
    }
    totalCost.innerHTML = `Total: $${sumOfCosts}`;
}); 


/* 
 Event Listener for 'change' events on the field with the payment options. 
 The chosen option will be displayed and the other two options will be hidden.
*/
paymentOption.addEventListener('change', e => {
    if (e.target.value === 'credit-card') {
        creditCard.style.display = '';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
    } else if (e.target.value === 'paypal') {
        creditCard.style.display = 'none';
        paypal.style.display = '';
        bitcoin.style.display = 'none';
    } else {
        creditCard.style.display = 'none';
        paypal.style.display = 'none';
        bitcoin.style.display = '';
    }
});


/* 
 Event Listener for 'submit' events on the 'form' element. This prevents the page from reloading
 when the 'submit' button is clicked if any of the required fields is not correctly filled out.
*/
form.addEventListener('submit', e => {
    function validatingFormField(field, regex) {
        const value = field.value;
        const isCorrect = regex.test(value);
    
        if (isCorrect) {
            field.parentElement.classList.add('valid');
            field.parentElement.classList.remove('not-valid');
            field.parentElement.lastElementChild.style.display = 'none';
        } else {
            e.preventDefault();
            field.parentElement.classList.add('not-valid');
            field.parentElement.classList.remove('valid');
            field.parentElement.lastElementChild.style.display = 'inline';
        }
    }

    validatingFormField(nameInput, /.+/);
    validatingFormField(emailInput, /^[^@]+@[^@]+\.com$/);

    if (sumOfCosts === 0) {
        e.preventDefault();
    }
    
    if (paymentOption.children[1].getAttribute('selected')) {
        validatingFormField(ccNumberInput, /\d{13,16}/);
        validatingFormField(zipCodeInput, /\d{5}/);
        validatingFormField(cvvCodeInput, /\d{3}/);
    }
});

/* 
 This part ensures that the parent label element of every checkbox that is in focus 
 recieves additional styles
*/
for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('focus', e => {
        checkboxes[i].parentElement.classList.add('focus');
    });
    checkboxes[i].addEventListener('blur', e => {
        checkboxes[i].parentElement.classList.remove('focus');
    });
}




