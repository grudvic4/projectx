<template>
  <div class="row">
    <div class="col-12">
      <p>Dobrodoso [UserName]</p>
      <router-link to="/new-client">
        <b-button class="mx-2" variant="primary">Dodaj novog klijenta</b-button>
      </router-link>
      <router-link to="/novi-dobavljac">
        <b-button class="mx-2" variant="primary">Dodaj novog dobavljaca</b-button>
      </router-link>
      <router-link to="/novi-kupac">
        <b-button class="mx-2" variant="primary">Dodaj novog kupca</b-button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
