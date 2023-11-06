const addBtn = document.querySelector(".addbtn");
const mainInp = document.querySelector(".mainInp");
const listBox = document.querySelector(".listItem");
const savedTasks = JSON.parse(localStorage.getItem("tasks"));

savedTasks.forEach(item=>{
    listBox.innerHTML+=`
    <li class="listItem">${item}</li>
    `
})

addBtn.addEventListener("click", function (){
    let paragraph = document.createElement("li");
    paragraph.classList.add("listText");
    listBox.appendChild(paragraph);
    paragraph.innerHTML = mainInp.value;

    const taskItems = document.querySelectorAll(".listItem li");
  const tasks = [];
  taskItems.forEach(function (item) {
    tasks.push(item.textContent);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskItems.forEach(function (item) {
    tasks.push(item.textContent);
  });


})