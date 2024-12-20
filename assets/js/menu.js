const menuContainer = document.querySelector(".menu-container");


async function init(){
  const response = await fetch("assets/data/data.json");
  const menuData = await response.json();
  render(menuData, menuContainer);
}

function render(data, menuContainer){
  const ul = document.createElement("ul");
  
  data.forEach(item =>{
    const li = document.createElement("li");
    li.innerText = item.label;

    if(item.children && item.children.length > 0){
      render(item.children, li);
      li.addEventListener("click", function (e) {
        e.stopPropagation();
        this.classList.toggle("open");
      });
    }else{
        li.innerText = "";
        li.classList.remove("open");
        li.classList.add("end");
        const link = document.createElement("a");
        link.href = "#";
        link.innerText = item.label;
        link.target = "blank"
        li.appendChild(link);
    }

    ul.appendChild(li);
  });

  menuContainer.appendChild(ul);
}

init();
