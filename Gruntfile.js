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
  grunt.loadNpmTasks('grunt-available-tasks');

  function init() {

    grunt.initConfig({
      availabletasks: {
        tasks: {
          options: {
            descriptions: {
              'help' : 'Task list helper for your Grunt enabled projects.',
              'clean' : 'Deletes the content of the dist directory.',
              'build' : 'Builds the project (including documentation) into the dist directory.',
              'test' : 'Executes the karma testsuite.',
              'watch' : 'Whenever js source files (from the src directory) change, the tasks executes jshint and documentation build.',
              'ngdocs' : 'Builds documentation into dist/docs.',
              'ngdocs:view' : 'Builds documentation into dist/docs and runs a web server. The docs can be accessed on http://localhost:8000/'
            },
            groups: {
              'Basic project tasks': ['help', 'clean', 'build', 'test'],
              'Documentation tasks': ['ngdocs', 'ngdocs:view']
            }
          }
        }
      },
      concat: {
        options: {
          separator: ';'
        },
        dist: {
          src: 'src/*/*.js',
          dest: 'dist/angular-patternfly.js'
        }
      },
      jshint: {
        files: ['Gruntfile.js', 'src/*/*.js'],
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
            src: 'src/*/*.js'
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
      ngdocs: {
        options: {
          dest: 'dist/docs',
          scripts: ['angular.js', 'dist/angular-patternfly.min.js'],
          html5Mode: false
        },
        all: ['src/*/*.js']
      },

      connect: {
        options: {
          keepalive: true
        },
        server: {},
        docs: {
          options: {
            base: 'dist/docs'
          }
        }
      },

      watch: {
        files: ['Gruntfile.js', 'src/*/*.js'],
        tasks: ['jshint', 'ngdocs'],
        options: {
          livereload: true
        }
      },
      karma: {
        unit: {
          configFile: 'karma.conf.js',
          singleRun: true,
          browsers: ['PhantomJS']
        }
      },

      clean: {
        docs: ['dist/docs'],
        all: ['dist/*']
      }

    });

    grunt.registerTask('build', ['clean', 'jshint:beforeconcat', 'jshint', 'test', 'concat', 'uglify:build', 'ngdocs']);
    grunt.registerTask('default', ['build']);
    grunt.registerTask('ngdocs:view', ['default', 'clean', 'ngdocs', 'connect:docs:livereload']);
    grunt.registerTask('test', ['karma']);
    grunt.registerTask('help', ['availabletasks']);

  }

  init({});

};