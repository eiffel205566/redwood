export const standard = defineScenario({
  tag: {
    one: {
      tagName: 'String',
      expenseType: {
        create: { description: 'String', newName: 'String', user: 'String' },
      },
    },

    two: {
      tagName: 'String',
      expenseType: {
        create: { description: 'String', newName: 'String', user: 'String' },
      },
    },
  },
})
