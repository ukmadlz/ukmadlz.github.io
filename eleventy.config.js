import fs from 'fs';
import path from 'path';

import cssnano from 'cssnano';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';

export default function (eleventyConfig) {
  // Add hostname filter to extract domain from URL
  eleventyConfig.addFilter("hostname", (url) => {
    if (!url) return '';
    try {
      const hostname = new URL(url).hostname;
      // Remove 'www.' prefix if present
      return hostname.replace(/^www\./, '');
    } catch {
      return url;
    }
  });

  // Add RFC 822 date filter for RSS feeds
  eleventyConfig.addFilter("dateToRfc822", (dateObj) => {
    if (!dateObj) return '';
    const date = new Date(dateObj);
    return date.toUTCString();
  });

  // Add date filter for formatting dates
  eleventyConfig.addFilter("date", (dateObj, format) => {
    if (!dateObj) return '';
    // Handle 'now' as a special case for current date
    const date = dateObj === 'now' ? new Date() : new Date(dateObj);

    if (format === '%Y') {
      return date.getFullYear();
    }

    if (format === "MMMM YYYY") {
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }

    if (format === "YYYY-MM-DD") {
      return date.toISOString().split('T')[0];
    }

    // Default format
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  // Add passthrough copy for assets that don't need processing
  eleventyConfig.addPassthroughCopy({ "assets/images": "assets/images" });

  // Ignore directories that shouldn't be processed
  eleventyConfig.ignores.add("scripts/**");
  eleventyConfig.ignores.add("node_modules/**");
  eleventyConfig.ignores.add(".claude/**");

  //compile tailwind before eleventy processes the files
  eleventyConfig.on('eleventy.before', async () => {
    const tailwindInputPath = path.resolve('./assets/styles/index.css');

    const tailwindOutputPath = './_site/assets/styles/index.css';

    const cssContent = fs.readFileSync(tailwindInputPath, 'utf8');

    const outputDir = path.dirname(tailwindOutputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const result = await processor.process(cssContent, {
      from: tailwindInputPath,
      to: tailwindOutputPath,
    });

    fs.writeFileSync(tailwindOutputPath, result.css);
  });

  const processor = postcss([
    //compile tailwind
    tailwindcss(),

    //minify tailwind css
    cssnano({
      preset: 'default',
    }),
  ]);

  return {
    dir: { input: './', output: '_site' },
  };
}