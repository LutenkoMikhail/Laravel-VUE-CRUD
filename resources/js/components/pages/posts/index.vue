<template>

    <div>
        <div class="header-h1">
            <h1>All records.</h1>
        </div>

        <div v-if="errored" class="alert alert-danger" role="alert">
                            Not records!
        </div>
        <table v-else class="table table-striped">
            <div v-if="loading">Loading</div>
            <thead class="thead-dark">
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="post in posts" :key="post.id">
                <th scope="row">{{post.id}}</th>
                <td>{{post.title}}</td>
                <td>{{post.description}}</td>
                <td>
                    <button class="btn btn-success">Edit</button>
                    <button class="btn btn-danger">Delete</button>
                </td>
            </tr>

            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                posts: [],
                post: {
                    id: '',
                    title: '',
                    description: ''
                },
                post_id: '',
                pagination: {},
                edit: false,
                loading: true,
                errored: false
            };
        },
        mounted() {
            this.getPosts()
        },
        methods: {
            getPosts() {
                axios
                    .get('api/posts')
                    .then(response => {
                            this.posts = response.data.data
                            // console.log(response.data.data)
                        }
                    )
                    .catch(error => {
                        console.log(error)
                        this.errored = true;
                    })
                    .finally(() => this.loading = false)
            }
        }
        // name: "index"
    }
</script>


<!--<style scoped>-->

<!--</style>-->
