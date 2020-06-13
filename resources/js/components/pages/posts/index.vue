<template>

    <div>
        <div class="header-h1">
            <h1>All records.</h1>
        </div>

        <div class="row">
            <div class="col-sm-6">
                <form @submit.prevent="addPost" class="mb-4">
                    <div class="form-group">
                        <label for="title">Title</label>
                        <input v-model="post.title" type="text" class="form-control" id="title">
                    </div>

<!--                    <div class="form-group">-->
<!--                        <label for="title">Название</label>-->
<!--                        <input v-model="post.title" type="text" class="form-control" id="title">-->
<!--                    </div>-->

                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea v-model="post.description" class="form-control" id="description" rows="3"></textarea>

                    </div>

                    <button type="submit" class="btn btn-primary">Add</button>
                </form>
            </div>
        </div>


        <div v-if="errored" class="alert alert-danger" role="alert">
            No records!
        </div>
        <table v-else class="table table-striped">
            <div v-if="loading">Loading................</div>
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
                <th> {{post.id}}</th>
                <td>{{post.title}}</td>
                <td>{{post.description}}</td>
                <td>
                    <button class="btn btn-success">
                        <i class="fa fa-pencil"></i>
                    </button>
                    <button @click="deletePost(post.id)" class="btn btn-danger">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>

            </tbody>
        </table>

        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li :class="{disabled:!pagination.prev_page_url}"
                    @click.prevent="getPosts(pagination.prev_page_url)"
                    class="page-item">
                    <a class="page-link" href="#">Previous</a>
                </li>
                <li class="page-item disabled">
                    <a class="page-link" href="#">
                        Page {{pagination.current_page}} of {{pagination.last_page}} Pages
                    </a>
                </li>
                <li :class="{disabled:!pagination.next_page_url}"
                    @click.prevent="getPosts(pagination.next_page_url)"
                    class="page-item">
                    <a class="page-link" href="#">Next</a>
                </li>
            </ul>
        </nav>

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
            getPosts(page_url) {
                page_url = page_url || 'api/posts'
                axios
                    .get(page_url)
                    .then(response => {
                            this.posts = response.data.data
                            this.makePagiantion(response.data)
                            // console.log(response.data.data)
                        }
                    )
                    .catch(error => {
                        console.log(error)
                        this.errored = true;
                    })
                    .finally(() => this.loading = false)
            },
            makePagiantion(response) {
                let pagination = {
                    current_page: response.current_page,
                    last_page: response.last_page,
                    prev_page_url: response.prev_page_url,
                    next_page_url: response.next_page_url,
                }
                this.pagination = pagination
            },
            deletePost(id) {
                axios
                    .delete(`/api/posts/${id}`)
                    .then(response => {
                            this.getPosts()
                            console.log(response)
                        }
                    )
                    .catch(error => {
                        console.log(error)
                    })
            },
            addPost() {
                if (this.edit === false) {
                    axios
                         .post('/api/posts', {
                            title: this.post.title,
                            description: this.post.description
                        })
                        .then(response => {
                                this.post.title = '',
                                this.post.description = ''
                                this.getPosts()
                                // alert('Post add.')
                                console.log(response)
                            }
                        )
                        .catch(error => {
                            console.log(error)
                        })
                } else {

                }
            }
        }
        // name: "index"
    }
</script>


<!--<style scoped>-->

<!--</style>-->
