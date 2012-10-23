/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  var projectVars = {
    appid: '<%= pkg.appid %>',
    author: '<%= pkg.author %>',
    copyright: '<%= pkg.copyright %>',
    description: '<%= pkg.description %>',
    guid: '<%= pkg.guid %>',
    homepage: '<%= pkg.homepage %>',
    name: '<%= pkg.name %>',
    timestamp: '<%= grunt.template.today() %>',
    version: '<%= pkg.version %>'
  };

  grunt.initConfig({
    pkg: '<json:package.json>',

    lint: {
      all: ['grunt.js']
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      }
    },

    clean: {
      all: [
        'build',
        'Resources',
        'tmp',
        'tiapp.xml',
        'manifest'
      ],
      tmp: [
        'tmp'
      ]
    },

    copy: {
      debug: {
        files: {
          'Resources/': 'Assets/**'
        }
      },
      release: {
        files: {
          'Resources/': 'Assets/**'
        },
        options: {
          processContentExclude: [
            'Assets/**/*.png',
            'Assets/**/*.jpg',
            'Assets/**/*.jpeg'
          ]
        }
      }
    },

    replace: {
      config: {
        options: {
          variables: projectVars,
          force: true
        },
        files: {
          './': ['Config/**'],
          './.project' : ['Config/.project']
        }
      },
      debug: {
        options: {
          variables: projectVars
        },
        files: {
          'Resources/app.js': ['tmp/grunt/concat/app.js']
        }
      },
      release: {
        options: {
          variables: projectVars
        },
        files: {
          'tmp/grunt/replace/app.js': ['tmp/grunt/concat/app.js']
        }
      }
    },

    type: {
      app: {
        files: {
          'tmp/grunt/source/app.js': ['App/UI/IMainView.ts',
                                      'App/UI/iPhone/MainView.ts',
                                      'App/UI/iPad/MainView.ts',
                                      'App/UI/ApplicationWindow.ts',
                                      'App/app.ts']
        },
        options: {
          reference: ['App/Libs/**/*.d.ts'],
          style: 'eqeqeq;bitwise;newMustBeUsed;assignmentInCond;evalOK:off;funcInLoop:off;reDeclareLocal:off'
        }
      }
    },

    concat: {
      libs: {
        src: ['App/Libs/**/*.js', 'tmp/grunt/source/app.js'],
        dest: 'tmp/grunt/concat/app.js'
      }
    },

    min: {
      app: {
        src: ['tmp/grunt/strip/app.js'],
        dest: 'Resources/app.js'
      }
    },
    uglify: {
      mangle: {
        toplevel: true
      }
    },

    strip : {
      app : {
        src: ['tmp/grunt/replace/app.js'],
        dest: 'tmp/grunt/strip/app.js'
      }
    },

    watch: {
      source: {
        files: ['App/**/*.ts'],
        tasks: ['compile-debug']
      },
      assets: {
        files: ['Assets/**/*'],
        tasks: ['build-debug']
      }
    },

    pngmin: {
      src: ['Assets/**/*.png'],
      dest: ['Resources/']
    },

    jpgmin: {
      src: ['Assets/**/*.jpg', 'Assets/**/*.jpeg'],
      dest: ['Resources/'],
    }
  });


  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-imagine');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-strip');
  grunt.loadNpmTasks('grunt-type');


  grunt.registerTask('compile-debug', 'type:app concat:libs replace:debug');
  grunt.registerTask('compile-release', 'type:app concat:libs replace:release strip min');

  grunt.registerTask('build-debug', 'clean:all copy:debug replace:config compile-debug');
  grunt.registerTask('build-release', 'clean:all copy:release pngmin jpgmin replace:config compile-release');
  grunt.registerTask('build-release-nio', 'clean:all copy:debug replace:config compile-release');

  grunt.registerTask('debug', 'lint build-debug clean:tmp');
  grunt.registerTask('release', 'lint build-release clean:tmp');
  grunt.registerTask('release-nio', 'lint build-release-nio clean:tmp');

  grunt.registerTask('default', 'debug');
};
