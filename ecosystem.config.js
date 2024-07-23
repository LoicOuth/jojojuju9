module.exports = {
  apps: [
    {
      name: 'jojojuju9_webserver',
      script: './bin/server.js',
    },
    {
      name: 'jojojuju9_scheduler',
      script: 'node ace scheduler:run',
    },
  ],
}
