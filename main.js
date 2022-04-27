let currentTime = new Date();
render(currentTime);

const prevMonth = document.querySelector("#prevMonth");
prevMonth.onclick = () => {
  const 月初 = new Date(currentTime.getFullYear(), currentTime.getMonth(), 1);
  render(new Date(月初 - 86400 * 1000));
};

const nextMonth = document.querySelector("#nextMonth");
nextMonth.onclick = () => {
  const 下月初 = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth() + 1,
    1
  );
  render(下月初);
};

const today = document.querySelector("#today");
today.onclick = () => {
  render(new Date());
  // console.log("待定");
};

function render(time) {
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  initTime();
  generateDays();
  currentTime = time;
  function initTime() {
    const time = document.querySelector("#time");
    time.textContent = `${year}年${month}月`;
  }

  function generateDays() {
    const 月初 = new Date(year, month - 1, 1);
    // console.log(月初.toISOString());
    const 月初星期几 = 月初.getDay();
    // console.log(月初星期几);
    // 通过计算当前月份的最后一天来判断一个月有几天
    const 月末 = new Date(new Date(year, month - 1 + 1, 1) - 86400 * 1000);
    // console.log(月末);
    const 月末几号 = 月末.getDate();
    const 月末星期几 = 月末.getDay();
    const 这个月多少天 = 月末几号;
    // console.log(这个月多少天);
    // const liList = [];
    const days = document.querySelector("#days");
    days.innerHTML = "";
    let n = 0;
    const now = new Date();
    let selectedLi;
    for (let i = 1; i <= 这个月多少天; i++) {
      const li = document.createElement("li");
      li.textContent = i;
      // console.log("i");
      console.log(i);
      if (
        i === now.getDate() &&
        month === now.getMonth() + 1 &&
        year === now.getFullYear()
      ) {
        li.classList.add("calendar-days-today");
        // li.textContent = "今";
      }
      li.onclick = () => {
        if (selectedLi) {
          selectedLi.classList.remove("calendar-days-selected");
        }
        li.classList.add("calendar-days-selected");
        selectedLi = li;
      };
      days.append(li);
      n += 1;
    }

    // 铺垫日期
    for (let i = 1; i < 月初星期几; i++) {
      const li = document.createElement("li");
      const d = new Date(月初 - 86400 * 1000 * i);
      li.textContent = d.getDate();
      li.classList.add("calendar-days-disabled");
      days.prepend(li);
      n += 1;
    }
    let i = 月末星期几 + 1;
    for (let j = 0; j < 42 - n; j++) {
      const delta = i - 月末星期几;
      const li = document.createElement("li");
      // 先减0 是防止字符串加数字会变成字符串
      const d = new Date(月末 - 0 + 86400 * 1000 * delta);
      li.textContent = d.getDate();
      li.classList.add("calendar-days-disabled");
      days.append(li);
      i++;
    }
    // console.log(liList);
  }
}
