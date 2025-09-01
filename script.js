const catalogData = [
  {
    name: "Giorgio Armani / CODE",
    description: "По мотивам Armani Code Eau de Parfum Giorgio Armani — восточные фужерные. Верхние ноты: Лаванда, Лимон и Бергамот; средняя нота: Бобы тонка; базовые ноты: Ваниль, Замша, Мускус и Кедр.",
    gender: "Мужской аромат",
    prices: {"10 мл": 600, "20 мл": 1100, "30 мл": 1500, "50 мл": 2400, "Ароматизатор 6 мл": 450, "Диффузор 50 мл": 1900}
  },
  {
    name: "Giorgio Armani / Stronger with You Leather",
    description: "По мотивам Emporio Armani Stronger With You Leather Giorgio Armani — кожаные. Верхние ноты: Каштан, Специи и Элеми; средние ноты: Лаванда и Шалфей; базовые ноты: Ваниль, Кожа, Гваяк и Уд.",
    gender: "Мужской аромат",
    prices: {"10 мл": 600, "20 мл": 1100, "30 мл": 1500, "50 мл": 2400, "Ароматизатор 6 мл": 450, "Диффузор 50 мл": 1900}
  },
  {
    name: "Mercedes-Benz / Mercedes Benz Club Black",
    description: "По мотивам Mercedes Benz Club Black Eau de Parfum Mercedes-Benz — восточные. Верхние ноты: Элеми и Калабрийский бергамот; средние ноты: Ваниль, Жасмин и Мускус; базовые ноты: Мирра, Amberwood и Амброксан Супер.",
    gender: "Мужской аромат",
    prices: {"10 мл": 600, "20 мл": 1100, "30 мл": 1500, "50 мл": 2400, "Ароматизатор 6 мл": 450, "Диффузор 50 мл": 1900}
  }
];

const catalogEl = document.getElementById("catalog");
const selectedProductInput = document.getElementById("selectedProduct");

catalogData.forEach(product => {
  const div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `
    <h3>${product.name}</h3>
    <p><em>${product.gender}</em></p>
    <p>${product.description}</p>
    <select>
      ${Object.entries(product.prices).map(([size, price]) => `<option value='${product.name} - ${size} - ${price} ₽'>${size} — ${price} ₽</option>`).join("")}
    </select>
    <button>Выбрать</button>
  `;
  const button = div.querySelector("button");
  const select = div.querySelector("select");
  button.addEventListener("click", () => {
    selectedProductInput.value = select.value;
    document.getElementById("orderForm").scrollIntoView({behavior: "smooth"});
  });
  catalogEl.appendChild(div);
});

document.getElementById("orderForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const product = selectedProductInput.value;
  if (!product) {
    alert("Пожалуйста, выберите товар из каталога.");
    return;
  }

  // Имитируем сохранение заказа
  const order = {name, phone, product, date: new Date().toLocaleString()};
  console.log("Заказ сохранён:", order);

  document.getElementById("statusMessage").innerText = "Спасибо за заказ! Мы свяжемся с вами.";
  document.getElementById("orderForm").reset();
  selectedProductInput.value = "";
});