<template>
    <div>
        <Header />
        <form v-on:submit.prevent="onSubmit">
            <b-form-input v-model="pokemon" placeholder="Enter Pokémon's Name" class="search" style="text-align:center;"></b-form-input>
            <b-button type="submit" block variant="danger" class="searchBtn">PokéSearch</b-button>
        </form>
    </div>
</template>

<script>
import Header from './Header.vue';

export default {
    name: 'Search',
    components: {
        Header
    },

    data() {
        return {
            pokemon: ''
        }
    },

    methods: {
        /**
          onSubmit: Function designed to handle the submission for the search
        */
        onSubmit() {
            if(!this.pokemon){
                this.$toasted.show("Please Enter Pokemon Name or ID #", {
                    duration: 3000,
                    icon: 'exclamation-circle'
                });
            }
            else {
                this.$router.push(`/pokemon/${this.pokemon}`);
            }
        }
    }
}
</script>

<style>
    .searchBtn {
        margin-top: 16px;
    }

    .search {
        margin-top: 20px;
    }

</style>