'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-ngdocs');
  grunt.loadNpmTasks('grunt-contrib-clean');

  function init() {

    grunt.initConfig({
      concat: {
        options: {
          separator: ';'
        },
        dist: {
          src: ['src/button/button.js', 'src/notification/notification.js'],
          dest: 'dist/angular-patternfly.js'
        }
      },
      jshint: {
        files: ['Gruntfile.js','dist/angular-patternfly.js'],
        options: {
          jshintrc: '.jshintrc'
        },
        beforeconcat: {
          options: {
            force: true,
            ignores: ['**.min.js']
          },
          files: {
            // TODO make list of modules optional (= specify as args or build all)
            src: ['src/button/button.js', 'src/notification/notification.js']
          }
        }
      },
      uglify: {
        options: {
          mangle: false
        },
        build: {
          files: {},
          src: 'dist/angular-patternfly.js',
          dest: 'dist/angular-patternfly.min.js'
        }
      },
      /*
      ngdocs: {
        options: {
          scripts: ['lib/angular/angular.js', 'dist/angular-patternfly.min.js'],
          html5Mode: false
        },
        api: ['src/button/button.js']
      },
      */
      ngdocs: {
        options: {
          scripts: ['angular.js', 'dist/angular-patternfly.min.js'],
          html5Mode: false
        },
        all: ['src/button/button.js']
      },

      connect: {
        options: {
          keepalive: true
        },
        server: {}
      },

      watch: {
        files: ['Gruntfile.js', 'src/button/button.js', 'src/notification/notification.js'],
        tasks: ['ngdocs'],
        options: {
          livereload: true
        }
      },

      clean: ['docs']

    });

    grunt.registerTask('default', ['jshint:beforeconcat', 'concat', 'uglify:build']);
    grunt.registerTask('docs', ['ngdocs']);
    grunt.registerTask('docs:view', ['default', 'clean', 'ngdocs', 'connect']);
    grunt.registerTask('watchx', ['watch']);

  }

  init({});

};