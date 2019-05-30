module.exports = {
  createTask: {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'button',
        text: 'Would you like to create task?',
        buttons: [
          {
            type: 'postback',
            title: 'Create task',
            payload: 'remind me',
          },
        ],
      },
    },
  },
};
