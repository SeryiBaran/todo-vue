import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import { unref } from 'vue'
import { config } from '../i18n'
import App from '../App.vue'

describe('I18n', async () => {
  it('Switching works', async () => {
    expect(App).toBeTruthy()

    const i18nPlugin = createI18n(config)
    const piniaPlugin = createPinia()

    const wrapper = mount(App, {
      global: {
        plugins: [i18nPlugin, piniaPlugin],
      },
    })

    const locales = Object.keys(config.messages) as Array<
      keyof typeof config.messages
    >

    for (
      let index = locales.indexOf(unref(i18nPlugin.global.locale));
      index < locales.length;
      index++
    ) {
      if (index !== 0)
        await wrapper
          .find('select[data-testId="localeSelect"]')
          .setValue(locales[index])

      expect(wrapper.find('p[data-testId="aboutParagraph"]').text()).toBe(
        config.messages[locales[index]].about
      )
    }
  })
})
