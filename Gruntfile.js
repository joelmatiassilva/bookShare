module.exports = function(grunt){
  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'client/**/*.js', 'server/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    sass:{
      dist: {
        files: {
          expand: truen,
          cwd: 'styles',
          src: ['./client/assets/style/*.scss'],
          des: '../client/assets/style/style',
          ect: '.css' 
        }
      }
    },
    watch: {
      files: [],
      takss: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
}