const input = document.querySelector(".mainInp");
const button = document.querySelector(".addbtn");
const listBox = document.querySelector(".listBox");
const select = document.querySelector("#select");



const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
let deleteIcons;
savedTasks.forEach((item) => {
  const listItem = document.createElement("li");
  const topItem = document.createElement("div");
  const bottomItem = document.createElement("div");
  const selectSpan = document.createElement("span"); 
  listItem.classList.add("listItem");
  topItem.classList.add("topItem");
  bottomItem.classList.add("bottomItem");
  selectSpan.classList.add("selectSpan");
  const listText = document.createElement("p");
  listText.classList.add("listText");
  listText.textContent = item;
  listItem.appendChild(topItem);
  listItem.appendChild(bottomItem);
  topItem.appendChild(listText);
  bottomItem.appendChild(selectSpan);

  
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

  topItem.appendChild(itemIcons);
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

// editIcon'a tıklandığında düzenleme işlevini ekle
editIcon.addEventListener("click", function () {
  const listItem = editIcon.closest(".listItem");
  const listText = listItem.querySelector(".listText");

  // Eğer bir düzenleme alanı zaten varsa, doğrudan o alanı seç
  let editInput = listItem.querySelector(".editInput");

  // Eğer düzenleme alanı yoksa, oluştur ve içeriği mevcut metinle doldur
  if (!editInput) {
    editInput = document.createElement("input");
    editInput.classList.add("editInput");
    editInput.value = listText.textContent;
    listText.replaceWith(editInput); // Metin yerine düzenleme alanını ekle
  }

  // Düzenleme tamamlandığında Enter tuşuna basıldığında veya odak değiştiğinde
  editInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      listText.textContent = editInput.value;
      editInput.replaceWith(listText); // Düzenleme alanını metinle değiştir
      updateLocalStorage(); // LocalStorage'ı güncelle
    }
  });

  // Düzenleme alanından odak değiştiğinde
  editInput.addEventListener("blur", function () {
    listText.textContent = editInput.value;
    editInput.replaceWith(listText); // Düzenleme alanını metinle değiştir
    updateLocalStorage(); // LocalStorage'ı güncelle
  });

  editInput.focus(); // Düzenleme alanına odaklan
});

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
