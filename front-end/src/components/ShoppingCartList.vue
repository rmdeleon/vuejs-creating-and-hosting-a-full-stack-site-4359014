<template>
  <div v-if="cartItems.length > 0">
    <div 
      v-for="product in cartItems" 
      class="product-container"
      :key="product.id"
      >
      <img class="product-image" 
          :src="product.imageUrl" />
      <div class="details-wrap">
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }}</p>
      </div>
      <button @click="$emit('remove-from-cart', product.id)" class="remove-button">Remove from cart</button>
    </div>
    <button class="checkout-button">Proceed to checkout</button>
  </div>
  <div v-if="cartItems.length === 0">Empty cart</div>

</template>
<script>
export default {
  name: "ShoppingCartList",
  props: ['cartItems'],
}
</script>