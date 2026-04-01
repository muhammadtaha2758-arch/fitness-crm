const mix = require('laravel-mix');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


mix.js('resources/src/main.js', 'public').js('resources/src/login.js', 'public')
    .sass('resources/src/assets/styles/sass/app.scss', 'public/css')
    .vue();

    mix.webpackConfig({
        output: {
          
            filename:'js/[name].min.js',
            chunkFilename: 'js/bundle/[name].[hash].js',
          },
          resolve: {
            extensions: ['.js', '.vue', '.json'], // Ensure .vue is included
          },
        plugins: [
            new MomentLocalesPlugin(),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ['./js/*']
              }),
        ]
    });
    mix.version();

// // Add your entry points here
// mix.js('resources/src/main.js', 'public/js')
//    .js('resources/src/login.js', 'public/js')
//    .vue();

// // Configure additional Webpack settings
// mix.webpackConfig({
//     output: {
//         filename: 'js/[name].min.js', // Minified output for each entry
//         chunkFilename: 'js/bundle/[name].[hash].js', // For dynamically imported chunks
//     },
//     plugins: [
//         new MomentLocalesPlugin({
//             localesToKeep: ['en'], // Keep only required locales
//         }),
//         new CleanWebpackPlugin({
//             cleanOnceBeforeBuildPatterns: ['public/js/*'], // Clean the output directory
//         }),
//     ],
// });

// const mix = require('laravel-mix');

// mix.js('resources/src/main.js', 'public/js') // Update to your actual structure
// .sass('resources/src/assets/styles/sass/bootstrap-rtl.scss', 'public/css') // Update if you have a SCSS file
//    .vue();
// mix.js('resources/src/main.js', 'public').js('resources/src/login.js', 'public')
//     .vue();

// mix.webpackConfig({
//     output: {
//         filename: 'js/[name].min.js',
//         chunkFilename: 'js/bundle/[name].[hash].js',
//     },
//     plugins: [
//         new MomentLocalesPlugin(),
//         new CleanWebpackPlugin({
//             cleanOnceBeforeBuildPatterns: ['./js/*'],
//         }),
//     ],
// });

// // Optional: Add Browsersync for live reload
// mix.browserSync({
//     proxy: 'http://127.0.0.1:8000', // Laravel development server
//     files: [
//         'resources/views/**/*.blade.php',
//         'resources/src/**/*.vue',
//         'resources/src/**/*.js',
//         'resources/src/**/*.scss',
//         'public/js/**/*.js',
//         'public/css/**/*.css',
//     ],
//     notify: false,
//     open: false,
// });



// mix.js('resources/js/app.js', 'public/js')
//    .sass('resources/sass/app.scss', 'public/css')
//    .vue()
//    .browserSync({
//        proxy: 'localhost:8000',
//        open: false,
//        files: [
//            'resources/views/**/*.php',
//            'resources/js/**/*.vue',
//            'resources/js/**/*.js',
//        ],
//    });