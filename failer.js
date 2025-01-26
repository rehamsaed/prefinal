document.querySelector(".score span").textContent=localStorage.getItem("totalScore")
const fullName=localStorage.getItem("firstname")+" "+localStorage.getItem("lastname")
console.log(fullName);
function capitalizeName(fullName) {
    return fullName
        .split(' ') 
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
        .join(' '); 
}


let capitalizedFullName = capitalizeName(fullName);

console.log(capitalizedFullName); 



 document.querySelector(".fullname").textContent=capitalizedFullName