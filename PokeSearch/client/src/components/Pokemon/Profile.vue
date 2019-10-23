<template>
  <!-- Profile START -->
  <b-list-group-item>
    <h5>Profile</h5>

    <div>
      <strong>Weight:</strong>
      <span> {{weight / 10}} kg</span>
    </div>

    <div>
      <strong>Height:</strong>
      <span> {{height / 10}} m</span>
    </div>

    <div>
      <strong>Catch Rate:</strong>
      <span> {{capture_rate}}</span>
    </div>

    <div>
      <strong>Gender Ratio:</strong>
      <span
        v-if="gender_rate >= 0"
      > {{(gender_rate / 8) * 100}}% &#9792; {{((8-gender_rate) / 8) * 100}}% &#9794;</span>
      <span v-else> Genderless</span>
    </div>

    <div>
      <strong>Egg Groups:</strong>
      <span
        v-for="(item, id) in egg_groups"
        v-bind:key="id"
      > {{item.name | capitalize}} /</span>
    </div>

    <div>
      <strong>Hatch Steps:</strong>
      <span> {{(hatch_counter + 1) * 255}}</span>
    </div>

    <div>
      <strong>Abilities:</strong>
      <span
        v-for="(item, id) in abilities"
        v-bind:key="id"
      > {{item.ability.name | capitalize}} /</span>
    </div>

    <div>
      <strong>EVs:</strong>
      <span v-for="(item, id) in stats" v-bind:key="id">
        <span v-if="item.effort != 0"> {{item.effort}} {{item.stat.name | capitalize}} /</span>
      </span>
    </div>
  </b-list-group-item>
  <!-- Profile END -->
</template>

<script>
export default {
    props: {
        weight: Number,
        height: Number,
        capture_rate: Number,
        gender_rate: Number,
        egg_groups: Array,
        hatch_counter: Number,
        abilities: Array,
        stats: Array,
    },

    create(){
        
    },

    filters: {
        /**
          capitalize: function designed to capitialize the first letter of a String 
        */
        capitalize: function (value) {
            if(!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        },
        
    }
}
</script>

<style>
    
</style>