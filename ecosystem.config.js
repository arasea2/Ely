export default {
  apps: [{
    name: 'Ely',
    script: 'index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    exp_backoff_restart_delay: 100,
    env: {
      NODE_ENV: 'production'
    },
  }],
};
