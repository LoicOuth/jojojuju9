module.exports = {
  apps: [
    {
      name: 'jojojuju9_webserver',
      script: './bin/server.js',
      autorestart: true,
    },
    {
      name: 'jojojuju9_schelduler',
      script: 'node ace scheduler:run',
      autorestart: true,
    },
  ],
}
