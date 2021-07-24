
import { createLocalVue, mount } from '@vue/test-utils'

import Main from './components/Main';
import Child from './components/Child';
import GrandChild from './components/GrandChild';

import VueComponentStore from '../src';

const localVue = createLocalVue();
localVue.use(VueComponentStore);

function init(propsData = {}) {
    return mount(Main, { localVue, propsData });
}

test('provided fields are properly passed down', () => {
    const wrapper = init({ field1: 'hello' });
    expect(wrapper.findComponent(Child).vm.field1).toBe('hello');
    expect(wrapper.findComponent(Child).text()).toContain('hello');
    expect(wrapper.findComponent(GrandChild).vm.field2).toBe(42);
    expect(wrapper.findComponent(GrandChild).text()).toBe('84');
    expect(wrapper.findComponent(Child).vm.negated3).toBe(false);
});

test('provided fields are reactive', async () => {
    const wrapper = init();
    expect(wrapper.findComponent(Child).text()).toBe('84');

    await wrapper.setProps({ field1: 'qwerty' });
    expect(wrapper.findComponent(Child).text()).toContain('qwerty');
    expect(wrapper.findComponent(Child).vm.watch1).toBe('q');
    expect(wrapper.findComponent(GrandChild).vm.watch1).toBe('q');

    await wrapper.vm.increase2();
    expect(wrapper.findComponent(GrandChild).vm.double2).toBe(86);

    await wrapper.vm.negate3();
    expect(wrapper.findComponent(Child).vm.negated3).toBe(true);
});

test('non-injected fields are inaccessible', () => {
    const wrapper = init({ field1: 'test' });
    expect(wrapper.findComponent(Child).vm.field2).toBeUndefined();
    expect(wrapper.findComponent(Child).vm.field3).toBeUndefined();
    expect(wrapper.findComponent(GrandChild).vm.field1).toBeUndefined();
    expect(wrapper.findComponent(GrandChild).vm.negated3).toBeUndefined();
});

test('provided methods are properly passed down', async () => {
    const wrapper = init();

    await wrapper.findComponent(Child).vm.increase2(5);
    expect(wrapper.vm.field2).toBe(47);
    expect(wrapper.findComponent(GrandChild).text()).toBe('94');

    await wrapper.findComponent(GrandChild).vm.negate3();
    expect(wrapper.vm.field3).toBe(false);
    expect(wrapper.findComponent(Child).vm.negated3).toBe(true);
});

test('non-injected methods are inaccessible', () => {
    const wrapper = init();
    expect(wrapper.findComponent(Child).vm.negate3).toBeUndefined();
    expect(wrapper.findComponent(GrandChild).vm.increase2).toBeUndefined();
});

test('bare provide/inject still works', () => {
    const wrapper = init();
    expect(wrapper.findComponent(GrandChild).vm.field4).toBe(1);
});
