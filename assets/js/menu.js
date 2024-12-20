const menuContainer = document.querySelector(".menu-container");


async function init() {
  const response = await fetch("assets/data/data.json");
  const menuData = await response.json();
  render(menuData, menuContainer);
}

function render(data, parentElement) {
  const ul = document.createElement("ul");
  
  data.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item.label;

    if (item.children && item.children.length > 0) {
      render(item.children, li);
      li.addEventListener("click", function (e) {
        e.stopPropagation();
        this.classList.toggle("open");
      });
    }else{
      li.addEventListener("click", function (e) {
        e.stopPropagation();
        li.innerText = "";
        this.classList.remove("open");
        const link = document.createElement("a");
        link.href = "#";
        link.innerText = item.label;
        li.appendChild(link);
        })
    }

    ul.appendChild(li);
  });

  parentElement.appendChild(ul);
}

init();
