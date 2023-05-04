const img = document.getElementById("image");
const fullName = document.getElementById("name");
const userName = document.getElementById('username');
const local = document.getElementById('local');
const repos = document.getElementById('repos');
const box = document.getElementById("user-box");
const input = document.getElementById("input");
const btnForm = document.getElementById('button-form');
const btn = document.getElementById('enter');


const displayUser = (data) => {
    box.style.display = 'block';
    fullName.textContent = data.name ? data.name : "Not Available";
    userName.textContent = data.login ? data.login : "Not Available";
    local.textContent = data.location ? data.location : "Not Available";
    repos.textContent = data.public_repos ? data.public_repos : "Not Available";
    img.src = data.avatar_url;        
}
const validationMessage = (type, msg) => {
    const div = document.createElement('div');
    div.className = `center-block alert alert-${type} `;
    div.style = 'width: 50%; margin-left: 25%';
    div.role = 'alert';
    div.appendChild(document.createTextNode(msg));

    btnForm.insertBefore(div, btn);

    setTimeout( () => document.querySelector('.alert').remove(), 3000)
}


// const getUser = () => {

//     if(!input.value)
//         validationMessage('danger', 'Please Enter a User Name');
//     else { 
//         fetch(`https://api.github.com/users/${input.value.toLowerCase().trim()}`)
//         .then((response) => {
//             if(response.status === 404)
//                 throw new Error();
//             else
//                 return response.json();
//         })
//         .then((data) => {
//             box.style.display = 'block';
//             displayUser(data);
//             input.value = '';
//         })
//         .catch((e) => {
//             validationMessage('warning', 'User data could not be Found')
//             input.value = '';
//         });
//     }
// };

const asyncGetUser = async() => {
    if(!input.value)
        validationMessage('danger', 'Please Enter a User Name');
    else{
        try{
            const res = await fetch(`https://api.github.com/users/${input.value.toLowerCase().trim()}`);
            if(res.status === 404) throw new Error()
            const data = await res.json();
            displayUser(data);

        } catch(error){
            validationMessage('warning', 'User data could not be Found')
        }
    }
}

document.getElementById("enter").addEventListener('click', asyncGetUser);