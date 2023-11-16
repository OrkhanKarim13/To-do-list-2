const input = document.querySelector(".mainInp");
const button = document.querySelector(".addbtn");
const listBox = document.querySelector(".listBox");
const select = document.querySelector("#select");

const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
let deleteIcons;
savedTasks.forEach((item) => {
  const listItem = document.createElement("li");
  listItem.classList.add("listItem");
  const listText = document.createElement("p");
  listText.classList.add("listText");
  listText.textContent = item;
  listItem.appendChild(listText);

  const itemIcons = document.createElement("div");
  itemIcons.classList.add("itemIcons");

  const editIcon = document.createElement("img");
  editIcon.src = "./assets/images/clarity_edit-line.svg";
  editIcon.alt = "icon";

  const deleteIcon = document.createElement("img");
  deleteIcon.src = "./assets/images/fluent_delete-20-regular.svg";
  deleteIcon.alt = "icon";

  itemIcons.appendChild(editIcon);
  itemIcons.appendChild(deleteIcon);

  listItem.appendChild(itemIcons);
  listBox.appendChild(listItem);
});

button.addEventListener("click", function () {
  const taskText = input.value;
  if (taskText.trim() === "") {
    return;
  }

  const listItem = document.createElement("li");
  listItem.classList.add("listItem");
  const listText = document.createElement("p");
  listText.classList.add("listText");
  listText.textContent = taskText;
  listItem.appendChild(listText);

  const itemIcons = document.createElement("div");
  itemIcons.classList.add("itemIcons");

  const editIcon = document.createElement("img");
  editIcon.src = "./assets/images/clarity_edit-line.svg";
  editIcon.alt = "icon";

  const deleteIcon = document.createElement("img");
  deleteIcon.src = "./assets/images/fluent_delete-20-regular.svg";
  deleteIcon.alt = "icon";

  itemIcons.appendChild(editIcon);
  itemIcons.appendChild(deleteIcon);

  listItem.appendChild(itemIcons);
  listBox.appendChild(listItem);

  input.value = ""; 

  const taskItems = document.querySelectorAll(".listBox li");
  const tasks = [];
  taskItems.forEach(function (item) {
    tasks.push(item.querySelector(".listText").textContent);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  refreshItems()
});



function deleteListItem(item) {
  const listItem = item.closest(".listItem");
  console.log("ListItem",listItem);
  if (listItem) {
    listItem.remove();

    
    const taskItems = document.querySelectorAll(".listBox li");
    const tasks = [];
    taskItems.forEach(function (item) {
      tasks.push(item.querySelector(".listText").textContent);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

function refreshItems(){
  deleteIcons = document.querySelectorAll(".listItem .itemIcons img[src='./assets/images/fluent_delete-20-regular.svg']");
  deleteIcons.forEach(function (icon) {
    icon.addEventListener("click", function () {
      deleteListItem(icon);
    });
  });
}
refreshItems()
