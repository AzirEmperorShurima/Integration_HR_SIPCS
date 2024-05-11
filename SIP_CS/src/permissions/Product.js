
function canViewProduct(user, product) {
    return (
      user.role === "admin" ||
      product.userId === user.id
    )
  }
  
  function scopedProducts(user, products) {
    if (user.role === "admin") return products
    return products.filter(products => products.userId === user.id)
  }
  
  function canDeleteProduct(user, product) {
    return product.userId === user.id
  }
  
  module.exports = {
    canViewProduct,
    scopedProducts,
    canDeleteProduct
  }
