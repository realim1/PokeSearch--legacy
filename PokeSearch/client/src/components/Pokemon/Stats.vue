<template>
  <!-- Base Stats START -->
  <b-list-group-item>
    <h5>Base Stats</h5>
    <div class="stats">
      <!-- HP -->
      <div class="b_stat">
        <span>HP</span>
        <b-progress height="1.3rem">
          <b-progress-bar :value="stats[5].base_stat" :max="255" :class="typeColor" show-value></b-progress-bar>
        </b-progress>
      </div>

      <!-- Attack -->
      <div class="b_stat">
        <span>Attack</span>
        <b-progress height="1.3rem">
          <b-progress-bar :value="stats[4].base_stat" :max="255" :class="typeColor" show-value></b-progress-bar>
        </b-progress>
      </div>

      <!-- Defense -->
      <div class="b_stat">
        <span>Defense</span>
        <b-progress height="1.3rem">
          <b-progress-bar :value="stats[3].base_stat" :max="255" :class="typeColor" show-value></b-progress-bar>
        </b-progress>
      </div>

      <!-- Speed -->
      <div class="b_stat">
        <span>Speed</span>
        <b-progress height="1.3rem">
          <b-progress-bar :value="stats[0].base_stat" :max="255" :class="typeColor" show-value></b-progress-bar>
        </b-progress>
      </div>

      <!-- Special Attack -->
      <div class="b_stat">
        <span>Sp Att</span>
        <b-progress height="1.3rem">
          <b-progress-bar :value="stats[2].base_stat" :max="255" :class="typeColor" show-value></b-progress-bar>
        </b-progress>
      </div>

      <!-- Special Defense -->
      <div class="b_stat">
        <span>Sp Def</span>
        <b-progress height="1.3rem">
          <b-progress-bar :value="stats[1].base_stat" :max="255" :class="typeColor" show-value></b-progress-bar>
        </b-progress>
      </div>
    </div>
  </b-list-group-item>
  <!-- Base Stats END -->

</template>

<script>
export default {

    props: {
        stats: Array,
        typeColor: String,
    },
};

</script>


<style>
</style>