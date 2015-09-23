module.exports = function (grunt) {
  'use strict';

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  function init () {

    grunt.initConfig({
      availabletasks: {
        tasks: {
          options: {
            descriptions: {
              'help': 'Task list helper for your Grunt enabled projects.',
              'clean': 'Deletes the content of the dist directory.',
              'build': 'Builds the project (including documentation) into the dist directory. You can specify modules to be built as arguments (' +
                'grunt build:buttons:notification) otherwise all available modules are built.',
              'test': 'Executes the karma testsuite.',
              'watch': 'Whenever js source files (from the src directory) change, the tasks executes jslint and documentation build.',
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
        },
        styles: {
          cwd: 'styles/',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/styles',
          expand: true
        }
      },
      cssmin: {
        target: {
          files: [{
            expand: true,
            cwd: 'styles',
            src: ['*.css', '!*.min.css'],
            dest: 'dist/styles',
            ext: '.min.css'
          }]
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
      eslint: {
        options: {
          configFile: 'eslint.yaml'
        },
        target: [
          'Gruntfile.js',
          'src/**/*.js'
        ]
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
          title: 'Angular Patternfly Documentation',
          dest: 'dist/docs',
          image: 'misc/logo-alt.svg',
          scripts: ['lib/patternfly/components/jquery/dist/jquery.js',
            'lib/patternfly/components/bootstrap/dist/js/bootstrap.js',
            'lib/patternfly/components/bootstrap-combobox/js/bootstrap-combobox.js',
            'lib/patternfly/components/bootstrap-datepicker/dist/js/bootstrap-datepicker.js',
            'lib/patternfly/components/bootstrap-select/js/bootstrap-select.js',
            'lib/patternfly/components/bootstrap-treeview/src/js/bootstrap-treeview.js',
            'lib/patternfly/components/c3/c3.js',
            'lib/patternfly/components/d3/d3.js',
            'lib/angular/angular.js',
            'lib/angular-animate/angular-animate.js',
            'lib/lodash/lodash.min.js',
            'dist/angular-patternfly.js',
            'lib/patternfly/dist/js/patternfly.js'],
          html5Mode: false,
          template: 'grunt-ngdocs-index.tmpl',
          styles: ['lib/patternfly/dist/css/patternfly.css', 'lib/patternfly/dist/css/patternfly-additions.css',
            'dist/styles/angular-patternfly.css', 'misc/demo.css', 'misc/pf-docs.css']
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
        },
        'patternfly.filters': {
          cwd: 'src/',
          src: ['filters/**/*.html'],
          dest: 'templates/filters.js'
        },
        'patternfly.sort': {
          cwd: 'src/',
          src: ['sort/**/*.html'],
          dest: 'templates/sort.js'
        },
        'patternfly.views': {
          cwd: 'src/',
          src: ['views/**/*.html'],
          dest: 'templates/views.js'
        }
      },
      // ng-annotate tries to make the code safe for minification automatically
      // by using the Angular long form for dependency injection.
      ngAnnotate: {
        dist: {
          files: [{
            src: 'dist/angular-patternfly.js',
            dest: 'dist/angular-patternfly.js'
          }]
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
          tasks: ['eslint']
        },
        all: {
          files: ['Gruntfile.js', 'src/**/*.js', 'src/**/*.html', 'styles/**/*.css'],
          tasks: ['build']
        }
      }
    });

    // You can specify which modules to build as arguments of the build task.
    grunt.registerTask('build', 'Create bootstrap build files', function () {
      var concatSrc = [];

      if (this.args.length) {
        this.args.forEach(function (file) {
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

      grunt.task.run(['clean', 'lint', 'test', 'ngtemplates', 'concat', 'ngAnnotate', 'uglify:build', 'cssmin', 'copy', 'ngdocs', 'clean:templates']);
    });

    // Runs all the tasks of build with the exception of tests
    grunt.registerTask('deploy', 'Prepares the project for deployment. Does not run unit tests', function () {
      var concatSrc = 'src/**/*.js';
      grunt.task.run(['clean', 'lint', 'ngtemplates', 'concat', 'ngAnnotate', 'uglify:build', 'cssmin', 'copy', 'ngdocs', 'clean:templates']);
    });

    grunt.registerTask('default', ['build']);
    grunt.registerTask('ngdocs:view', ['build', 'connect:docs', 'watch']);
    grunt.registerTask('lint', ['eslint', 'htmlhint']);
    grunt.registerTask('test', ['karma']);
    grunt.registerTask('check', ['lint', 'test']);
    grunt.registerTask('help', ['availabletasks']);

  }

  init({});

};
