const data = {
    pkg: require('./package.json'),
    date: new Date(),
    menus: [
        {
          name: 'Home',
          icon: 'aperture',
          link: 'index.html'
        },
        {
          name: 'About',
          link: 'about.html'
        },
        {
          name: 'Contact',
          link: '#',
          children: [
            {
              name: 'Twitter',
              link: 'https://twitter.com/w_zce'
            },
            {
              name: 'About',
              link: 'https://weibo.com/zceme'
            },
            {
              name: 'divider'
            },
            {
              name: 'About',
              link: 'https://github.com/zce'
            }
          ]
        }
      ]
}

const build = {
  temp: '.temp',
  dist: 'release'
}
module.exports = {
  data,
  build
}