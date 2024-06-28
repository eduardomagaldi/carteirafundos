<script setup>
defineProps({
  msg: {
    type: String,
  },
});
</script>

<template>
  <div class="breadcrumb-wrapper border-gradient-inverted">
    <div class="container">
      <nav
        style="
          --bs-breadcrumb-divider: url(
            &#34;data:image/svg + xml,
            %3Csvgxmlns='http://www.w3.org/2000/svg'width='8'height='8'%3E%3Cpathd='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z'fill='%236c757d'/%3E%3C/svg%3E&#34;
          );
        "
        aria-label="breadcrumb"
        class="nav m-0"
      >
        <!-- migalha -->
        <ol class="breadcrumb mb-0 p-0">
          <!-- <li class="breadcrumb-item active"><a href="#">Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">Library</li> -->
        </ol>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.breadcrumb {
  background-color: transparent;
  min-height: 2px;
}
</style>
