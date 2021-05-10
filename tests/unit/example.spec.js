import Vuetify from 'vuetify';
import { shallowMount, createLocalVue } from '@vue/test-utils';
// eslint-disable-next-line import/extensions,import/no-unresolved
import WindowControls from '@/components/WindowControls';

describe('WindowControls.vue', () => {
  let localVue;
  let vuetify;
  let wrapper;

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
    wrapper = shallowMount(WindowControls, {
      localVue,
      vuetify,
      stubs: {
        VLayout: '<div></div>',
      },
    });
  });

  it('renders a vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
