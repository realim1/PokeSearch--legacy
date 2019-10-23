<template>
    <header>
       <h1>PokéSearch</h1>  
       <img :src="image" alt="logo">
    </header>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            image: require('@/assets/Pokeball.png')
        };
    }
};
</script>

<style>
    header {
        margin: 35px 0px;
    }

    h1 {
        text-align: center;
        margin-top: 16px;
    }

    img {
        width: 200px;
        display: block;
        margin: auto;
    }
</style>