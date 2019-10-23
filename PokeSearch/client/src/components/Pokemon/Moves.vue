<template>
  <!-- Moves List START -->
  <b-list-group-item>
    <h5>Moves List</h5>
    <br />

    <b-container v-if="moves != null">
      <!-- Natural Moves -->
      <div
        v-if="moves.some(move => move.version_group_details[0].move_learn_method.name == 'level-up')"
      >
        <h6>Natural Moves</h6>

        <b-row>
          <b-col>
            <strong>Level</strong>
          </b-col>
          <b-col cols="8">
            <strong>Move</strong>
          </b-col>
        </b-row>

        <div v-for="move in moves" :key="move.id">
          <b-row v-if="move.version_group_details[0].move_learn_method.name == 'level-up'">
            <b-col>{{move.version_group_details[0].level_learned_at}}</b-col>
            <b-col cols="8">{{move.move.name | capitalize}}</b-col>
          </b-row>
        </div>
      </div>

      <!-- Egg Moves -->
      <div
        v-if="moves.some(move => move.version_group_details[0].move_learn_method.name == 'egg')"
      >
        <br />
        <h6>Egg Moves</h6>
        <b-row>
          <b-col>
            <strong>Move</strong>
          </b-col>
        </b-row>

        <div v-for="move in moves" :key="move.id">
          <b-row v-if="move.version_group_details[0].move_learn_method.name == 'egg'">
            <b-col>{{move.move.name | capitalize}}</b-col>
          </b-row>
        </div>
      </div>

      <!-- Machine Moves -->
      <div
        v-if="moves.some(move => move.version_group_details[0].move_learn_method.name == 'machine')"
      >
        <br />
        <h6>TM & HM Moves</h6>
        <b-row>
          <b-col>
            <strong>Move</strong>
          </b-col>
        </b-row>
        <div v-for="move in moves" :key="move.id">
          <b-row v-if="move.version_group_details[0].move_learn_method.name == 'machine'">
            <b-col>{{move.move.name | capitalize}}</b-col>
          </b-row>
        </div>
      </div>

      <!-- Tutor Moves -->
      <div
        v-if="moves.some(move => move.version_group_details[0].move_learn_method.name == 'tutor')"
      >
        <br />
        <h6>Tutor Moves</h6>
        <b-row>
          <b-col>
            <strong>Move</strong>
          </b-col>
        </b-row>
        <div v-for="move in moves" :key="move.id">
          <b-row v-if="move.version_group_details[0].move_learn_method.name == 'tutor'">
            <b-col>{{move.move.name | capitalize}}</b-col>
          </b-row>
        </div>
      </div>
    </b-container>
  </b-list-group-item>
  <!-- Moves List END -->
</template>

<script>
export default {
    props: {
        moves: Array,
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
};
</script>

<style scoped>
  h6{
    font-size: 1.15rem;
  }
</style>