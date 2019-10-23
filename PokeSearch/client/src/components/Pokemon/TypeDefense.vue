<template>
  <!-- Type Defenses START -->
  <b-list-group-item>
    <h5>Type Defenses</h5>
    <br/>
    <b-container fluid>
      <b-row>
        <b-col sm style="padding-left:0px;">
          <!-- 4x Multiplier -->
          <div v-for="type in quadDamage" :key="type.id">
            <span v-bind:class="type" class="monster-type weakness">{{type}}</span>
            <span class="multiplier">4x</span>
          </div>
          <!-- 2x Multiplier -->
          <div v-for="type in doubleDamage" :key="type.id">
            <span v-bind:class="type" class="monster-type weakness">{{type}}</span>
            <span class="multiplier">2x</span>
          </div>
        </b-col>

        <b-col sm style="padding-left:0px;">
          <!-- x.5 Multiplier -->
          <div v-for="type in halfDamage" :key="type.id">
            <span v-bind:class="type" class="monster-type weakness">{{type}}</span>
            <span class="multiplier">.5x</span>
          </div>
          <!-- x.25 Multiplier -->
          <div v-for="type in quarterDamage" :key="type.id">
            <span v-bind:class="type" class="monster-type weakness">{{type}}</span>
            <span class="multiplier">.25x</span>
          </div>
          <!-- x0 Multiplier -->
          <div v-for="type in noDamage" v-bind:key="type.id">
            <span v-bind:class="type" class="monster-type weakness">{{type}}</span>
            <span class="multiplier">0x</span>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </b-list-group-item>
  <!-- Type Defenses END -->
</template>

<script>
export default {

    props: {
        quadDamage: Array,
        doubleDamage: Array,
        halfDamage: Array,
        quarterDamage: Array,
        noDamage: Array
    },
}
</script>

<style>
    
</style>