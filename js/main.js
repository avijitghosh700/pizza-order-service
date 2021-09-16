$(function () {
  let form = $("#form");
  let modal = $("#modal");
  let nameField = form.find("#fname");
  let phoneField = form.find("#phn");
  let pizzaSize = form.find(".pizzaSize");
  let pizzaTopping = form.find(".pizzaTopping");
  let bioName = document.querySelector('[class*="__name"]');
  let bioPhone = document.querySelector('[class*="__phone"]');
  let sizeDataContainer = document.querySelector(".sizeData");
  let sizePriceContainer = document.querySelector(".sizePrice");
  let toppingDataContainer = document.querySelector(".toppingData");
  let toppingPriceContainer = document.querySelector(".toppingPrice");
  let totalPriceContainer = document.querySelector('[class*="__netPrice"]');

  const pizza = {
    sizes: {
      small: 10,
      medium: 15,
      large: 20,
      extra_Large: 25,
    },
    toppings: {
      mushroom: 5,
      cheese: 5,
      pepperoni: 8,
      meatball: 10,
      bacon: 12,
    },
  };
  let stringDataRadio = "";
  let stringDataCheck = [];
  let sizePrice = 0;
  let toppingPrice = 0;

  // pizzaSize.on('click', function() {
  //   let isCheckedRadio = $('[name="pizzaSize"]:checked');

  //   if (isCheckedRadio) {
  //     stringDataRadio = isCheckedRadio.val();
  //   }
  // });

  for (let i = 0; i < pizzaSize.length; i++) {
    pizzaSize[i].addEventListener("change", function (e) {
      if (e.target.checked) {
        stringDataRadio = pizzaSize[i].value;
      }
    });
  }

  pizzaTopping.on("change", function (e) {
    let toppingChecked = pizzaTopping.filter(":checked");
    let toppingVal = $(this).val();

    if (toppingChecked.length > 0) {
      console.log(e.target.checked);
      pizzaTopping.prop("required", false);

      if (e.target.checked) stringDataCheck.push(toppingVal);
      else stringDataCheck.splice(stringDataCheck.indexOf(toppingVal), 1);
    } else {
      pizzaTopping.prop("required", true);
      stringDataCheck.splice(stringDataCheck.indexOf(toppingVal), 1);
    }
  });

  function getBio(nameF, phoneF) {
    const name = nameF.val();
    const phone = phoneF.val();

    bioName.innerHTML = name;
    bioPhone.innerHTML = phone;
  }

  function getSize() {
    for (let key in pizza.sizes) {
      if (key === stringDataRadio) {
        sizePrice = pizza.sizes[key];
        sizeDataContainer.innerHTML = key.replace(/_/g, " ");
        sizePriceContainer.innerHTML = `$${sizePrice}`;
        console.log(`${key}: $${sizePrice}`);
      }
    }
  }

  function getToppings() {
    for (let index of stringDataCheck) {
      for (let key in pizza.toppings) {
        if (key === index) {
          let toppingItemPrice = pizza.toppings[key];
          toppingPrice += toppingItemPrice;

          toppingDataContainer.insertAdjacentHTML("beforeend", `<p>${key}</p>`);
          toppingPriceContainer.insertAdjacentHTML("beforeend", `<p>$${toppingItemPrice}</p>`);
          console.log(`${key}: $${toppingItemPrice}`);
        }
      }
    }
  }

  function getTotal() {
    let totalPrice = sizePrice + toppingPrice;

    totalPriceContainer.innerHTML = `<p>$${totalPrice}</p>`;
  }

  function resetALL() {
    stringDataCheck.length = 0;
    toppingPrice = 0;

    form.trigger("reset");
    form.removeClass("was-validated");
    pizzaTopping.prop("required", true);

    // To Clear DOM nodes (Elements) because of insertAdjacentHTML()
    while (toppingDataContainer.lastChild) {
      toppingDataContainer.removeChild(toppingDataContainer.lastChild);
      toppingPriceContainer.removeChild(toppingPriceContainer.lastChild);
    }
  }

  form.on("click", "button", function () {
    form.addClass("was-validated");
  });

  form.on('submit', function (e) {
    getBio(nameField, phoneField);
    getSize();
    getToppings();
    getTotal();

    modal.modal("show");
    e.preventDefault();
  });

  modal.on("hidden.bs.modal", function (e) {
    resetALL();
    e.preventDefault();
  });
});
