<template>
    <mt-header fixed :title="title">
        <mt-button icon="back" slot="left" @click.native="backHandle"></mt-button>
        <mt-button v-if="setting === 'true'" icon="setting" slot="right"></mt-button>
        <mt-button v-if="search === 'true'" icon="search" slot="right" @click.native="searchHandle"></mt-button>
    </mt-header>
</template>
<script>
    export default{
        props:['title','setting','search'],
        methods:{
            backHandle(){
                this.$router.go(-1)
            },
            searchHandle(){
                this.$router.push(this.$route.fullPath+'/search')
            }
        }
    }
</script>