import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { createI18n } from 'vue-i18n'
import App from '../App.vue'
import { useTodosStore } from '@/store'
import { config } from '@/i18n'

describe('Todos', async () => {
  expect(App).toBeTruthy()

  const i18nPlugin = createI18n(config)
  const piniaPlugin = createTestingPinia({
    createSpy: vi.fn,
    stubActions: false,
  })

  const wrapper = mount(App, {
    global: {
      plugins: [piniaPlugin, i18nPlugin],
    },
  })

  it('.create', async () => {
    const todosStore = useTodosStore()
    todosStore.todos = []

    todosStore.create({ content: 'Test todos creating!' })

    const createdTodo = todosStore.todos[0]
    expect(createdTodo.completed).toBeFalsy()
    expect(createdTodo.id).toBeTruthy()
    expect(createdTodo.content).toBe('Test todos creating!')
  })

  it('.remove', async () => {
    const todosStore = useTodosStore()
    todosStore.todos = []

    todosStore.create({ content: 'Testing todos removing!' })

    todosStore.remove(todosStore.todos[0].id)
    expect(todosStore.todos.length).toBe(0)
  })

  it('.setContent', async () => {
    const todosStore = useTodosStore()
    todosStore.todos = []

    todosStore.create({ content: 'Todo!' })

    todosStore.setContent(todosStore.todos[0].id, 'Edited Todo!')
    expect(todosStore.todos[0].content).toBe('Edited Todo!')
  })

  it('.setIsCompleted', async () => {
    const todosStore = useTodosStore()
    todosStore.todos = []

    todosStore.create({ content: 'Testing todos completing!' })

    todosStore.setIsCompleted(todosStore.todos[0].id, true)
    expect(todosStore.todos[0].completed).toBeTruthy()
  })

  it('Test creating todo by form', async () => {
    const todosStore = useTodosStore()
    todosStore.todos = []

    await wrapper
      .find('input[data-testId="controlsContentInput"]')
      .setValue('Floppa is lol!')

    await wrapper.find('form[data-testId="controlsForm"]').trigger('submit')

    expect(todosStore.create).toHaveBeenLastCalledWith({
      content: 'Floppa is lol!',
    })
  })

  it('todo is in the DOM', async () => {
    const todosStore = useTodosStore()
    todosStore.todos = []

    todosStore.create({ content: 'Testing todos view!' })

    const todoListItem = await wrapper.find('div[data-testId="todoListItem"')
    expect(
      todoListItem.find('p[data-testId="todoListItemContentParagraph"]').text()
    ).toBe('Testing todos view!')
  })
})
