<template>
  <!-- Evolution Chart START -->
  <b-list-group-item>
    <h5>Evolution Chart</h5>

    <br />

    <b-container style="text-align: center;" v-if="evolutionData.chain.evolves_to.length != 0">
      <div>
        <strong>1st Evolution Stage</strong>
      </div>
      <div v-for="(stage1, id) in evolutionData.chain.evolves_to" v-bind:key="id">
        <b-row style="flex-wrap:nowrap">
          <b-col>
            <img
              class="evoImg"
              v-on:click="pokemonRedirect(evolutionData.chain.species.name)"
              v-bind:src="getImage(evolutionData.chain.species.url)"
              alt
            />
          </b-col>

          <b-col style="padding: 0;" align-self="center">
            <i class="fas fa-arrow-right fa-2x"></i>
          </b-col>

          <b-col>
            <img
              class="evoImg"
              v-on:click="pokemonRedirect(stage1.species.name)"
              v-bind:src="getImage(stage1.species.url)"
              alt
            />
          </b-col>
        </b-row>

        <span>
          <strong
            v-if="evolutionData.chain.species.name == pokemonName"
          > {{evolutionData.chain.species.name | capitalize}}</strong>
          <span v-else> {{evolutionData.chain.species.name | capitalize}}</span>

          evolves into
          <strong
            v-if="stage1.species.name == pokemonName"
          > {{stage1.species.name | capitalize}}</strong>
          <span v-else> {{stage1.species.name | capitalize}}</span>

          <span v-if="stage1.evolution_details.length != 0">
            <strong v-if="stage1.evolution_details[0].trigger">
              <!-- Level Up -->
              <span v-if="stage1.evolution_details[0].trigger.name == 'level-up'">
                by Leveling up
                <!-- Level Condition -->
                <span
                  v-if="stage1.evolution_details[0].min_level != null"
                >to Lvl {{stage1.evolution_details[0].min_level}}</span>

                <!-- Stat Condition -->
                <span v-if="stage1.evolution_details[0].relative_physical_stats != null">
                  <span
                    v-if="stage1.evolution_details[0].relative_physical_stats == 1"
                  > with Attack > Defense</span>
                  <span
                    v-if="stage1.evolution_details[0].relative_physical_stats == 0"
                  > with Attack = Defense</span>
                  <span
                    v-if="stage1.evolution_details[0].relative_physical_stats == -1"
                  > with Attack &#60; Defense</span>
                </span>

                <!-- Happiness/Friendship Condition -->
                <span
                  v-if="stage1.evolution_details[0].min_happiness != null"
                > with {{stage1.evolution_details[0].min_happiness}} Happiness</span>

                <!-- Beauty Condition -->
                <span
                  v-if="stage1.evolution_details[0].min_beauty != null"
                > with {{stage1.evolution_details[0].min_beauty}} Beauty</span>

                <!-- Time of Day Condition -->
                <span
                  v-if="stage1.evolution_details[0].time_of_day != ''"
                > during {{stage1.evolution_details[0].time_of_day | capitalize}}</span>

                <!-- Location Condition -->
                <span
                  v-if="stage1.evolution_details[0].location != null"
                > at {{stage1.evolution_details[0].location.name | capitalize}}</span>

                <!-- Affection Condition -->
                <span v-if="stage1.evolution_details[0].min_affection != null">
                   with
                  <span
                    v-for="index in stage1.evolution_details[0].min_affection"
                    :key="index"
                  >&hearts;</span>
                  Affection in Pokémon-Amie
                </span>

                <span
                  v-if="stage1.evolution_details[0].turn_upside_down == true"
                > while holding the Nintendo 3DS system upside-down</span>

                <!-- Held Item Condition -->
                <span
                  v-if="stage1.evolution_details[0].held_item != null"
                > while holding {{stage1.evolution_details[0].held_item.name | capitalize}}</span>

                <!-- Known Move Condition -->
                <span
                  v-if="stage1.evolution_details[0].known_move != null"
                > and learning {{stage1.evolution_details[0].known_move.name | capitalize}}</span>

                <!-- Gender Condition -->
                <span v-if="stage1.evolution_details[0].gender != null">
                   (
                  <span v-if="stage1.evolution_details[0].gender == 1">If Female</span>
                  <span v-else>If Male</span>
                  )
                </span>
              </span>

              <!-- Use Item -->
              <span v-else-if="stage1.evolution_details[0].trigger.name == 'use-item'">
                <!-- Item -->
                <span
                  v-if="stage1.evolution_details[0].item != null"
                > by using {{stage1.evolution_details[0].item.name | capitalize}}</span>

                <!-- Happiness/Friendship Condition -->
                <span
                  v-if="stage1.evolution_details[0].min_happiness != null"
                > with {{stage1.evolution_details[0].min_happiness}} Happiness</span>

                <!-- Beauty Condition -->
                <span
                  v-if="stage1.evolution_details[0].min_beauty != null"
                > with {{stage1.evolution_details[0].min_beauty}} Beauty</span>

                <!-- Time of Day Condition -->
                <span
                  v-if="stage1.evolution_details[0].time_of_day != ''"
                > during {{stage1.evolution_details[0].time_of_day | capitalize}}</span>

                <!-- Location Condition -->
                <span
                  v-if="stage1.evolution_details[0].location != null"
                > at {{stage1.evolution_details[0].location.name | capitalize}}</span>

                <!-- Affection Condition -->
                <span v-if="stage1.evolution_details[0].min_affection != null">
                   with
                  <span
                    v-for="index in stage1.evolution_details[0].min_affection"
                    :key="index"
                  >&hearts;</span>
                  Affection in Pokémon-Amie
                </span>

                <!-- Gender Condition -->
                <span v-if="stage1.evolution_details[0].gender != null">
                   (
                  <span v-if="stage1.evolution_details[0].gender == 1">If Female</span>
                  <span v-else>If Male</span>
                  )
                </span>
              </span>

              <!-- Trade -->
              <span v-else-if="stage1.evolution_details[0].trigger.name == 'trade'">
                 by Trading
                <!-- Trade for Certain Pokemon Condition -->
                <span
                  v-if="stage1.evolution_details[0].trade_species != null"
                > for a {{stage1.evolution_details[0].trade_species.name | capitalize}}</span>

                <!-- Trade Condition -->
                <span
                  v-if="stage1.evolution_details[0].held_item != null"
                > while holding {{stage1.evolution_details[0].held_item.name | capitalize}}</span>

                <!-- Happiness/Friendship Condition -->
                <span
                  v-if="stage1.evolution_details[0].min_happiness != null"
                > with {{stage1.evolution_details[0].min_happiness}} Happiness</span>

                <!-- Beauty Condition -->
                <span
                  v-if="stage1.evolution_details[0].min_beauty != null"
                > with {{stage1.evolution_details[0].min_beauty}} Beauty</span>

                <!-- Time of Day Condition -->
                <span
                  v-if="stage1.evolution_details[0].time_of_day != ''"
                > during {{stage1.evolution_details[0].time_of_day | capitalize}}</span>

                <!-- Location Condition -->
                <span
                  v-if="stage1.evolution_details[0].location != null"
                > at {{stage1.evolution_details[0].location.name | capitalize}}</span>

                <!-- Affection Condition -->
                <span v-if="stage1.evolution_details[0].min_affection != null">
                   with
                  <span
                    v-for="index in stage1.evolution_details[0].min_affection"
                    :key="index"
                  >&hearts;</span>
                  Affection in Pokémon-Amie
                </span>

                <!-- Gender Condition -->
                <span v-if="stage1.evolution_details[0].gender != null">
                   (
                  <span v-if="stage1.evolution_details[0].gender == 1">If Female</span>
                  <span v-else>If Male</span>
                  )
                </span>
              </span>
            </strong>
          </span>
        </span>

        <div
          style="text-align: center;"
          v-if="evolutionData.chain.evolves_to[0].evolves_to.length != 0"
        >
          <br />
          <br />
          <div>
            <strong>2nd Evolution Stage</strong>
          </div>
          <div
            v-for="(stage2, id2) in evolutionData.chain.evolves_to[0].evolves_to"
            v-bind:key="id2"
          >
            <b-row style="flex-wrap:nowrap">
              <b-col align-self="center">
                <b-img
                  class="evoImg"
                  v-on:click="pokemonRedirect(stage1.species.name)"
                  v-bind:src="getImage(stage1.species.url)"
                  alt
                ></b-img>
              </b-col>

              <b-col style="padding: 0;" align-self="center">
                <!--
                <b-img
                  style="width:35%;"
                  src="https://img.icons8.com/ios-filled/50/000000/arrow.png"
                ></b-img>
                -->

                <i class="fas fa-arrow-right fa-2x"></i>

              </b-col>

              <b-col align-self="center">
                <b-img
                  class="evoImg"
                  v-on:click="pokemonRedirect(stage2.species.name)"
                  v-bind:src="getImage(stage2.species.url)"
                  alt
                ></b-img>
              </b-col>
            </b-row>

            <span>
              <strong
                v-if="stage1.species.name == pokemonName"
              > {{stage1.species.name | capitalize}}</strong>
              <span v-else> {{stage1.species.name | capitalize}}</span>

              evolves into
              <strong
                v-if="stage2.species.name == pokemonName"
              > {{stage2.species.name | capitalize}}</strong>
              <span v-else> {{stage2.species.name | capitalize}}</span>

              <span v-if="stage2.evolution_details.length != 0">
                <strong v-if="stage2.evolution_details[0].trigger">
                  <!-- Level Up -->
                  <span v-if="stage2.evolution_details[0].trigger.name == 'level-up'">
                     by Leveling up
                    <!-- Level Condition -->
                    <span
                      v-if="stage2.evolution_details[0].min_level != null"
                    > to Lvl {{stage2.evolution_details[0].min_level}}</span>

                    <!-- Stat Condition -->
                    <span v-if="stage2.evolution_details[0].relative_physical_stats != null">
                      <span
                        v-if="stage2.evolution_details[0].relative_physical_stats == 1"
                      > with Attack > Defense</span>
                      <span
                        v-if="stage2.evolution_details[0].relative_physical_stats == 0"
                      > with Attack = Defense</span>
                      <span
                        v-if="stage2.evolution_details[0].relative_physical_stats == -1"
                      > with Attack &#60; Defense</span>
                    </span>

                    <!-- Happiness/Friendship Condition -->
                    <span
                      v-if="stage2.evolution_details[0].min_happiness != null"
                    > with {{stage2.evolution_details[0].min_happiness}} Happiness</span>

                    <!-- Beauty Condition -->
                    <span
                      v-if="stage2.evolution_details[0].min_beauty != null"
                    > with {{stage2.evolution_details[0].min_beauty}} Beauty</span>

                    <!-- Time of Day Condition -->
                    <span
                      v-if="stage2.evolution_details[0].time_of_day != ''"
                    > during {{stage2.evolution_details[0].time_of_day | capitalize}}</span>

                    <!-- Location Condition -->
                    <span
                      v-if="stage2.evolution_details[0].location != null"
                    > at {{stage2.evolution_details[0].location.name | capitalize}}</span>

                    <!-- Affection Condition -->
                    <span v-if="stage2.evolution_details[0].min_affection != null">
                       with
                      <span
                        v-for="index in stage2.evolution_details[0].min_affection"
                        :key="index"
                      >&hearts;</span>
                      Affection in Pokémon-Amie
                    </span>

                    <!-- Trade Condition -->
                    <span
                      v-if="stage2.evolution_details[0].held_item != null"
                    > while holding {{stage2.evolution_details[0].held_item.name | capitalize}}</span>

                    <!-- Known Move Condition -->
                    <span
                      v-if="stage2.evolution_details[0].known_move != null"
                    > and learning {{stage2.evolution_details[0].known_move.name | capitalize}}</span>

                    <!-- Gender Condition -->
                    <span v-if="stage2.evolution_details[0].gender != null">
                       (
                      <span v-if="stage2.evolution_details[0].gender == 1">If Female</span>
                      <span v-else>If Male</span>
                      )
                    </span>
                  </span>

                  <!-- Use Item -->
                  <span v-else-if="stage2.evolution_details[0].trigger.name == 'use-item'">
                    <!-- Item -->
                    <span
                      v-if="stage2.evolution_details[0].item != null"
                    > by using {{stage2.evolution_details[0].item.name | capitalize}}</span>

                    <!-- Happiness/Friendship Condition -->
                    <span
                      v-if="stage2.evolution_details[0].min_happiness != null"
                    > with {{stage2.evolution_details[0].min_happiness}} Happiness</span>

                    <!-- Beauty Condition -->
                    <span
                      v-if="stage2.evolution_details[0].min_beauty != null"
                    > with {{stage2.evolution_details[0].min_beauty}} Beauty</span>

                    <!-- Time of Day Condition -->
                    <span
                      v-if="stage2.evolution_details[0].time_of_day != ''"
                    > during {{stage2.evolution_details[0].time_of_day | capitalize}}</span>

                    <!-- Location Condition -->
                    <span
                      v-if="stage2.evolution_details[0].location != null"
                    > at {{stage2.evolution_details[0].location.name | capitalize}}</span>

                    <!-- Affection Condition -->
                    <span v-if="stage2.evolution_details[0].min_affection != null">
                       with
                      <span
                        v-for="index in stage2.evolution_details[0].min_affection"
                        :key="index"
                      >&hearts;</span>
                      Affection in Pokémon-Amie
                    </span>

                    <!-- Gender Condition -->
                    <span v-if="stage2.evolution_details[0].gender != null">
                       (
                      <span v-if="stage2.evolution_details[0].gender == 1">If Female</span>
                      <span v-else>If Male</span>
                      )
                    </span>
                  </span>

                  <!-- Trade -->
                  <span v-else-if="stage2.evolution_details[0].trigger.name == 'trade'">
                     by Trading
                    <!-- Trade for Certain Pokemon Condition -->
                    <span
                      v-if="stage1.evolution_details[0].trade_species != null"
                    > for a {{stage1.evolution_details[0].trade_species.name | capitalize}}</span>

                    <!-- Trade Condition -->
                    <span
                      v-if="stage2.evolution_details[0].held_item != null"
                    > while holding {{stage2.evolution_details[0].held_item.name | capitalize}}</span>

                    <!-- Happiness/Friendship Condition -->
                    <span
                      v-if="stage2.evolution_details[0].min_happiness != null"
                    > with {{stage2.evolution_details[0].min_happiness}} Happiness</span>

                    <!-- Beauty Condition -->
                    <span
                      v-if="stage2.evolution_details[0].min_beauty != null"
                    > with {{stage2.evolution_details[0].min_beauty}} Beauty</span>

                    <!-- Time of Day Condition -->
                    <span
                      v-if="stage2.evolution_details[0].time_of_day != ''"
                    > during {{stage2.evolution_details[0].time_of_day | capitalize}}</span>

                    <!-- Location Condition -->
                    <span
                      v-if="stage2.evolution_details[0].location != null"
                    > at {{stage2.evolution_details[0].location.name | capitalize}}</span>

                    <!-- Affection Condition -->
                    <span v-if="stage2.evolution_details[0].min_affection != null">
                       with
                      <span
                        v-for="index in stage2.evolution_details[0].min_affection"
                        :key="index"
                      >&hearts;</span>
                      Affection in Pokémon-Amie
                    </span>

                    <!-- Gender Condition -->
                    <span v-if="stage2.evolution_details[0].gender != null">
                       (
                      <span v-if="stage2.evolution_details[0].gender == 1">If Female</span>
                      <span v-else>If Male</span>
                      )
                    </span>
                  </span>
                </strong>
              </span>
            </span>
          </div>
        </div>
      </div>
    </b-container>

    <b-container style="text-align: center;" v-else>
      <strong>No evolution stages</strong>
    </b-container>

    <br />
  </b-list-group-item>
  <!-- Evolution Chart END -->
</template>

<script>
export default {
    props: {
        evolutionData: Object,
        pokemonName: String,
    },

    methods: {
        /**
          getImage: Function designed to alter a given URL for retrieving pokemon images.

          parameters: url - String type
        */
        getImage: function(url) {
            var newUrl = (url).replace('https://pokeapi.co/api/v2/pokemon-species/','https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/');

            newUrl = newUrl.replace(/.$/, '.png');

            return newUrl;
        },

        /* Todo: Clicking evolution images should redirect user to that pokemon's page */
        pokemonRedirect: function(pokemonName){
            this.$router.push(`/pokemon/` + pokemonName);
        },
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
    .evoImg{
      max-width: 200px;
      padding: 0;
      width: 20vw;
    }
</style>