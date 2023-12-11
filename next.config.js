/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    prependData: `@use './app/styles/variables' as *;`,
  },
};

module.exports = nextConfig;
