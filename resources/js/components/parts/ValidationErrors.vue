<template>
    <div>

        <div v-if="validationErrors" class="alert alert-danger">
            <ul>
                <li v-for="(value,index) in validationErrors":key="index">
                    {{value}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        // name: "ValidationErrors"
        props: {
            errors:Object
        },
        computed: {
            validationErrors() {
                let errors = Object.values(this.errors)
                errors = errors.flat()
                return errors
            }
        }
    }
</script>

<!--<style scoped>-->

<!--</style>-->
