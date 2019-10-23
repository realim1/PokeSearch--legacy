<template>
    <div>
        <section style="margin: 35px 0px;">
            <!-- Render loading -->
            <div v-if="loading">
               <!-- <h3>Loading...</h3> -->

               <!-- Credit to Raubaca -->
               <!-- https://codepen.io/raubaca/pen/obaZmG -->
                <div class="center-on-page">
                    <div class="pokeball">
                        <div class="pokeball__button"></div>
                    </div>
                </div>
            </div>

            <!-- Render error message if issue GET request fails-->
            <div v-if="error">
                <h2>{{error}}</h2>
                <router-link to="/">
                    <b-button variant="danger">  
                        Go Back
                    </b-button>
                </router-link>   
            </div>

            <!-- Render if pokemon data found -->
            <div v-if="pokemonData">

                <!-- Bootstrap-Vue Card -->   
                <b-card :img-src="pokemonData.sprites.front_default"
                img-alt="PokemonIMG"

                header="featured"
                >
                    <template v-slot:header>
                        <h6 style="text-align:center;">{{pokemonData.name | capitalize}}</h6>
                        <h6 style="text-align:center;">#{{pokemonData.id}}</h6>

                        <div style="display:block; text-align: center;">
                            <span v-for="(type, id) in pokemonData.types" v-bind:class="type.type.name" v-bind:key="id" class="monster-type"> {{type.type.name}}</span>
                        </div>
                    </template>

                    <b-list-group flush>

                        <!-- Stats Component -->
                        <baseStats 
                            v-bind:stats="pokemonData.stats"
                            v-bind:typeColor="pokemonData.types[0].type.name"/>

                        <!-- Profile Component -->
                        <profile 
                            v-bind:weight="pokemonData.weight"
                            v-bind:height="pokemonData.height"
                            v-bind:capture_rate="speciesData.capture_rate"
                            v-bind:gender_rate="speciesData.gender_rate"
                            v-bind:egg_groups="speciesData.egg_groups"
                            v-bind:hatch_counter="speciesData.hatch_counter"
                            v-bind:abilities="pokemonData.abilities"
                            v-bind:stats="pokemonData.stats" />
                        
                        <!-- TypeDefense Component -->
                        <typeDefense 
                            v-bind:quadDamage="quadDamage"
                            v-bind:doubleDamage="doubleDamage"
                            v-bind:halfDamage="halfDamage"
                            v-bind:quarterDamage="quarterDamage"
                            v-bind:noDamage="noDamage"/>
                        
                        <!-- Evolution Component -->
                        <evolutions 
                            v-bind:evolutionData="evolutionData"
                            v-bind:pokemonName="pokemonData.name"/>
                        
                        <!-- Moves Component -->
                        <moveList
                            v-bind:moves="pokemonData.moves" />


                    </b-list-group>



                </b-card>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios';

import Stats from './Pokemon/Stats.vue';
import Profile from './Pokemon/Profile.vue';
import TypeDefense from './Pokemon/TypeDefense.vue';
import Evolution from './Pokemon/Evolution.vue';
import Moves from './Pokemon/Moves.vue';

