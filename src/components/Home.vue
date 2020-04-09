<template>
  <div>
    <div class="row">
      <div class="col">
        <h1>Hello. :)</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h2>I'm <i>Navid Anindya.</i></h2>
        <p>
          I code and do <a href="https://www.facebook.com/sevenminutes"  target="_blank" rel="noreferrer noopener">some music</a> at the same time.
        </p>
        <p>
          I currently work as a CTO for <a href="https://foodqo.com" target="_blank" rel="noreferrer noopener">FoodQo</a>.
        </p>
        <p>
          <ul class="no-bullets">
            <li v-for="(link, key) in links" :key="key">
              <i :class="[link.icon, 'margin-right']"></i>
              <a :href="link.link" target="_blank" rel="noreferrer noopener">{{ link.name }}</a>
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
          icon: 'icon-github-circled',
          link: 'https://github.com/nealtheguitarist'
        },
        {
          name: 'GitLab',
          icon: 'icon-gitlab',
          link: 'https://gitlab.com/nealtheguitarist'
        },
        {
          name: 'LinkedIn',
          icon: 'icon-linkedin',
          link: 'https://www.linkedin.com/in/navidanindya'
        },
        {
          name: 'StackOverflow',
          icon: 'icon-stackoverflow',
          link: 'https://stackoverflow.com/story/nealtheguitarist'
        },
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
.margin-right {
  margin-right: .5em;
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