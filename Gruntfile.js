module.exports = function(grunt) {
  grunt.initConfig({
  	
    pkg: grunt.file.readJSON('package.json'),
    meta: {
			banner: "/* jQuery Nice Select - v<%= pkg.version %> - <%= pkg.homepage %> */\n"
		},
    sass: {
      dist: {
        options:{
          style:'extended'
        },
        files: {
          'css/style.css' : 'scss/style.scss',
          'css/nice-select.css' : 'scss/nice-select.scss'
        }
      }
    },
		postcss: {
	    options: {
	      map: true,
	      processors: [
	      	require('autoprefixer')({
	      		browsers: ['last 2 versions']
	        })
	      ]
	    },
	    dist: {
	      src: 'css/*.css'
	    },
		},
		uglify: {
			my_target: {
				src: ['js/jquery.nice-select.js'],
				dest: 'js/jquery.nice-select.min.js'
			},
			options: {
				banner: '<%= meta.banner %>'
			}
		},
    watch: {
      css: {
        files: 'scss/*.scss',
        tasks: ['sass', 'postcss']
      },
      js: {
        files: 'js/jquery.nice-select.js',
        tasks: ['uglify']
      }
    }
    
  });
  
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.registerTask('default', ['watch']);
}