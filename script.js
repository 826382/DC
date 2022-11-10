(function () {
  "use strict";

  const items = [
    "🍭",
    "❌",
    "⛄️",
    "🦄",
    "🍌",
    "💩",
    "👻",
    "😻",
    "💵"
  ];
  const itemspro = [
    "❓",
    `<img class="img-items" src="https://z-p3-scontent.fhan5-10.fna.fbcdn.net/v/t1.15752-9/313364508_458616626165659_8641356427986206664_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_ohc=yYnudLXh8aEAX8rqe1w&_nc_ht=z-p3-scontent.fhan5-10.fna&oh=03_AdRI8t_55bHuogrJZnzOkcmE6jC0a1d1cqpqk8ZuXhVg2g&oe=638AE138"/>`,
    `<img class="img-items" src="https://scontent.fhan11-1.fna.fbcdn.net/v/t1.15752-9/309906809_862922938051290_8135839924778140860_n.png?_nc_cat=105&ccb=1-7&_nc_sid=ae9488&_nc_ohc=3yDNQhq5WH4AX9znktq&_nc_ht=scontent.fhan11-1.fna&oh=03_AdR7unz8AaTzSNkbBpgTWFSYnYZA1p89-XnjuCpUYxI08g&oe=63912EDF"/>`,
    `<img class="img-items" src="https://z-p3-scontent.fhan5-8.fna.fbcdn.net/v/t1.15752-9/312598052_668641661345440_2921166845191168155_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=ae9488&_nc_ohc=auaK7hYN7zEAX9EN78w&tn=rJ5Ie3NUOq-3DG3U&_nc_ht=z-p3-scontent.fhan5-8.fna&oh=03_AdRF1wBjbM19kN0AfJcyrppq0CHWU7ol_ZGWL0-YS3Gm5g&oe=638AC682"/>`
  ]
  var signal = true;
  var index = 0
  var index_temp = 0

  const doors = document.querySelectorAll(".door");
  document.querySelector("#spinner").addEventListener("click", init);
  document.querySelector("#spinner").addEventListener("click", spin);
  
  async function spin() {
    
    index_temp = index
    index += 1;
    if (index == itemspro.length) {
      index = 0;
    }
    items.pop()
    items.push(itemspro[index])
    init(false, 1, 2);
    for (const door of doors) {
      const boxes = door.querySelector(".boxes");
      const duration = parseInt(boxes.style.transitionDuration);
      boxes.style.transform = "translateY(0)";
      await new Promise((resolve) => setTimeout(resolve, duration * 120));
    }
    if (signal){
      itemspro.shift()
      signal = false
    }
    
  }

  function init(firstInit = true, groups = 1, duration = 1) {
    for (const door of doors) {
      if (firstInit) {
        door.dataset.spinned = "0";
      } else if (door.dataset.spinned === "1") {
        return;
      }

      const boxes = door.querySelector(".boxes");
      const boxesClone = boxes.cloneNode(false);

      const pool = [itemspro[index_temp],...items,];
      if (!firstInit) {
        const arr = [];
        pool.push(...items);

        boxesClone.addEventListener(
          "transitionstart",
          function () {
            door.dataset.spinned = "1";
            this.querySelectorAll(".box").forEach((box) => {
              box.style.filter = "blur(1px)";
            });
          },
          { once: true }
        );

        boxesClone.addEventListener(
          "transitionend",
          function () {
            this.querySelectorAll(".box").forEach((box, index) => {
              box.style.filter = "blur(0)";
              if (index > 0) this.removeChild(box);
            });
          },
          { once: true }
        );
      }
      // console.log(pool);

      for (let i = pool.length - 1; i >= 0; i--) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.style.width = door.clientWidth + "px";
        box.style.height = door.clientHeight + "px";
        box.innerHTML = pool[i];
        boxesClone.appendChild(box);
      }
      boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
      boxesClone.style.transform = `translateY(-${
        door.clientHeight * (pool.length - 1)
      }px)`;
      door.replaceChild(boxesClone, boxes);
      // console.log(door);
      
    }
  }

  init();
})();
