module.exports = {
  apps : [{
    script: 'start.js',
    watch: '.',
    env_production: {
      NODE_ENV: "production"
    }
  }],
  deploy : {
    production : {
      user : '',
      host : '',
      ref  : 'origin/master',
      repo : 'git@github.com:boywild/fire.git',
      path : '/home/www/fire',
      'pre-deploy-local': '',
      'post-deploy' : 'yarn install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
