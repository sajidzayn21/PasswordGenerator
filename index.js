const passwordDisplay = document.querySelector("[data-password-display]");
const copyBtn = document.querySelector("[data-copy-btn]");
const copyMsg = document.querySelector("[data-copy-msg]");
const lengthDisplay = document.querySelector("[data-length-display]");
const lengthSlider = document.querySelector("[data-length-slider]");
const uppercase = document.querySelector("#uppercasePG");
const lowercase = document.querySelector("#lowercasePG");
const numbercase = document.querySelector("#numbercasePG");
const specialcase = document.querySelector("#specialcasePG");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

const generateButton = document.querySelector("#generateButton");

const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength = 10;

uppercasePG.checked = true;
let checkCount = 1;

// Slider handling function
function sliderHandle() {
    lengthSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

    const min = lengthSlider.min;
    const max = lengthSlider.max;
}

sliderHandle();

lengthSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    sliderHandle();
});

// check box count
allCheckBox.forEach((box) => {
    box.addEventListener('change', countCheckedbox);
    // updateSlider() ;
    box.addEventListener('change', updateSlider);
});


function countCheckedbox() {
    checkCount = 0;

    allCheckBox.forEach((box) => {
        if(box.checked) checkCount++;
    });

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        sliderHandle();
    }

}

// Generate Random No. between min and max max is exclusive;
function generateRandomInteger(min, max) {
    return Math.floor(Math.random() * (max-min)) + min;
}

//random no. b/n 1-9;
function generateRandomNumber() {
    return generateRandomInteger(1,10);
}

//random uppercase;
function generateRandomUpperCase() {
    return String.fromCharCode(generateRandomInteger(65, 90 + 1));
}

//random lowercase
function generateRandomLowerCase() {
    return String.fromCharCode(generateRandomInteger(97, 122 + 1));
}

//random special char
function generateRandomSpecialCase() {
    return symbols.charAt(generateRandomInteger(0, symbols.length));
}


// Generate pasword
function generatePassword() {

    if(checkCount <= 0) {
        alert("Select atleast one checkbox");
        return;
    }

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        sliderHandle();
    }

    password = "";

    let checkArray = [];

    // add those checked box
    if(uppercase.checked) checkArray.push(generateRandomUpperCase);
    if(lowercase.checked) checkArray.push(generateRandomLowerCase);
    if(numbercase.checked) checkArray.push(generateRandomNumber);
    if(specialcase.checked) checkArray.push(generateRandomSpecialCase);

    // adding checkArray to password
    for(let i=0; i<checkArray.length; i++) {
        password += checkArray[i]();
    }

    // adding remaining to cover length
    for(let i=0; i<(passwordLength - checkArray.length); i++) {
        let idx = generateRandomInteger(0, checkArray.length);
        password += checkArray[idx]();
    }

    password = shuffleArray(Array.from(password));
    passwordDisplay.value = password;
    console.log("password : " , password);

    //checking for strength
    if(specialcase.checked && (uppercase.checked || lowercase.checked || numbercase.checked) && passwordLength > 8) {
        showStrength('hard-password');
    }
    else if ((checkArray.length >= 3 && passwordLength > 12) || (passwordLength > 16 && checkArray.length >= 2) || (passwordLength >= 18)) {
        showStrength('hard-password');
    }
    else if((passwordLength >= 11 && checkArray.length >= 2) || (passwordLength >= 16) || (checkArray.length >= 3 && passwordLength > 9)) {
        showStrength('medium-password');
    }
    else {
        showStrength('easy-password');
    }
}

generateButton.addEventListener('click', generatePassword);


//shuffling password
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // find out random j
      const j = Math.floor(Math.random() * (i + 1));
      // swap 2 numbers
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    let str = "";
    // array.forEach((el) => (str += el));
    str = array.join("");
    return str;
}

const slider = document.getElementById('slider');

function updateSlider() {
    const value = slider.value;
    const min = slider.min;
    const max = slider.max;
    const percentage = ((value - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(
        to right,
        rgb(34, 197, 94) 0%, /* green-600 color */
        rgb(34, 197, 94) ${percentage}%, /* green-600 up to the thumb */
        #d1d5db ${percentage}%, /* gray-300 from the thumb */
        #d1d5db 100% /* gray-300 color */
    )`;
}

// Initialize the slider background
updateSlider();

// Update slider background on input
slider.addEventListener('input', updateSlider);


// Strength Management
function showStrength(targetStrength) {
    const strength = [document.querySelector(".none-password"), document.querySelector(".easy-password"), 
                        document.querySelector(".medium-password"), document.querySelector(".hard-password")];

    strength.forEach( s => {
        if(s.classList.contains(targetStrength)) {
            s.classList.remove("hidden");
        }
        else {
            s.classList.add("hidden");
        }
    });
}


// Copy Pasword 
async function copyContent() {
    try {
      // Check if password is empty
        if (password === "") {
                alert('First Generate Password to copy');
                throw 'Failed'; 
        }
    
        // Copy password to clipboard
        await navigator.clipboard.writeText(password);
    
        // Show "Copied" message and update styles
        copyMsg.innerText = "Copied!";
        copyMsg.classList.remove("opacity-0"); // Show the message
        copyMsg.classList.add("opacity-100");
    
    } 
    catch (error) {
        copyMsg.innerText = error;
        copyMsg.classList.remove("text-green-500"); // Remove success color
        copyMsg.classList.add("text-slate-300", "opacity-100"); // Add error color and show message
    }
  
    // Hide message after 2 seconds
    setTimeout(() => {
      copyMsg.classList.remove("opacity-100");
      copyMsg.classList.add("opacity-0"); // Fade out the message
    }, 1300);
}
  
copyBtn.addEventListener("click", () => {
    copyContent();
});
  