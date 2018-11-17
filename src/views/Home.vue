<template>
    <div>
        <div class="row">
            <div class="col">
                <h1>Hey. :)</h1>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <h2>I'm <i>Navid Anindya.</i></h2>
                <p>
                    You'll see my blog here soon.
                </p>
                <p>
                    Until then, please check my:
                    <ul class="no-bullets">
                        <li v-for="(link, key) in links" :key="key">
                            <a :href="link.link" target="_blank" rel="noopener">{{ link.name }}</a>
                        </li>
                    </ul>
                </p>
                <h5>Have a <i>GREAT</i> day! :D</h5>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            links: [
                {
                    name: 'GitHub',
                    link: 'https://github.com/nealtheguitarist'
                },
                {
                    name: 'LinkedIn',
                    link: 'https://www.linkedin.com/in/navidanindya'
                },
                {
                    name: 'StackOverflow',
                    link: 'https://stackoverflow.com/story/nealtheguitarist'
                }
            ]
        };
    }
}
</script>


<style scoped>
.text-center {
    text-align: center;
}

.no-bullets {
    list-style-type: none;
}

a {
    color: #2C71A5;
    font-weight: bold;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

a:visited {
    color: #2C71A5;
}
</style>
