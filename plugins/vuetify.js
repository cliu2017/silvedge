import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#000000',
            secondary: '#ffeb3b',
            accent: '#8bc34a',
            error: '#f44336',
            warning: '#e91e63',
            info: '#2196f3',
            success: '#4caf50'
          },
        },
      },
});
