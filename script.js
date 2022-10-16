let logoutStatus = false;



async function init() {
    await includeHTML();

}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for(let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute('w3-include-html');
        let resp = await fetch(file);
        if(resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found'
        }
    }
}

function toggleLogout() {
    if(logoutStatus == false) {
        document.getElementById('logout').classList.remove('d-none');
        logoutStatus = true;
    } else {
        document.getElementById('logout').classList.add('d-none');
        logoutStatus = false;
        
    }
}


function activeOption(){
    let category = document.getElementById('category');
    let newCategory = document.getElementById('newCategory');
    let inputIcons = document.getElementById('input-icons');
    if(category.value == 'new-category'){
       category.classList.add('d-none');
       newCategory.classList.remove('d-none');
       inputIcons.classList.remove('d-none')
    }
}


function cancelNewCategory() {
    let category = document.getElementById('category');
    let newCategory = document.getElementById('newCategory');
    let inputIcons = document.getElementById('input-icons');
    newCategory.value = '';
    category.classList.remove('d-none');
    newCategory.classList.add('d-none');
    inputIcons.classList.add('d-none');

}

function addNewCategory() {
    let category = document.getElementById('category');
    let newCategory = document.getElementById('newCategory');
    let inputIcons = document.getElementById('input-icons');
    category.innerHTML += `<option value="${newCategory.value.toLowerCase()}" >${newCategory.value}</option>
    `;
    newCategory.value = '';
    category.classList.remove('d-none');
    newCategory.classList.add('d-none');
    inputIcons.classList.add('d-none');



}


// function logout() {
//     signOut(auth).then(() => {
                
//         // Sign-out successful.
//     }).catch((error) => {
    //           // An error happened.
    //     });
//     window.location.href='login.html';
// }

