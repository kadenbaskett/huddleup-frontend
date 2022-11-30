/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  async rewrites() {
    return [
      {
        source: '/users/createUser',
        destination: 'http://localhost:8000/users/createUser',
      },
      {
        source: '/users/loginUser',
        destination: 'http://localhost:8000/users/loginUser',
      },
    ];
  },
};