export default {
    name: 'Pokemon',
    data() {
        return {
            loading: false,
            error: null,
            pokemonData: null,
            speciesData: null,
            primaryTypeData: null,
            secondaryTypeData: null,
            evolutionData: null,

            quadDamage: [],
            doubleDamage: [],
            halfDamage: [],
            quarterDamage: [],
            noDamage: [],
        };
    },

    components: {
        baseStats: Stats,
        profile: Profile,
        typeDefense: TypeDefense,
        evolutions: Evolution,
        moveList: Moves,

    },

    async created() {
        this.loading = true;

        try {

            const res = await axios.get(`/pokemon/${this.$route.params.pokemon}`);

            this.pokemonData = res.data;

            this.statsData = res.data.stats;

            const res2 = await axios.get(this.pokemonData.species.url);

            this.speciesData = res2.data;
            //console.log(this.speciesData);

            const res3 = await axios.get(this.pokemonData.types[0].type.url);

            this.primaryTypeData = res3.data;

            this.addDoubleDamage(this.primaryTypeData.damage_relations.double_damage_from);
            this.addHalfDamage(this.primaryTypeData.damage_relations.half_damage_from);
            this.addNoDamage(this.primaryTypeData.damage_relations.no_damage_from);

            if(this.pokemonData.types[1] != undefined){
                const res4 = await axios.get(this.pokemonData.types[1].type.url)

                this.secondaryTypeData = res4.data;

                this.addDoubleDamage(this.secondaryTypeData.damage_relations.double_damage_from);
                this.addHalfDamage(this.secondaryTypeData.damage_relations.half_damage_from);
                this.addNoDamage(this.secondaryTypeData.damage_relations.no_damage_from);
                
            }

            this.checkSingleDamage();
            this.checkNoDamage();

            this.sortMoves();

            const res5 = await axios.get(this.speciesData.evolution_chain.url);

            this.evolutionData = res5.data;
            

        }
        catch(err) {

            this.loading = false;
            this.error = err.response.data.message;
            
        }
    },

    methods: {
        /**
          addDoubleDamage: Function designed to create a list of Types where the current Pokemon will take 2x Damage

          parameters: typeArr - Array containing Types
        */
        addDoubleDamage: function(typeArr) 
        {
            typeArr.forEach(type => {
                if(this.doubleDamage.find(item => {return item == type.name}) != undefined){
                    var index = this.doubleDamage.indexOf(type.name);
                    if(index > -1){
                        this.doubleDamage.splice(index, 1);
                        this.quadDamage.push(type.name);
                    }
                }
                else{
                    this.doubleDamage.push(type.name);
                }
            });
        },
        
        /**
          addHalfDamage: Function designed to create a list of Types where the current Pokemon will take .5x Damage

          parameters: typeArr - Array containing Types
        */
        addHalfDamage: function(typeArr)
        {
            typeArr.forEach(type => {
                if(this.halfDamage.find(item => {return item == type.name}) != undefined){
                    var index = this.halfDamage.indexOf(type.name);
                    if(index > -1){
                        this.halfDamage.splice(index, 1);
                        this.quarterDamage.push(type.name);
                    }
                }
                else{
                    this.halfDamage.push(type.name);
                }
            });
        },

        /**
          addNoDamage: Function designed to create a list of Types where the current Pokemon will take 0x Damage

          parameters: typeArr - Array containing Types
        */
        addNoDamage: function(typeArr) {
            typeArr.forEach(type => {
                if(this.noDamage.find(item => {return item == type.name}) == undefined){
                    this.noDamage.push(type.name);
                }
            });
        },

        /**
          checkSingleDamage: Function designed to check for any single damage types. For example if primary type has a 2x Damage multiplier to fire and secondary type had a .5x Damage multiplier to fire, then the multiplier for fire should be 1x, which is not displayed.
        */
        checkSingleDamage: function ()
        {
           let i = this.halfDamage.length;
           while(i--){
               
               let type = this.halfDamage[i];
               if(this.doubleDamage.find(item => {return item == type}) != undefined){
                    
                    var index = this.doubleDamage.indexOf(type);

                    this.halfDamage.splice(i, 1);

                    if(index > -1){
                        this.doubleDamage.splice(index, 1);
                    }
                    
               }
               
           }
            
        },

        /**
          checkNoDamage: Function designed to check for any 0x damage types. For example if primary type has a 2x Damage multiplier to fire and secondary type had a 0x Damage multiplier to fire, then the multiplier for fire should be 0x, which is pushed onto the noDamage array.
        */
        checkNoDamage: function() {
            this.noDamage.forEach(type => {
                var index;
                if(this.quadDamage.find(item => {return item == type}) != undefined){
                    index = this.quadDamage.indexOf(type);
                    if(index > -1){
                        this.quadDamage.splice(index, 1)
                    }
                }

                if(this.doubleDamage.find(item => {return item == type}) != undefined){
                    index = this.doubleDamage.indexOf(type);
                    if(index > -1){
                        this.doubleDamage.splice(index, 1)
                    }
                }

                if(this.halfDamage.find(item => {return item == type}) != undefined){
                    index = this.halfDamage.indexOf(type);
                    if(index > -1){
                        this.halfDamage.splice(index, 1)
                    }
                }

                if(this.quarterDamage.find(item => {return item == type}) != undefined){
                    index = this.quarterDamage.indexOf(type);
                    if(index > -1){
                        this.quarterDamage.splice(index, 1)
                    }
                }
            })
        },

        /**
          sortMoves: Function designed to sort the array of moves based on the level of the move is learned 
        */
        sortMoves: function(){
            this.pokemonData.moves.sort((obj1, obj2) => {
                var level1 = obj1.version_group_details[0].level_learned_at;
                var level2 = obj2.version_group_details[0].level_learned_at;

                if(level1 < level2){
                    return -1;
                }
                if(level1 > level2){
                    return 1;
                }
                return 0;
            });
        }
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

    :root {
        --ice-color: rgb(126, 206, 206);
        --water-color: rgb(69, 120, 237);
        --grass-color: rgb(105, 194, 61);
        --poison-color: rgb(146, 58, 146);
        --ground-color: rgb(219, 181, 77);
        --psychic-color: rgb(247, 54, 112);
        --flying-color: rgb(142, 111, 235);
        --fire-color: rgb(237, 109, 18);
        --fighting-color: rgb(174, 42, 36);
        --fairy-color: rgb(232, 120, 144);
        --electric-color: rgb(246, 201, 19);
        --rock-color: rgb(164, 143, 50);
        --bug-color: rgb(151, 165, 29);
        --ghost-color: rgb(100, 78, 136);
        --dark-color: rgb(100, 78, 64);
        --normal-color: rgb(156, 156, 99);
        --steel-color: rgb(160, 160, 192);
        --dragon-color: rgb(94, 29, 247);
    }

    .card .card-img {
        width: 45%;
    }

    .stats .b_stat {
        margin-top: 10px;
    }

    .monster-type {
        color: #fff;
        border-radius: 40px;
        font-size: 16px;
        font-variant: small-caps;
        font-weight: 600;
        margin-right: 5px;
        margin-bottom: 5px;
        padding: 1px 10px 5px;
    }

    .weakness{
        display: inline-block;
        width: 70%;

    }

    .multiplier {
        float: right;
    }

    .ice {
        background: var(--ice-color);
    }

    .water {
        background: var(--water-color);
    }

    .grass {
        background: var(--grass-color);
    }

    .poison {
        background: var(--poison-color);
    }

    .flying {
        background: var(--flying-color);
    }

    .ground {
        background: var(--ground-color);
    }

    .psychic {
        background: var(--psychic-color);
    }

    .fire {
        background: var(--fire-color);
    }

    .fighting {
        background: var(--fighting-color);
    }

    .fairy {
        background: var(--fairy-color);
    }

    .electric {
        background: var(--electric-color);
    }

    .rock {
        background: var(--rock-color);
    }

    .bug {
        background: var(--bug-color);
    }

    .ghost {
        background: var(--ghost-color);
    }

    .dark {
        background: var(--dark-color);
    }

    .normal {
        background: var(--normal-color);
    }

    .steel {
        background: var(--steel-color);
    }

    .dragon {
        background: var(--dragon-color);
    }


    *, *:before, *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    }

    body {
    background: #ecf0f1;
    }

    .center-on-page {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    }

    /* Poké Styles */
    .pokeball {
    position: relative;
    width: 200px;
    height: 200px;
    background: #fff;
    border: 10px solid #000;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: inset -10px 10px 0 10px #ccc;
    animation: fall .25s ease-in-out,
                shake 1.25s cubic-bezier(.36,.07,.19,.97) 3;
    }

    .pokeball::before,
    .pokeball::after {
    content:"";
    position: absolute;
    }

    .pokeball::before {
    background: red;
    width: 100%;
    height: 50%;
    }

    .pokeball::after {
    top: calc(50% - 10px);
    width: 100%;
    height: 20px;
    background: #000;
    }

    .pokeball__button {
    position: absolute;
    top: calc(50% - 30px);
    left: calc(50% - 30px);
    width: 60px;
    height: 60px;
    background: #7f8c8d;
    border: 10px solid #fff;
    border-radius: 50%;
    z-index: 10;
    box-shadow: 0 0 0 10px black;
    animation: blink .5s alternate 7;
    }

    /* Animation */
    @keyframes blink {
    from { background: #eee;}
    to { background: #e74c3c; }
    }
    @keyframes shake {
    0% { transform: translate(0, 0) rotate(0); }
    20% { transform: translate(-10px, 0) rotate(-20deg); }
    30% { transform: translate(10px, 0) rotate(20deg); }
    50% { transform: translate(-10px, 0) rotate(-10deg); }
    60% { transform: translate(10px, 0) rotate(10deg); }
    100% { transform: translate(0, 0) rotate(0); }
    }
    @keyframes fall {
    0% { top: -200px }
    60% { top: 0 }
    80% { top: -20px }
    100% { top: 0 }
    }
</style>