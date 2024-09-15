document.addEventListener("DOMContentLoaded", () => {
    // Actualiza el contador del carrito en la página
    function updateCartCounter(count) {
      const cartCounters = document.querySelectorAll('.cart-count');
      cartCounters.forEach(counter => {
        counter.textContent = count;
      });
    }
  
    // Carga el conteo del carrito desde el servidor
    async function loadCartCount() {
      try {
        const response = await fetch('/cart/count');
        const result = await response.json();
        if (result.success) {
          updateCartCounter(result.totalItemsInCart);
          localStorage.setItem('cartCount', result.totalItemsInCart);
        }
      } catch (error) {
        console.error('Error al obtener el conteo del carrito:', error);
      }
    }

    //conteo guardado en localStorage si existe
    const savedCartCount = localStorage.getItem('cartCount');
    if (savedCartCount) {
      updateCartCounter(parseInt(savedCartCount, 10));
    }
  
    loadCartCount();
  
    // Manejo del envío del formulario para agregar productos al carrito
    document.querySelectorAll('.add-to-cart-form').forEach(form => {
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const productId = this.querySelector('input[name="productId"]').value;
        
        try {
          const response = await fetch('/cart/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId }),
          });
  
          if (response.ok) {
            await loadCartCount();
          } else {
            console.error('Error al agregar el producto al carrito');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      });
    });
});
