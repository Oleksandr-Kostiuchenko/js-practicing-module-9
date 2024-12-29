//! =================================== Перетворення у JSON: ===================================

//TODO: Додай форму з полями для введення імені та email та вік.
//? Реалізуй збереження цих даних у форматі JSON в локальне сховище.
//? Зроби кнопку для завантаження даних з локального сховища та відображення їх у формі.
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';



//* Create userobj 
let userObj = {
    name: '',
    email: '',
    number: '',
}

//* Find elements
const userForm = document.querySelector('.user-form');
const userName = document.querySelector('.name');
const userEmail = document.querySelector('.email');
const userAge = document.querySelector('.age');
const downloadBtn = document.querySelector('.user-form-download');

//* Function to fill form
const fillForm = () =>{
    const userDataFromLS = JSON.parse(localStorage.getItem('userInfo'));

    if(userDataFromLS === null){
        return;
    }

    userObj = userDataFromLS;

    for(let key in userObj){
        userForm.elements[key].value = userObj[key];
    }
}

fillForm()

//* Add event listeners to save input value
const onFormInput = event => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    userObj[inputName] = inputValue;
    localStorage.setItem('userInfo', JSON.stringify(userObj));
}

userForm.addEventListener('input', onFormInput);

//* Add event listener for submiting form
const onFormSubmit = event => {
    event.preventDefault();
    const userObj = JSON.parse(localStorage.getItem('userInfo'));

    if(userObj.name.trim() !== '' && userObj.email.trim() !== '' && Number(userObj.number) > 0) {
        localStorage.setItem('approovedUserInfo', JSON.stringify(userObj));

        localStorage.removeItem('userInfo');

        userForm.reset();
        alert(`Your form is succesfully sended!`);
    }else{
        alert('Please fill form!');
    }
}

userForm.addEventListener('submit', onFormSubmit);

//* Add event listener for downloading form
downloadBtn.addEventListener('click', event => {
    if(localStorage.getItem('approovedUserInfo')){
        const personObj = JSON.parse(localStorage.getItem('approovedUserInfo'));
        const{name, email, number} = personObj;

        const instance = basicLightbox.create(`
            <div class="modal">
                <img src="https://image.shutterstock.com/image-vector/default-avatar-profile-icon-vector-250nw-2340767883.jpg" alt="">
                <p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Age: ${number}</p>
            </div>
        `, {

        })

        instance.show();
    }
})