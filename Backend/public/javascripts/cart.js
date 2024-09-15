document.addEventListener("DOMContentLoaded", () => {
  // Función para actualizar el total
  function updateTotal() {
    let total = 0;
    const subtotals = document.querySelectorAll(".result-subtotal");

    subtotals.forEach((subtotal) => {
      const subtotalValue = parseFloat(subtotal.textContent.replace("$", ""));
      total += subtotalValue;
    });

    const totalElement = document.querySelector(".result-total");
    if (totalElement) {
      totalElement.textContent = `$${total.toFixed(2)}`;
    }
  }

  // Función para actualizar el subtotal de un producto 
  function updateSubtotal(rowId, quantity, price, discount) {
    const subtotalElement = document.querySelector(`#cart-detail-${rowId} .result-subtotal`);
    const discountedPrice = price - price * (discount / 100);
    const newSubtotal = discountedPrice * quantity;

    if (subtotalElement) {
      subtotalElement.textContent = `$${newSubtotal.toFixed(2)}`;
      updateTotal();
    }
  }

  // Eliminar producto del carrito
  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", async function () {
      const cartDetailId = this.getAttribute("data-id");
      const row = document.getElementById(`cart-detail-${cartDetailId}`);

      try {
        const response = await fetch(`/cart/remove/${cartDetailId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (response.ok && data.success) {
          if (row) {
            row.remove();
            updateTotal();
            updateCartCounter(data.totalItemsInCart); 
          }
        } else {
          console.error(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    });
  });

  // Actualizar subtotal cuando se cambia la cantidad
  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("input", function () {
      let quantity = parseInt(this.value, 10);
      if (isNaN(quantity) || quantity < 0) {
        quantity = 0;
      }
      this.value = quantity;

      const rowId = this.getAttribute("data-row-id");
      const price = parseFloat(this.getAttribute("data-price"));

      const discountElement = document.querySelector(`#cart-detail-${rowId} .discount`);
      const discount = discountElement ? parseFloat(discountElement.textContent) : 0;

      updateSubtotal(rowId, quantity, price, discount);
    });

    // Asegúrate de establecer el mínimo para los inputs de cantidad
    document.querySelectorAll(".quantity-input").forEach((input) => {
      input.setAttribute("min", "0");
    });
  });

  // Simulador de pago exitoso
  const payButton = document.getElementById("payButton");
  const paymentModal = document.getElementById("paymentModal");
  const modalCloseButton = document.getElementById("modalCloseButton");

  payButton.addEventListener("click", function () {
    paymentModal.style.display = "flex";

    fetch("/cart/vaciarCarrito", { method: "POST" })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        if (data.success) {
          console.log("Carrito vaciado correctamente");
          updateCartCounter(0); 
        } else {
          console.error("Error al vaciar el carrito:", data.message);
        }
      })
      .catch((error) => console.error("Error al vaciar el carrito:", error));
  });

  modalCloseButton.addEventListener("click", function () {
    setTimeout(() => {
      window.location.href = "/";
    }, 300);
  });

  window.addEventListener("click", function (event) {
    if (event.target === paymentModal) {
      paymentModal.style.display = "none";
    }
  });

  function updateCartCounter(count) {
    const cartCounter = document.querySelector('.cart-count');
    if (cartCounter) {
      cartCounter.textContent = count;
    }
  }

  async function loadInitialCartData() {
    try {
      const response = await fetch('/api/cart/count'); 
      const result = await response.json();
      if (result.success) {
        updateCartCounter(result.totalItemsInCart);
      }
    } catch (error) {
      console.error('Error al obtener el conteo del carrito:', error);
    }
  }

  loadInitialCartData();

  async function addToCart(productId, quantity = 1) {
    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      });
  
      const result = await response.json();
  
      if (result.success) {
        updateCartCounter(result.totalItemsInCart); 
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
    }
  }
});
