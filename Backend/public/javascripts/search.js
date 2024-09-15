function submitSearchForm() {
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
      searchForm.submit();
    } else {
      console.error('Formulario no encontrado para el ícono de búsqueda');
    }
  }