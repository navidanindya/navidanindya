<template>
  <div>
    <div class="row">
      <div class="col">
        <h1>Oops. :(</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h3>404!</h3>
        <p><router-link to="/">Go back to home.</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: 'NavidAnindya. | 404 :(',
    };
  },
}
</script>

<style scoped>
.text-center {
    text-align: center;
}
.no-bullets {
    list-style-type: none;
}
a {
    color: #2C71A5;
    font-weight: bold;
    text-decoration: none;
}
a:hover {
    text-decoration: underline;
}
a:visited {
    color: #2C71A5;
}
</style>