'use strict';

module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  function init() {

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      availabletasks: {
        tasks: {
          options: {
            descriptions: {
              'help': 'Task list helper for your Grunt enabled projects.',
              'clean': 'Deletes the content of the dist directory.',
              'build': 'Builds the project (including documentation) into the dist directory. You can specify modules to be built as arguments (' +
                'grunt build:buttons:notification) otherwise all available modules are built.',
              'bump': 'Increases version numbers in bower.json, commits files and pushses tags',
              'test': 'Executes the karma testsuite.',
              'watch': 'Whenever js source files (from the src directory) change, the tasks executes jshint and documentation build.',
              'ngdocs': 'Builds documentation into dist/docs.',
              'ngdocs:view': 'Builds documentation into dist/docs and runs a web server. The docs can be accessed on http://localhost:8000/'
            },
            groups: {
              'Basic project tasks': ['help', 'clean', 'build', 'test'],
              'Documentation tasks': ['ngdocs', 'ngdocs:view']
            }
          }
        }
      },
      bump: {
        options: {
          files: ['package.json', 'bower.json'],
          updateConfigs: ['pkg'],
          commit: true,
          commitMessage: 'Version %VERSION%',
          commitFiles: ['package.json', 'bower.json'],
          createTag: true,
          tagName: 'v%VERSION%',
          tagMessage: 'Version %VERSION%',
          push: true,
          pushTo: 'origin'
        }
      },
      clean: {
        docs: ['dist/docs'],
        templates: ['templates/'],
        all: ['dist/*']
      },
      concat: {
        options: {
          separator: ';'
        },
        dist: {
          src: ['src/**/*.module.js', 'src/**/*.js', 'templates/*.js'],
          dest: 'dist/angular-patternfly.js'
        }
      },
      connect: {
        docs: {
          options: {
            base: 'dist/docs'
          }
        }
      },
      copy: {
        docdata: {
          cwd: 'lib/patternfly/dist',
          src: ['fonts/*', 'img/*'],
          dest: 'dist/docs',
          expand: true
        },
        fa: {
          cwd: 'lib/patternfly/',
          src: ['components/font-awesome/**'],
          dest: 'dist/docs',
          expand: true
        }
      },
      htmlhint: {
        html: {
          src: ['src/**/*.html'],
          options: {
            htmlhintrc: '.htmlhintrc'
          }
        }
      },
      jshint: {
        files: ['Gruntfile.js', 'src/**/*.js'],
        options: {
          jshintrc: '.jshintrc'
        },
        beforeconcat: {
          options: {
            force: true,
            ignores: ['**.min.js']
          },
          files: {
            src: 'src/**/*.js'
          }
        }
      },
      karma: {
        unit: {
          configFile: 'test/karma.conf.js',
          singleRun: true,
          browsers: ['PhantomJS']
        }
      },
      ngdocs: {
        options: {
          title: 'Angular-Patternfly Documentation',
          dest: 'dist/docs',
          scripts: ['lib/patternfly/components/jquery/dist/jquery.js',
            'lib/patternfly/components/bootstrap/dist/js/bootstrap.js',
            'lib/patternfly/components/bootstrap-select/bootstrap-select.js',
            'angular.js',
            'dist/angular-patternfly.js',
            'lib/patternfly/dist/js/patternfly.js'],
          html5Mode: false,
          styles: ['lib/patternfly/dist/css/patternfly.css']
        },
        all: ['src/**/*.js']
      },
      ngtemplates: {
        options: {
          htmlmin: {
            collapseBooleanAttributes:      true,
            collapseWhitespace:             true,
            removeAttributeQuotes:          true,
            removeComments:                 false,
            removeEmptyAttributes:          true,
            removeRedundantAttributes:      true,
            removeScriptTypeAttributes:     true,
            removeStyleLinkTypeAttributes:  true
          }
        },
        'patternfly.form': {
          cwd: 'src/',
          src: ['form/**/*.html'],
          dest: 'templates/form.js'
        },
        'patternfly.notification': {
          cwd: 'src/',
          src: ['notification/**/*.html'],
          dest: 'templates/notification.js'
        },
        'patternfly.card': {
          cwd: 'src/',
          src: ['card/**/*.html'],
          dest: 'templates/card.js'
        },
        'patternfly.charts': {
          cwd: 'src/',
          src: ['charts/**/*.html'],
          dest: 'templates/charts.js'
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
      watch: {
        main: {
          files: ['Gruntfile.js'],
          tasks: ['jshint']
        },
        js: {
          files: ['Gruntfile.js', 'src/**/*.js'],
          tasks: ['build']
        }
      }
    });

    // You can specify which modules to build as arguments of the build task.
    grunt.registerTask('build', 'Create bootstrap build files', function() {
      var concatSrc = [];

      if (this.args.length) {
        this.args.forEach(function(file) {
          if (grunt.file.exists('./src/' + file)) {
            grunt.log.ok('Adding ' + file + ' to the build queue.');
            concatSrc.push('src/' + file + '/*.js');
          } else {
            grunt.fail.warn('Unable to build module \'' + file + '\'. The module doesn\'t exist.');
          }
        });

      } else {
        concatSrc = 'src/**/*.js';
      }

      grunt.task.run(['clean', 'lint', 'test', 'ngtemplates', 'concat', 'uglify:build', 'ngdocs', 'copy', 'clean:templates']);
    });

    grunt.registerTask('release', function (bump) {
      // If no 'bump' argument was provided, set it to 'patch'
      if (arguments.length === 0) {
        bump = 'patch';
      }

      // Build first, bump the appropriate version piece, build the dist folder, and commit it all up
      grunt.task.run('build', 'bump-only:' + bump, 'bump-commit');
    });

    grunt.registerTask('default', ['build']);
    grunt.registerTask('ngdocs:view', ['build', 'connect:docs', 'watch']);
    grunt.registerTask('lint', ['jshint', 'htmlhint']);
    grunt.registerTask('test', ['karma']);
    grunt.registerTask('help', ['availabletasks']);

  }

  init({});

};
