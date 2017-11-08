module.exports = function (grunt) {
  'use strict';

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  function init () {

    // '--sass' command line argument exists?
    var sassBuild = grunt.option('sass');

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
              'ngdocs': 'Builds documentation into docs.',
              'ngdocs:view': 'Builds documentation into docs and runs a web server. The docs can be accessed on http://localhost:8000/',
              'ngdocs:publish': 'Publishes the ngdocs to the dist area. This should only be done when bumping the release version.'
            },
            groups: {
              'Basic project tasks': ['help', 'clean', 'build', 'test'],
              'Documentation tasks': ['ngdocs', 'ngdocs:view', 'ngdocs:publish']
            }
          }
        }
      },
      clean: {
        docs: ['docs'],
        templates: ['templates/'],
        all: ['dist/*', '!dist/docs']
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
            hostname: '0.0.0.0',
            port: grunt.option("port") || 8000,
            base: 'docs',
            livereload: 35722,
            open: true
          }
        }
      },
      copy: {
        docdata: {
          cwd: 'node_modules/patternfly/dist',
          src: ['fonts/*', 'img/*'],
          dest: 'docs',
          expand: true
        },
        fa: {
          cwd: 'node_modules/patternfly/',
          src: ['components/font-awesome/**'],
          dest: 'docs',
          expand: true
        },
        img: {
          cwd: 'misc/',
          src: ['patternfly-orb.svg','patternfly-logo.svg', 'grid-sidebar.png', '*.png'],
          dest: 'docs/img',
          expand: true
        },
        publish: {
          cwd: 'docs',
          src: ['**'],
          dest: 'dist/docs',
          expand: true
        },
        distimg: {
          cwd: 'misc',
          src: ['canvas-dot-grid.png'],
          dest: 'dist/imgs',
          expand: true
        },
        distless: {
          src: ['styles/**/*.less', 'src/**/*.less'],
          dest: 'dist/less',
          expand: true,
          flatten: true
        },
        distlessDependencies: {
          src: ['node_modules/patternfly/dist/less/color-variables.less'],
          dest: 'dist/less/dependencies/patternfly',
          expand: true,
          flatten: true
        },
        distsass: {
          src: ['styles/_angular-patternfly.scss'],
          dest: 'dist/sass',
          expand: true,
          flatten: true
        },
        sassBuild:{
          files: [
            {
              // copy css built from sass into dist/styles
              expand: true,
              cwd: 'dist/sass',
              src: ['**/*.css', '**/*.map'],
              dest: 'dist/styles/'
            }
          ]
        }
      },
      'string-replace': {
        dist: {
          files: [{
            cwd: 'dist/less/',
            src: ['angular-patternfly.less'],
            dest: 'dist/less',
            expand: true
          }],
          options: {
            replacements: [{
              pattern: /\.\.\/src\/(.*?)+\//g,
              replacement: ''
            },{
              pattern: '../node_modules/patternfly/dist/less',
              replacement: 'dependencies/patternfly'
            }]
          }
        }
      },
      lessToSass: {
        convert_within_custom_replacements: {
          files: [
            {
              expand: true,
              cwd: 'styles',
              src: ['**/*.less', '!angular-patternfly.less'],
              dest: 'dist/sass/',
              rename: function(dest, src) {
                return dest + '_' + src.replace('.less', '.scss');
              }
            },
            {
              expand: true,
              cwd: 'src',
              src: ['**/*.less'],
              dest: 'dist/sass/',
              rename: function(dest, src) {
                return dest + '_' + src.split('/').pop().replace('.less', '.scss');
              }
            }
          ],
          options: {
            excludes: ['variables', 'default'],
            replacements: [
              {
                // Customize variable conversion to include newer css reserved words.
                pattern: /(?!@debug|@import|@media|@keyframes|@font-face|@include|@extend|@mixin|@supports|@-\w)@/gi,
                replacement: '$',
                order: 0
              },
              {
                // Add !default flag to variable declarations without leading whitespace.
                pattern: /^(\$.*?:.*?);(\s*\/\/.*)?$/mgi,
                replacement: '$1 !default;$2',
                order: 2
              },
              {
                // Include mixins with no arguments
                pattern: /(\s+)\.([\w\-]+)\(\)/gi,
                replacement: '$1@include $2()',
                order: 3
              },
              {
                // Interpolates second ampersand where double ampersands are used
                pattern: /\&\&/gi,
                replacement: '&#{&}',
                order: 20
              },
              {
                // Interpolates ampersands that directly follow (are touching) a definition
                // e.g. somedef& becomes somedef#{&}
                pattern: /(\w+)\&/gi,
                replacement: '$1#{&}',
                order: 30
              },
              {
                // Namespaced mixins are detected as includes by default conversion
                // process. Remove namespacing by concatenating namespace and mixin name.
                // #gradient {
                //    @include striped(){...}
                // }
                //
                // becomes
                //
                // @mixin gradient-striped(){...}
                pattern: /^#([\w\-]+)\s*{\s*@include\s*([\w\-]*)\((.*)\)\s*{([\s\S]*?)}\s*}/mgi,
                replacement: '@mixin $1-$2($3){$4}',
                order: 40
              },
              // Fix invocation of namespaced mixins. Replace #namespace > .mixin()
              // or #namespace.mixin() with @include namespace-mixin()
              {
                pattern: /#(\w*)\s*\>?\s*\.(\w*)(\(.*\))/gi,
                replacement: '@include $1-$2$3',
                order: 50
              },
              {
                // Remove "!default" flag from mixin declarations
                pattern: /@mixin.*!default.*/gi,
                replacement: function(match) {
                  return match.replace(/\s*!default\s*/gi, '');
                },
                order: 60
              },
              {
                // Replace semi-colons with commas in mixins and includes
                pattern: /(@mixin |@include )([\w\-]*)\s*(\(.*\))(\s*[{;]?)/gi,
                replacement: function(match, p1, p2, p3, p4) {
                  return p1 + p2 + p3.replace(/;/g, ',') + p4;
                },
                order: 70
              },
              {
                // Fix bug in grunt-less-to-sass that puts "!important" inside mixin and css function parens.
                pattern: /^(\s*[\w\-]*:\s*[\w\-]*)\((.*?)\s*!important.*\)(.*);(.*)$/mgi,
                replacement: '$1($2) !important$3;$4',
                order: 80
              },
              {
                pattern: /\&:extend\((.*)\)/gi,
                replacement: '@extend $1',
                order: 90
              },
            ]
          }
        }
      },
      sass: {
        patternfly: {
          files: {
            'dist/sass/angular-patternfly.css': ['styles/build.scss']
          },
          options: {
            outputStyle: 'expanded',
            includePaths: [
              'dist/sass',
              'node_modules/patternfly/dist/sass'
            ]
          }
        }
      },
      less: {
        patternfly: {
          files: {
            'dist/styles/angular-patternfly.css': 'styles/angular-patternfly.less'
          },
          options: {
            paths: ['src/less/'],
            strictMath: true
          }
        }
      },
      cssmin: {
        target: {
          files: [{
            expand: true,
            cwd: 'dist/styles',
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
        standard: {
          options: {
            configFile: 'eslint.yaml'
          },
          src : [
            'Gruntfile.js',
            'src/**/*.js'
          ]
        },
        tests: {
          options: {
            configFile: 'test/eslint.yaml'
          },
          src : [
            'test/**/*.js'
          ]
        }
      },
      karma: {
        unit: {
          configFile: 'test/karma.conf.js',
          singleRun: true,
          browsers: ['PhantomJS']
        }
      },
      coveralls: {
        options: {
          debug: true,
          coverageDir: 'coverage',
          dryRun: false,
          force: true
        }
      },
      ngdocs: {
        options: {
          title: 'ANGULAR PATTERNFLY',
          dest: 'docs',
          image: 'misc/logo-alt.svg',
          scripts: [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/bootstrap-select/js/bootstrap-select.js',
            'node_modules/jquery-ui/ui/core.js',
            'node_modules/datatables.net/js/jquery.dataTables.js',
            'node_modules/datatables.net-select/js/dataTables.select.js',
            'node_modules/moment/moment.js',
            'node_modules/d3/d3.js',
            'node_modules/c3/c3.js',
            'node_modules/patternfly/dist/js/patternfly-settings.js',
            'node_modules/patternfly/dist/js/patternfly-settings-colors.js',
            'node_modules/patternfly/dist/js/patternfly-settings-charts.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-dragdrop/src/angular-dragdrop.js',
            'node_modules/angularjs-datatables/dist/angular-datatables.js',
            'node_modules/angularjs-datatables/dist/plugins/select/angular-datatables.select.min.js',
            'node_modules/angular-sanitize/angular-sanitize.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
            'misc/angular-bootstrap-prettify.js',
            'node_modules/lodash/lodash.min.js',
            'dist/angular-patternfly.js',
            'node_modules/angular-ui-router/release/angular-ui-router.min.js',
            'node_modules/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js'],
          html5Mode: false,
          template: 'grunt-ngdocs-index.tmpl',
          styles: ['node_modules/datatables.net-dt/css/jquery.dataTables.css',
            'node_modules/patternfly/dist/css/patternfly.css',
            'node_modules/patternfly/dist/css/patternfly-additions.css',
            'dist/styles/angular-patternfly.css',
            'misc/patternfly-showcase.css',
            'misc/ng-docs.css',
            'misc/examples.css']
        },

        all: ['src/**/*.js']
      },
      ngtemplates: {
        options: {
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: false,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
          }
        },
        'patternfly.form': {
          cwd: 'src/',
          src: ['form/**/*.html'],
          dest: 'templates/form.js'
        },
        'patternfly.navigation': {
          cwd: 'src/',
          src: ['navigation/**/*.html'],
          dest: 'templates/navigation.js'
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
        'patternfly.modals': {
          cwd: 'src/',
          src: ['modals/**/*.html'],
          dest: 'templates/modals.js'
        },
        'patternfly.select': {
          cwd: 'src/',
          src: ['select/**/*.html'],
          dest: 'templates/select.js'
        },
        'patternfly.sort': {
          cwd: 'src/',
          src: ['sort/**/*.html'],
          dest: 'templates/sort.js'
        },
        'patternfly.table': {
          cwd: 'src/',
          src: ['table/**/*.html'],
          dest: 'templates/table.js'
        },
        'patternfly.toolbars': {
          cwd: 'src/',
          src: ['toolbars/**/*.html'],
          dest: 'templates/toolbars.js'
        },
        'patternfly.views': {
          cwd: 'src/',
          src: ['views/**/*.html'],
          dest: 'templates/views.js'
        },
        'patternfly.wizard': {
          cwd: 'src/',
          src: ['wizard/**/*.html'],
          dest: 'templates/wizard.js'
        },
        'patternfly.canvas': {
          cwd: 'src/',
          src: ['canvas-view/**/*.html'],
          dest: 'templates/canvas.js'
        },
        'patternfly.pagination': {
          cwd: 'src/',
          src: ['pagination/**/*.html'],
          dest: 'templates/pagination.js'
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
      remove: {
        published: {
          dirList: ['dist/docs']
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
        test: {
          files: ['test/**/*.js'],
          tasks: ['test']
        },
        all: {
          files: ['Gruntfile.js', 'src/**/*.js', 'src/**/*.html', 'styles/**/*.css', '**/*.less'],
          tasks: ['build'],
          options: {
            livereload: 35722
          }
        }
      }
    });

    grunt.registerTask('shipcss', function() {
      if (sassBuild) {
        grunt.task.run('copy:sassBuild');
      }
    });

    grunt.registerTask('copymain', ['copy:docdata', 'copy:fa', 'copy:img', 'copy:distimg', 'copy:distless', 'copy:distlessDependencies', 'copy:distsass']);

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

      grunt.task.run([
        'clean',
        'lint',
        'test',
        'ngtemplates',
        'concat',
        'ngAnnotate',
        'uglify:build',
        'less',
        'lessToSass',
        'sass',
        'shipcss',
        'cssmin',
        'copymain',
        'string-replace',
        'ngdocs',
        'clean:templates']);
    });

    // Runs all the tasks of build with the exception of tests
    grunt.registerTask('deploy', 'Prepares the project for deployment. Does not run unit tests', function () {
      var concatSrc = 'src/**/*.js';
      grunt.task.run(['clean', 'lint', 'ngtemplates', 'concat', 'ngAnnotate', 'uglify:build', 'less', 'cssmin', 'copymain', 'string-replace', 'ngdocs', 'clean:templates']);
    });

    grunt.registerTask('default', ['build']);
    grunt.registerTask('ngdocs:view', ['build', 'connect:docs', 'watch']);
    grunt.registerTask('lint', ['eslint', 'htmlhint']);
    grunt.registerTask('test', ['karma', 'coveralls']);
    grunt.registerTask('check', ['lint', 'test']);
    grunt.registerTask('help', ['availabletasks']);
    grunt.registerTask('serve', ['ngdocs:view']);
    grunt.registerTask('ngdocs:publish', ['remove:published', 'copy:publish']);

  }

  init({});

};
