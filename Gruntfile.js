  module.exports = function(grunt) {
      require('time-grunt')(grunt);
      require('load-grunt-tasks')(grunt);
      grunt.initConfig({
          pkg: grunt.file.readJSON('package.json'),
          //html处理
          htmlhint: {
              build: {
                  src: ['src/*.html']
              }
          },
          htmlmin: {
              build: {
                  files: [{
                      expand: true,
                      cwd: 'src/',
                      src: ['*.html'],
                      dest: 'dist/'
                  }]
              }
          },
          // js处理
          jshint: {
              options: {
                  curly: true,
                  eqeqeq: true,
                  immed: true,
                  newcap: true,
                  noarg: true,
                  undef: true,
                  boss: false,
                  eqnull: true,
                  browser: true,
                  expr: true,
                  noempty: true,
                  regexp: true,
                  devel: true,
                  node: true,
                  trailing: true
              },
              src: './src/scripts/**/*.js'
          },
          concat: {
              options: {
                  separator: ';'
              },
              dist: {
                  src: 'src/scripts/**/*.js',
                  dest: 'dist/scripts/main.js'
              }
          },
          uglify: {
              options: {
                  banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                  sourceMap: true
              },
              build: {
                  src: 'dist/scripts/main.js',
                  dest: 'dist/scripts/main.min.js'
              }
          },
          // 样式处理
          sass: {
              build: {
                  files: [{
                      expand: true,
                      cwd: 'src/styles/',
                      src: ['*.scss'],
                      dest: 'tmp/',
                      ext: '.css'
                  }]
              }
          },
          autoprefixer: {
              build: {
                  files: [{
                      expand: true,
                      cwd: 'tmp/',
                      src: ['*.css'],
                      dest: 'tmp/'
                  }]
              }
          },
          cssmin: {
              minify: {
                  files: [{
                      expand: true,
                      cwd: 'tmp/',
                      src: ['*.css'],
                      dest: './dist/styles/',
                      ext: '.min.css'
                  }]
              },
              combine: {
                  files: {
                      './dist/styles/main.min.css': ['./dist/styles/*.min.css', '!./dist/styles/main.min.css']
                  }
              }
          },
          imagemin: {
              options: {
                  optimizationLevel: 3,
                  progressive: true,
                  interlaced: true
              },
              build: {
                  files: [{
                      expand: true,
                      cwd: './src/images/',
                      src: ['*.{jpg,svg,png,gif}'],
                      dest: './dist/images'
                  }]
              }
          },
          clean: {
              build: {
                  src: ['dist/**/*', 'tmp/**/*'],
                  filter: 'isFile'
              }
          },
          watch: {
              options: {
                  livereload: true
              },
              htmls: {
                  files: ['src/*.html'],
                  tasks: ['htmls'],

              },
              scripts: {
                  files: ['src/scripts/**/*.js'],
                  tasks: ['scripts'],

              },
              styles: {
                  files: ['src/styles/**/*.scss'],
                  tasks: ['styles'],
              },
              images: {
                  files: ['src/images/**/*'],
                  tasks: ['images'],

              }

          }
      });
      grunt.registerTask('htmls', ['htmlhint', 'htmlmin']);
      grunt.registerTask('scripts', ['jshint', 'concat', 'uglify']);
      grunt.registerTask('styles', ['sass', 'autoprefixer', 'cssmin']);
      grunt.registerTask('images', ['imagemin']);
      grunt.registerTask('cleans', ['clean']);
      grunt.registerTask('watchs', ['watch']);
      grunt.registerTask('default', ['cleans', 'htmls', 'scripts', 'styles', 'images', 'watchs']);
  };